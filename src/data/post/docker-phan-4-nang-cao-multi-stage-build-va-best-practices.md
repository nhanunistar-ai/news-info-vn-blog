---
title: 'Docker Phần 4 - Nâng cao: Multi-stage Build, Bảo mật và Con đường tiếp theo'
excerpt: 'Multi-stage build giúp giảm image size từ 900MB xuống 50MB. Cùng với best practices bảo mật và giới thiệu Kubernetes - đây là phần hoàn thiện kỹ năng Docker của bạn.'
category: 'study'
tags: ['docker', 'multi-stage-build', 'devops', 'kubernetes', 'bao-mat']
author: 'Tuan Kiet'
publishDate: 2026-06-22T11:00:00.000Z
image: '~/assets/images/docker-phan-4-nang-cao-multi-stage-build-va-best-practices.webp'
series: 'docker-tu-co-ban-den-nang-cao'
chapter: 4
---

> Image 900MB hay 50MB - cùng kết quả nhưng khác nhau về tốc độ deploy, chi phí storage và bảo mật. Multi-stage build là kỹ thuật bắt buộc cho production.

### Multi-stage Build - Kỹ thuật quan trọng nhất

Vấn đề với Dockerfile đơn giản: để build được ứng dụng, bạn cần compiler, build tools, dev dependencies. Nhưng để chạy ứng dụng, bạn chỉ cần output đã compile và runtime dependencies.

Nếu đưa tất cả vào một image, bạn mang cả build environment vào production - không cần thiết, nặng, và có nguy cơ bảo mật.

**Multi-stage build** giải quyết bằng cách dùng nhiều `FROM` trong một Dockerfile, chỉ copy artifacts cần thiết sang stage cuối.

### Ví dụ: Go Application

```dockerfile
# Stage 1: Build
FROM golang:1.22-alpine AS builder

WORKDIR /build

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

# Stage 2: Production image
FROM alpine:3.19

# Chỉ copy binary đã compile
COPY --from=builder /build/app /app

# Thêm certificates cho HTTPS calls
RUN apk add --no-cache ca-certificates

EXPOSE 8080

USER nobody

CMD ["/app"]
```

Kết quả: Image Go production chỉ khoảng 10-15MB thay vì 300MB+ nếu dùng golang base image.

### Ví dụ: React/Next.js Application

```dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Tạo non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy chỉ những gì cần cho production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
```

### Ví dụ: Java Spring Boot

```dockerfile
# Stage 1: Build với Maven
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Chạy với JRE (nhỏ hơn JDK)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Best Practices - Tối ưu Dockerfile

**1. Sắp xếp layers từ ít thay đổi đến hay thay đổi nhất:**

```dockerfile
# Xấu - copy code trước, install dependencies sau
# Mỗi lần thay đổi code sẽ reinstall tất cả dependencies
COPY . .
RUN npm install

# Tốt - install dependencies trước
# Layer này được cache, chỉ rebuild khi package.json thay đổi
COPY package*.json ./
RUN npm install
COPY . .
```

**2. Gộp RUN commands để giảm số layers:**

```dockerfile
# Xấu - tạo 3 layers
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# Tốt - một layer, và dọn dẹp cùng lúc
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*
```

**3. Dùng specific tags thay vì latest:**

```dockerfile
# Xấu - không biết version nào
FROM node:latest

# Tốt - cụ thể, reproducible
FROM node:20.11.0-alpine3.19
```

**4. Chỉ định USER:**

```dockerfile
# Tạo non-root user
RUN useradd --create-home --shell /bin/bash appuser
USER appuser
```

**5. Dùng COPY thay vì ADD (trừ khi cần untar):**

```dockerfile
# Thường dùng COPY - rõ ràng hơn
COPY requirements.txt .

# Chỉ dùng ADD khi cần tự động extract archive
ADD archive.tar.gz /app/
```

### Best Practices Bảo mật

**Không embed secrets vào image:**

```dockerfile
# Tuyệt đối không làm thế này
ENV AWS_SECRET_KEY=mysecretkey
RUN aws s3 sync s3://bucket .
```

Dùng build arguments (chỉ có trong build time, không persist vào image):
```bash
docker build --build-arg AWS_KEY=$AWS_KEY .
```

Hoặc tốt hơn: mount secrets trong runtime qua Docker Compose environment hoặc Kubernetes secrets.

**Scan image vulnerabilities:**

```bash
# Docker Scout (tích hợp sẵn Docker Desktop)
docker scout cves my-app:latest

# Hoặc dùng Trivy (open source)
trivy image my-app:latest
```

**Dùng read-only filesystem khi có thể:**

```yaml
services:
  web:
    read_only: true
    tmpfs:
      - /tmp  # Cho phép write vào /tmp
```

**Giới hạn resources:**

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          memory: 128M
```

### Docker Registry - Lưu trữ và chia sẻ Images

**Docker Hub (public):**

```bash
# Login
docker login

# Tag image với Docker Hub username
docker tag my-app:1.0 username/my-app:1.0

# Push lên Hub
docker push username/my-app:1.0

# Pull về
docker pull username/my-app:1.0
```

**GitHub Container Registry (GHCR):**

```bash
# Login với GitHub token
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag và push
docker tag my-app ghcr.io/username/my-app:latest
docker push ghcr.io/username/my-app:latest
```

**Self-hosted Registry:**

```yaml
# compose.yml cho private registry
services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    volumes:
      - registry_data:/var/lib/registry

volumes:
  registry_data:
```

```bash
# Push lên local registry
docker tag my-app localhost:5000/my-app:1.0
docker push localhost:5000/my-app:1.0
```

### Monitoring và Debugging

**Xem resource usage:**

```bash
# Stats realtime của tất cả containers
docker stats

# Stats của container cụ thể
docker stats my-container

# Inspect chi tiết container
docker inspect my-container

# Xem disk usage
docker system df
```

**Dọn dẹp:**

```bash
# Xóa containers đã dừng, images không dùng, networks, cache
docker system prune

# Xóa luôn cả volumes không dùng
docker system prune --volumes

# Chỉ xóa images không có tag
docker image prune

# Xóa tất cả images không được dùng bởi container nào
docker image prune -a
```

### Từ Docker đến Kubernetes

Khi ứng dụng scale lên, Docker Compose không còn đủ. Kubernetes (K8s) là bước tiếp theo:

| | Docker Compose | Kubernetes |
|---|---|---|
| Scale | Manual | Auto-scaling |
| Load balancing | Manual (Nginx) | Built-in |
| Self-healing | Không | Tự restart failed containers |
| Rolling updates | Không | Zero-downtime deploys |
| Phù hợp | Dev, small projects | Production, large scale |

Con đường học tiếp sau Docker:

1. **Docker Swarm** - orchestration đơn giản hơn K8s, tích hợp sẵn Docker
2. **Kubernetes** - tiêu chuẩn production, học qua minikube hoặc k3s
3. **Helm** - package manager cho Kubernetes
4. **CI/CD với Docker** - GitHub Actions, GitLab CI, Jenkins

### Tóm tắt toàn series

Qua 4 phần, bạn đã học:

**Phần 1 - Nền tảng:**
- Container vs VM
- Các khái niệm cơ bản: Image, Container, Dockerfile

**Phần 2 - Thực hành:**
- Cài Docker
- Viết Dockerfile cho Node.js, Python
- Build image và chạy container

**Phần 3 - Docker Compose:**
- Chạy multi-container stack
- Volumes, Networks, Environment variables
- Dev vs Production configs

**Phần 4 - Nâng cao:**
- Multi-stage builds
- Security best practices
- Docker Registry
- Con đường đến Kubernetes

Docker không phải là đích đến - đó là nền tảng. Khi bạn thoải mái với Docker, mọi công nghệ tiếp theo trong DevOps và Cloud đều trở nên dễ tiếp cận hơn nhiều.

---

*Bạn có thể bắt đầu ngay hôm nay bằng cách containerize một dự án hiện có của mình và deploy nó lên một VPS.*
