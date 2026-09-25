# Afilmory 上游升级与分支重构 TODO

- [x] 1. 创建当前分支备份快照 (`backup/release-main-my-20260925`)
- [x] 2. 更新本地 `main` 分支至最新 `upstream/main`
- [x] 3. 基于最新 `main` 创建干净重构分支 (`my-release`)
- [ ] 4. 迁移并提炼 5 个原子定制 Commit
  - [x] 4.1 迁移个人配置与部署规则 (`builder.config.ts`, `_headers`, `_routes.json`)
  - [x] 4.2 迁移个人品牌 Logo 与 Favicon 资源
  - [ ] 4.3 迁移 EXIF 标签提取器并适配上游最新代码 (`info-extractor.ts`, `exif.ts`, `photo.ts`)
  - [ ] 4.4 迁移缩略图参数调整 (`thumbnail.ts`)
  - [ ] 4.5 迁移 Web 端本土化与界面微调 (默认语言 `zh-CN`, 隐藏 RSS 图标)
- [ ] 5. 依赖安装与全量构建验证 (`pnpm install`, `type-check`, `build`)
- [ ] 6. 切换替换为生产分支 `release/main-my`
- [ ] 7. 在 `package.json` 配置日常一键同步脚本 (`pnpm run upstream:sync`)
