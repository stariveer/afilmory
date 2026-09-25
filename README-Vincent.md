# 魔改

## 软链接

```
rm -rf apps/web/dist
ln -s ../../../afilmory-dist ./apps/web/dist

ln -s ../images/public/photos ./photos
```

## 构建命令

```
# 1. 生成缩略图和 manifest（应用新的宽度和质量）
pnpm run build:manifest -- --force;

# 2. 构建纯静态 web 应用
pnpm --filter @afilmory/web build;

# 3. 增量构建缩略图和 manifest和 web
pnpm run build:manifest;
pnpm --filter @afilmory/web build;

## 3.1 全量构建缩略图和 manifest和 web
pnpm run build:manifest  -- --force;
pnpm --filter @afilmory/web build;

# 4. 本地查看
cd ~/code/afilmory/apps/web/dist;
python -m http.server 9999 --bind 127.0.0.1;

open http://local.trainspott.in:9999/
```

# 5. 上传照片

```
up
```

## 5.1 部署到cloudflare pages

```
cd ~/code/afilmory/apps/web/dist;
pnpm dlx wrangler pages deploy ~/code/afilmory/apps/web/dist \
 --project-name afilmory-dist \
 --branch "main" \
 --commit-message "Manual deployment via Wrangler"
```
