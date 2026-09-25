# 个人维护与使用手册

## 0. 同步官方上游（线性变基，定制 Commit 永远浮在最顶层）

```bash
pnpm run upstream:sync
```

---

## 1. 软链接配置（初始化）

```bash
# dist 软链接到部署仓库（如需要）
rm -rf apps/web/dist
ln -s ../../../afilmory-dist ./apps/web/dist

# 本地原图软链接
ln -s ../images/public/photos ./photos
```

---

## 2. 照片处理与构建流水线

### 2.1 日常增量构建（有新照片时）
```bash
# 增量扫描新照片并生成缩略图与 manifest
pnpm run build:manifest

# 构建 Web 纯静态页面
pnpm --filter web build
```

### 2.2 仅重构 Manifest 元数据（微调了 EXIF/标签时推荐，不重复压缩缩略图）
```bash
pnpm run build:manifest -- --force-manifest
pnpm --filter web build
```

### 2.3 全量强制重构（重新生成所有缩略图和 Manifest）
```bash
pnpm run build:manifest -- --force
pnpm --filter web build
```

---

## 3. 本地预览与调试

### 3.1 生产环境预览（绑定本地域名，免受 Cloudflare 防盗链拦截）
```bash
# 直接在根目录启动预览，并绑定 local.trainspott.in
pnpm --filter web serve --host local.trainspott.in --port 9999

# 打开浏览器验证
open http://local.trainspott.in:9999/
```

### 3.2 边改代码边调试（支持代码热更新 HMR）
```bash
pnpm --filter web dev --host local.trainspott.in --port 5173
```

---

## 4. 上传与部署

### 4.1 部署到 Cloudflare Pages
```bash
cd ~/code/afilmory/apps/web/dist;
pnpm dlx wrangler pages deploy ~/code/afilmory/apps/web/dist \
 --project-name afilmory-dist \
 --branch "main" \
 --commit-message "Manual deployment via Wrangler"
```
