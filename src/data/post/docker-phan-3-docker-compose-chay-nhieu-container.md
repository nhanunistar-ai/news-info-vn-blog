---
title: 'Docker Phần 3 - Docker Compose: Chạy nhiều container cùng lúc'
excerpt: 'Ứng dụng thực tế không chỉ có một container. Docker Compose cho phép định nghĩa và chạy toàn bộ stack (web + database + cache) bằng một file YAML duy nhất.'
category: 'study'
tags: ['docker', 'docker-compose', 'devops', 'lap-trinh', 'tu-hoc']
author: 'Tuan Kiet'
publishDate: 2026-06-22T10:00:00.000Z
image: '~/assets/images/docker-phan-3-docker-compose-chay-nhieu-container.webp'
series: 'docker-tu-co-ban-den-nang-cao'
chapter: 3
---

> Ứng dụng thực tế không bao giờ chỉ có một container. Một web app điển hình cần: web server, database, cache, queue. Docker Compose giúp bạn quản lý tất cả với một lệnh duy nhất.

### Docker Compose là gì?

Docker Compose là công cụ để định nghĩa và chạy multi-container Docker applications. Bạn mô tả toàn bộ stack trong một file `compose.yml` (hoặc `docker-compose.yml`), rồi dùng một lệnh để khởi động tất cả.

Thay vì chạy nhiều lệnh `docker run` phức tạp và phải nhớ tất cả options, bạn viết một lần vào file và lần sau chỉ cần `docker compose up`.

### Cú pháp cơ bản của compose.yml

```yaml
services:
  service-name:
    image: image-name:tag # Dùng image có sẵn
    # HOẶC
    build: . # Build từ Dockerfile
    ports:
      - 'host_port:container_port'
    environment:
      - ENV_VAR=value
    volumes:
      - host_path:container_path
    depends_on:
      - other-service
```

### Ví dụ thực tế: Web App + PostgreSQL + Redis

Tạo dự án với cấu trúc:

```
my-app/
├── app/
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
├── compose.yml
└── .env
```

File `compose.yml`:

```yaml
services:
  # Service 1: Web Application
  web:
    build: ./app
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./app:/app # Mount source code (cho development)
      - /app/node_modules # Giữ node_modules trong container
    restart: unless-stopped

  # Service 2: PostgreSQL Database
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data # Persistent volume
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U user -d mydb']
      interval: 10s
      timeout: 5s
      retries: 5

  # Service 3: Redis Cache
  cache:
    image: redis:7-alpine
    ports:
      - '6379:6379' # Expose để dev có thể kết nối trực tiếp

# Định nghĩa named volumes
volumes:
  postgres_data:
```

### Chạy toàn bộ stack

```bash
# Start tất cả services (build nếu cần)
docker compose up

# Start ở background
docker compose up -d

# Chỉ rebuild images rồi start
docker compose up --build

# Start chỉ một service cụ thể
docker compose up db
```

```bash
# Xem trạng thái các services
docker compose ps

# Xem logs
docker compose logs

# Xem logs của một service cụ thể
docker compose logs web

# Xem logs realtime
docker compose logs -f web

# Dừng tất cả services
docker compose stop

# Dừng và xóa containers (giữ volumes)
docker compose down

# Dừng, xóa containers VÀ volumes
docker compose down -v
```

### Dùng biến môi trường với .env

Không nên hardcode password hay secrets trong compose.yml. Dùng file `.env`:

```bash
# .env
POSTGRES_DB=mydb
POSTGRES_USER=user
POSTGRES_PASSWORD=supersecretpassword
REDIS_VERSION=7-alpine
```

```yaml
# compose.yml - đọc từ .env tự động
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

Thêm `.env` vào `.gitignore` để không commit secrets.

### Volumes - Lưu trữ dữ liệu bền vững

Container là ephemeral - khi xóa container, data bên trong mất. Volumes giải quyết vấn đề này.

**Named volumes** - Docker quản lý, tốt nhất cho data cần persist:

```yaml
services:
  db:
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data: # Định nghĩa named volume
```

**Bind mounts** - Map thư mục từ host, tốt cho development:

```yaml
services:
  web:
    volumes:
      - ./src:/app/src # Thay đổi code tức thì không cần rebuild
```

**Anonymous volume** - Tránh bind mount ghi đè folder trong container:

```yaml
services:
  web:
    volumes:
      - ./app:/app
      - /app/node_modules # Giữ node_modules của container, không bị ghi đè bởi host
```

### Networks - Giao tiếp giữa containers

Mặc định, Docker Compose tạo một network riêng cho mỗi project. Các services trong cùng file compose có thể giao tiếp với nhau qua **tên service**.

Ví dụ: từ service `web`, bạn kết nối đến database bằng hostname `db` (tên service), không phải `localhost`:

```javascript
// Đúng - dùng tên service
const dbUrl = 'postgresql://user:pass@db:5432/mydb';

// Sai - không dùng localhost
const dbUrl = 'postgresql://user:pass@localhost:5432/mydb';
```

Custom networks khi cần tách biệt:

```yaml
services:
  web:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend # db chỉ accessible từ backend network

  nginx:
    networks:
      - frontend # nginx chỉ ở frontend

networks:
  frontend:
  backend:
```

### Compose cho development vs production

Thực tế thường dùng 2 file:

`compose.yml` - base config:

```yaml
services:
  web:
    image: my-app:latest
    environment:
      - NODE_ENV=production
```

`compose.dev.yml` - override cho development:

```yaml
services:
  web:
    build: .
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
    command: npm run dev # Hot reload
```

Chạy dev environment:

```bash
docker compose -f compose.yml -f compose.dev.yml up
```

### Ví dụ thực tế: Full Stack với Nginx

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/conf:/etc/letsencrypt:ro
    depends_on:
      - api
      - frontend

  api:
    build: ./backend
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/prod
    expose:
      - '8000' # expose chỉ trong Docker network, không ra ngoài

  frontend:
    build: ./frontend
    expose:
      - '3000'

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}

volumes:
  pgdata:
```

### Lệnh exec - Chạy lệnh trong container đang chạy

```bash
# Mở shell trong container
docker compose exec web sh

# Chạy database migration
docker compose exec api python manage.py migrate

# Kết nối vào PostgreSQL
docker compose exec db psql -U user -d mydb

# Chạy tests
docker compose exec web npm test
```

### Phần tiếp theo

Phần 4 - phần cuối - sẽ cover những kỹ thuật nâng cao: multi-stage builds để tối ưu image size, best practices bảo mật, và giới thiệu con đường tiến lên Kubernetes.
