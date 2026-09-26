# Afilmory 个人维护与运维手册

> **核心架构与路径索引**：
> - **相册线上地址**：`https://gallery.hexi.ng` (Cloudflare Pages `afilmory-dist`)
> - **图床托管地址**：`https://images.hexi.ng/photos` (Cloudflare R2 `images`)
> - **本地原图目录**：`~/code/images/public/photos/` (按年/月归档，如 `2026/08/xxx.jpg`)
> - **缩略图与元数据**：`apps/web/public/thumbnails/` & `apps/web/src/data/photos-manifest.json`

---

## 🛠️ 三大专属命令行工具分工

| 命令行工具 | 专属职责 | 典型调用场景 |
| :--- | :--- | :--- |
| **`up`** | **R2 大图云端同步** | 仅同步本地 `~/code/images/public` 与 Cloudflare R2，不触碰相册代码 |
| **`up-gallery-web`** | **前端产物纯部署** | 仅将已编译好的 `apps/web/dist` 秒传部署到 Cloudflare Pages，不重新构建 |
| **`up-gallery`** | **相册全流程总控** | **日常推荐**：一键自动串联“传大图 $
ightarrow$ 算缩略图 $
ightarrow$ 编译前端 $
ightarrow$ 部署上线 $
ightarrow$ 发送通知” |

---

## 📌 日常操作场景速查表

### 方式 A：推荐使用 `up-gallery`（一条龙全自动，最省心）

日常增删改查照片或配置，直接在终端敲对应命令即可完成从本地到线上的全自动闭环：

| 操作场景 | 执行命令 | 自动化执行逻辑与特点 | 耗时预估 |
| :--- | :--- | :--- | :--- |
| **1. 增加了新照片** | `up-gallery "Add photos"` | 自动调 `up` 传大图 $
ightarrow$ 增量生成新缩略图与元数据 $
ightarrow$ 编译前端 $
ightarrow$ 部署上线 | 约 10~20s |
| **2. 删除了旧照片** | `up-gallery "Delete photos"` | 自动调 `up` 镜像清理 R2 $
ightarrow$ 自动从 Manifest 剔除 $
ightarrow$ 编译前端 $
ightarrow$ 部署上线 | 约 10s |
| **3. 仅修改 EXIF / 标签** | `up-gallery meta "Update EXIF"` | **极速模式**：跳过缩略图重新压缩，仅刷新 Manifest 数据 $
ightarrow$ 编译前端 $
ightarrow$ 部署 | 约 10s |
| **4. 改了站点配置/作者信息** | `up-gallery web "Update config"` | **前端模式**：不处理照片与元数据，直接重新编译前端页面 $
ightarrow$ 部署上线 | 约 10s |
| **5. 全量重构所有缩略图** | `up-gallery rebuild "Full rebuild"` | **重度模式**：重新扫描并重写全部 998+ 张缩略图与元数据 $
ightarrow$ 编译前端 $
ightarrow$ 部署 | 约 2~3min |
| **6. 启动本地生产预览** | `up-gallery preview` | 快速在本地启动生产环境静态站点服务 (`http://localhost:4173`) | 即时启动 |

> 💡 **小提示**：命令末尾的提交描述文字可以省略（例如直接执行 `up-gallery`），脚本会自动使用预设的说明。

---

### 方式 B：底层分步手动执行（精细控制各环节）

如果你想手动逐步执行各环节，各场景对应的底层命令分解如下：

#### 场景 1：日常添加新照片
```bash
# 1. 增量上传大图到 Cloudflare R2
up

# 2. 增量扫描新照片，生成对应的 WebP 缩略图与更新 manifest 数据
pnpm run build:manifest

# 3. 重新编译前端静态产物
pnpm --filter web build

# 4. 纯部署到 Cloudflare Pages
up-gallery-web "Add new photos"
```

#### 场景 2：删除/下架照片
```bash
# 1. 本地删除文件后，镜像同步清理云端 R2 大图
up

# 2. 构建器自动检测已删除图片并从元数据中剔除，重新编译前端
pnpm run build:manifest && pnpm --filter web build

# 3. 部署上线
up-gallery-web "Delete photos"
```

#### 场景 3：仅修改了照片 EXIF / 拍摄时间 / 标签 / 标题
> 💡 照片像素文件未变，使用 `--force-manifest` 可以在十几秒内提取元数据，**完全跳过缩略图的重复压缩**：
```bash
pnpm run build:manifest -- --force-manifest
pnpm --filter web build
up-gallery-web "Update photo EXIF metadata"
```

#### 场景 4：仅修改了站点配置或前端样式
```bash
# 仅重新编译前端页面并发布
pnpm --filter web build
up-gallery-web "Update site config"
```

#### 场景 5：全量强制重构缩略图
```bash
# 强制清除旧缓存，全量重新生成全部缩略图与 Manifest
pnpm run build:manifest -- --force
pnpm --filter web build
up-gallery-web "Full rebuild"
```

---

## 💻 本地预览与调试

```bash
# 1. 静态产物真实预览（模拟线上生产环境，也可使用 up-gallery preview）
pnpm --filter web serve

# 2. 边改代码边调试（支持代码热更新 HMR）
pnpm --filter web dev
```

---

## 🔄 同步官方上游最新代码

本项目为基于官方上游魔改的定制分支（`release/main-my`）。使用预设命令可自动拉取官方最新代码并使用 rebase 保持个人定制提交永远置顶：

```bash
pnpm run upstream:sync
```
