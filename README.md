# nestjs-template-all-in-one

nextjs 项目后端通用开发模板，集成了基本的用户注册、jwt 登陆等功能。

## 开发环境

- node >= 18
- mysql

## 使用方法

### 环境配置

使用前请先配置环境变量。

> .env 文件不要提交到 git 上！

```
# mysql配置
MYSQL_HOST=xxxxxx
MYSQL_PORT=xxxxxx
MYSQL_USERNAME=xxxxxx
MYSQL_PASSWORD=xxxxxx
MYSQL_DATABASE=xxxxxx

# 环境配置
NODE_ENV=development

# jwt配置
JWT_SECRET=xxxxxx
JWT_EXPIRERS_IN=7d
```

### 生成 pem 密钥

项目采用非对称加密处理登陆请求，需要手动生成密钥。

> 公钥和私钥不要提交到 git 上！

```sh
# 生成私钥
openssl genrsa -out private_key.pem 1024

# 生成公钥
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

### 启动 server

```sh
pnpm dev
```

## API

### 注册 `/api/v1/user/register#POST`

### 获取用户信息 `/api/v1/user/get_info#POST`

### 登陆 `/api/v1/auth/login#POST`

### 获取公钥 `/api/v1/auth/request_public_key#POST`

### 检查 token 是否有效 `/api/v1/auth/check_token#POST`

### 检查 email 是否重复 `/api/v1/auth/check_email#POST`
