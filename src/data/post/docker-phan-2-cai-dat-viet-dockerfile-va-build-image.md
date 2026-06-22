---
title: 'Docker Phần 2 - Cài đặt, viết Dockerfile và build Image đầu tiên'
excerpt: 'Cài Docker, viết Dockerfile từ đầu, build image và chạy container đầu tiên - hướng dẫn chi tiết từng lệnh cho người mới bắt đầu hoàn toàn.'
category: 'study'
tags: ['docker', 'dockerfile', 'devops', 'lap-trinh', 'tu-hoc']
author: 'Tuan Kiet'
publishDate: 2026-06-22T09:00:00.000Z
image: '~/assets/images/docker-phan-2-cai-dat-viet-dockerfile-va-build-image.webp'
series: 'docker-tu-co-ban-den-nang-cao'
chapter: 2
---

> Lý thuyết đủ rồi. Giờ mở terminal và làm thật.

### Cài đặt Docker

**macOS và Windows:**
Tải Docker Desktop từ [docker.com/products/docker-desktop](https://docker.com/products/docker-desktop). Cài đặt như phần mềm bình thường. Docker Desktop bao gồm Docker Engine, Docker CLI và Docker Compose.

**Linux (Ubuntu/Debian):**

```bash
# Cập nhật package index
sudo apt-get update

# Cài các package cần thiết
sudo apt-get install ca-certificates curl gnupg

# Thêm Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Thêm repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Chạy Docker không cần sudo
sudo usermod -aG docker $USER
newgrp docker
```

**Kiểm tra cài đặt thành công:**

```bash
docker --version
# Docker version 25.x.x, build xxxxx

docker run hello-world
# Sẽ pull image hello-world và in ra thông báo "Hello from Docker!"
```

### Các lệnh Docker cơ bản cần biết ngay

Trước khi viết Dockerfile, làm quen với một số lệnh hay dùng:

```bash
# Pull image từ Docker Hub
docker pull nginx

# Xem danh sách images đang có
docker images

# Chạy container từ image
docker run nginx

# Chạy container ở background (-d = detached)
docker run -d nginx

# Xem container đang chạy
docker ps

# Xem tất cả container (cả đã dừng)
docker ps -a

# Dừng container
docker stop <container_id hoặc name>

# Xóa container
docker rm <container_id hoặc name>

# Xóa image
docker rmi <image_name>

# Xem logs của container
docker logs <container_id>

# Vào trong container (chạy bash)
docker exec -it <container_id> bash
```

### Viết Dockerfile đầu tiên - Ứng dụng Node.js

Hãy containerize một ứng dụng Node.js đơn giản. Tạo thư mục mới:

```bash
mkdir my-docker-app
cd my-docker-app
```

Tạo file `app.js`:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from Docker!',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Tạo `package.json`:

```json
{
  "name": "my-docker-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

Bây giờ tạo `Dockerfile` (không có extension):

```dockerfile
# 1. Chỉ định base image
FROM node:20-alpine

# 2. Đặt thư mục làm việc trong container
WORKDIR /app

# 3. Copy package.json trước (để tận dụng Docker layer cache)
COPY package*.json ./

# 4. Cài dependencies
RUN npm install

# 5. Copy toàn bộ source code
COPY . .

# 6. Expose port ứng dụng sẽ lắng nghe
EXPOSE 3000

# 7. Lệnh chạy khi container start
CMD ["node", "app.js"]
```

### Giải thích từng dòng Dockerfile

**`FROM node:20-alpine`** - Base image. `node:20-alpine` là image Node.js 20 dựa trên Alpine Linux - rất nhỏ gọn (khoảng 50MB thay vì 900MB của full Node image).

**`WORKDIR /app`** - Đặt `/app` làm thư mục làm việc. Mọi lệnh sau đó đều chạy trong thư mục này.

**`COPY package*.json ./`** - Copy `package.json` và `package-lock.json` vào container. Tại sao copy riêng trước? Vì Docker caches mỗi layer - nếu `package.json` không thay đổi, Docker dùng cache và không chạy lại `npm install`.

**`RUN npm install`** - Chạy lệnh trong quá trình build image. Cài tất cả dependencies.

**`COPY . .`** - Copy source code vào container. Dấu `.` đầu là thư mục hiện tại trên máy host, dấu `.` sau là thư mục làm việc trong container (`/app`).

**`EXPOSE 3000`** - Khai báo container lắng nghe port 3000. Đây chỉ là documentation - không tự động mở port ra ngoài.

**`CMD ["node", "app.js"]`** - Lệnh mặc định chạy khi container start. Dùng array format (exec form) - được khuyến nghị vì không tạo shell process cha.

### Tạo .dockerignore

Trước khi build, tạo `.dockerignore` để không copy những thứ không cần vào image:

```
node_modules
npm-debug.log
.git
.gitignore
*.md
.env
.env.*
Dockerfile
.dockerignore
```

### Build image

```bash
# Cú pháp: docker build -t <name>:<tag> <build_context>
docker build -t my-app:1.0 .

# Theo dõi output:
# [1/5] FROM node:20-alpine
# [2/5] WORKDIR /app
# [3/5] COPY package*.json ./
# [4/5] RUN npm install
# [5/5] COPY . .
# Successfully built abc123def456
# Successfully tagged my-app:1.0
```

**`-t my-app:1.0`** - đặt tên (tag) cho image. Format: `name:version`. Nếu không có `:version`, mặc định là `latest`.

**`.`** - build context - thư mục chứa Dockerfile và files cần copy.

Kiểm tra image vừa tạo:

```bash
docker images
# REPOSITORY   TAG     IMAGE ID       SIZE
# my-app       1.0     abc123def456   180MB
```

### Chạy container

```bash
# Chạy container, map port 8080 (máy host) -> 3000 (container)
docker run -p 8080:3000 my-app:1.0
```

Mở browser vào `http://localhost:8080` - bạn sẽ thấy JSON response.

**`-p 8080:3000`** - Port mapping. Format: `host_port:container_port`. Container đang lắng nghe port 3000 bên trong, nhưng từ máy host bạn truy cập qua port 8080.

Chạy ở background:

```bash
docker run -d -p 8080:3000 --name my-running-app my-app:1.0
```

**`-d`** - detached mode, chạy ở background.

**`--name my-running-app`** - đặt tên cho container để dễ quản lý.

### Kiểm tra và debug

```bash
# Xem container đang chạy
docker ps

# Xem logs
docker logs my-running-app

# Xem logs realtime
docker logs -f my-running-app

# Vào trong container để debug
docker exec -it my-running-app sh

# Từ trong container:
# ls /app        -> xem files
# cat /app/app.js -> xem source code
# exit           -> thoát
```

### Tối ưu Dockerfile cho production

Dockerfile đơn giản ở trên hoạt động tốt nhưng có thể tối ưu hơn:

```dockerfile
FROM node:20-alpine

# Chạy với non-root user (bảo mật tốt hơn)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

COPY package*.json ./

# Chỉ cài production dependencies
RUN npm ci --only=production

COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3000

# Thêm healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "app.js"]
```

### Dockerfile cho Python (Django/Flask)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Cài system dependencies (nếu cần)
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myapp.wsgi:application"]
```

### Phần tiếp theo

Phần 3 sẽ hướng dẫn Docker Compose - cách chạy nhiều container cùng lúc (ví dụ: web app + database + Redis) với một file cấu hình duy nhất.
