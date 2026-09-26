# 个人维护与使用手册
 
## 1. 同步官方上游（保持个人定制 Commit 永远置顶）

```bash
pnpm run upstream:sync
```

---

## 2. 照片处理与构建流水线
> **架构说明**：大图通过 Cloudflare R2 托管（`https://images.trainspott.in/photos`），本地原图存放于 `../images/public/photos`，无需手动建立软链接。


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
