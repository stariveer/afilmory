# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Afilmory 是一个现代化的照片画廊网站，支持从多种存储源（S3、GitHub等）自动同步照片，采用高性能 WebGL 渲染、瀑布流布局、EXIF 信息显示、缩略图生成等功能。

这是一个基于 pnpm 的 monorepo 项目，使用 TypeScript + React 技术栈开发。

## 常用命令

### 开发环境
```bash
# 启动主应用（SSR + Web 前端）
pnpm dev

# 单独启动 SSR 服务端
pnpm dev:be

# 单独启动 Web 前端（在 SSR 模式下）
pnpm --filter web dev

# 启动文档站点
pnpm docs:dev

# 启动落地页
pnpm --filter landing dev
```

### 构建命令
```bash
# 构建主应用
pnpm build

# 构建文档
pnpm docs:build

# 构建落地页
pnpm --filter landing build

# 构建照片清单（处理照片和生成缩略图）
pnpm build:manifest

# 准备演示数据
pnpm build:demo
```

### 数据库管理
```bash
# 进入 SSR 应用目录
cd apps/ssr

# 生成数据库迁移文件
pnpm db:generate

# 执行数据库迁移
pnpm db:migrate
```

### 代码质量
```bash
# 代码格式化
pnpm format

# 代码检查和自动修复
pnpm lint
```

### 其他实用工具
```bash
# 创建新文档
pnpm create:doc

# 提取字体字形
pnpm extract:font

# 迁移清单格式
pnpm migrate:manifest

# 更新文件最后修改时间
pnpm update:lastmodified
```

## 项目架构

### Monorepo 结构
```
afilmory/
├── apps/                    # 应用程序
│   ├── ssr/                # Next.js SSR 应用（主应用）
│   ├── landing/            # 营销落地页
│   └── docs/               # 文档站点
├── packages/               # 共享包
│   ├── builder/            # 照片处理构建工具
│   ├── ui/                 # UI 组件库
│   ├── hooks/              # 共享 React Hooks
│   ├── data/               # 数据类型定义
│   └── sdk/                # SDK
├── be/                     # 后端服务（如果存在）
└── scripts/                # 构建和工具脚本
```

### 核心技术栈
- **前端**: React 19, TypeScript, Tailwind CSS, Radix UI
- **后端**: Next.js 16, Node.js, PostgreSQL
- **构建工具**: Vite, Sharp (图片处理)
- **状态管理**: Jotai, TanStack Query
- **数据库**: Drizzle ORM, PostgreSQL
- **存储**: 支持 S3、GitHub、本地文件系统等多种存储后端

### 照片处理流程
1. **存储适配器**: 通过适配器模式支持多种存储后端
2. **图片处理管道**:
   - HEIC/HEIF 转换
   - TIFF 转换
   - 缩略图生成（多尺寸）
   - EXIF 信息提取
   - Blurhash 生成
   - Live Photo 检测
3. **清单生成**: 生成 photos-manifest.json 作为前端数据源
4. **增量同步**: 智能变更检测，只处理新增或修改的照片

### Builder 包架构
`packages/builder` 是核心的照片处理包：
- **存储提供者**: S3、GitHub、Eagle、本地文件系统
- **图片处理器**: 多进程/多线程并发处理
- **插件系统**: 可扩展的处理插件
- **性能优化**: Worker Threads/Cluster 支持

## 开发指南

### 代码规范（基于 Cursor 规则）
1. **避免重复代码**: 提取通用类型和组件
2. **组件拆分**: 避免逻辑过大的组件，使用 Hook 和小组件拆分
3. **React 最佳实践**: 熟练使用 Context、状态下沉解决重渲染问题

### 国际化 (i18n)
- 使用扁平键结构，用 `.` 分割
- 区分单复数：`_one` 和 `_other` 形式
- 避免键冲突（如 `exif.custom.rendered` 与 `exif.custom.rendered.custom`）
- 优先修改 en.json，其他语言文件会自动同步

### 环境变量
- 主要配置在 `apps/ssr/src/env.ts`
- 使用 `@t3-oss/env-nextjs` 进行类型安全的环境变量管理
- 数据库连接字符串等敏感信息通过环境变量配置

### 数据库
- 使用 Drizzle ORM + PostgreSQL
- 数据库配置在 `apps/ssr/drizzle.config.ts`
- Schema 文件位于 `apps/ssr/src/schemas/`

### 存储配置
- Builder 配置支持多种存储后端
- 默认配置在 `packages/builder/src/config/defaults.ts`
- 支持并发处理和性能优化配置

## 测试和调试

### 单独测试组件
由于是 monorepo 结构，可以使用 `pnpm --filter <package-name>` 来单独运行特定包的命令：
```bash
# 测试 UI 包
pnpm --filter @afilmory/ui dev

# 测试 Builder
pnpm --filter @afilmory/builder build
```

### 调试照片处理
```bash
# 运行 Builder CLI 进行交互式操作
pnpm build:manifest

# 查看详细处理日志
# 在 config 中设置 verbose: true
```

## 部署

项目支持多种部署方式：
1. **Docker 部署**: 推荐方式，使用预构建镜像
2. **手动部署**: 需要配置存储访问和生成清单文件
3. **Vercel/Netlify**: 适合前端部分部署

具体部署指南参考项目 README.md 和文档站点。