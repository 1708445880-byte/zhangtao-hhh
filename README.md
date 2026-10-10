# ZHANG TAO — Selected Works

张涛舞台视觉设计作品集。暖白、墨黑与杂志式网格；全部站内路径、图片与简历文件名为英文。使用 Vite 和原生 JavaScript，无后端或第三方字体请求。

## 内容

已读取用户提供的完整第 1–36 页 PDF。网站展示 16 个带图片的项目与 9 条其他项目经历；包含中央戏剧学院舞台美术系背景、模型收藏与展出记录、简历下载、电话、微信复制及用户确认的邮箱。职责和成果仅使用 PDF 明确注明的信息；不补写任职、毕业年份或成效数据。

青山正街图库区分前期预演和街区实拍。简历下载文件由原 PDF 前三页组成，保留原件内容；网页邮箱按照用户回复纠正。

## 开发

在 /workspace/zhangtao-hhh 执行：

```bash
npm ci --cache /tmp/zhangtao-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

普通域名根目录部署：`npm run build`。

GitHub Pages 子目录部署：`npm run build:pages`，站点基路径为 `/zhangtao-hhh/`。构建产物在 `dist/`，包含首页、16 个项目详情页、`/work`、`/about`、404 页面及 `.nojekyll`，可在静态服务器上直接打开与刷新，不依赖单页应用回退。

## 文件

- `src/projects.js`：项目资料、职责、图像与来源页码。
- `src/main.js`：页面、导航、筛选与放大查看。
- `src/style.css`：桌面、手机布局与减少动态效果设置。
- `scripts/static-routes.js`：生成可直接访问的静态路径。
- `public/images/`：PDF 中的 WebP 图像。
- `public/files/resume.pdf`：原简历和项目索引。

## 验证

运行中的开发服务或生产预览可用 Python Playwright 与 Chromium 执行检查：

```bash
python scripts/browser-check.py
```

可通过 `PORTFOLIO_TEST_URL` 设置测试地址。已检查 7 种首页宽度、16 个项目直接访问及图库、4 类筛选、图片放大与关闭、历史返回、简历下载、微信复制和 JavaScript 错误。

为验证 GitHub Pages 子目录，使用普通 Python 静态服务器承载 `/zhangtao-hhh/` 构建；再以 `PORTFOLIO_STATIC=1` 运行上述检查。检查结果和截图写入已忽略的 `artifacts/`。窄屏 Chromium 检查不等同于 iOS Safari 真机测试。

## 发布状态

网站已发布到：https://1708445880-byte.github.io/zhangtao-hhh/

源码在 `main` 分支，生成站点在 `gh-pages` 分支。GitHub Pages 自动构建与部署已成功。更新源码后需重新运行 `npm run build:pages`，将生成页面更新到 `gh-pages` 才会更新公开网站；只推送 `main` 不会更改已发布页面。

公网首页和所有页面、样式、脚本、图片及简历文件均以保留 TLS 校验的请求检查，并与本地已完成浏览器功能检查的构建逐文件对比。云环境的 Chromium 直接访问公网遇到证书信任错误；没有关闭 TLS 校验或修改证书信任来跳过该错误。普通静态服务器上的桌面与窄屏浏览器功能检查通过。
