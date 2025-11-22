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
pnpm run build:manifest -- --force-thumbnails

# 2. 构建纯静态 web 应用
pnpm --filter @afilmory/web build

# 3. 增量构建缩略图和 manifest和 web
pnpm run build:manifest
pnpm --filter @afilmory/web build
```