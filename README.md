# ZHANG TAO — Selected Works

张涛舞台视觉设计作品集。白色底色、浅灰区块与少量金色标记；紧凑的图片索引、桌面侧栏、分类快捷入口和缩略图/列表切换。图标使用内联 SVG，手机和桌面采用同一套线条。全部站内路径、图片与简历文件名为英文。使用 Vite 和原生 JavaScript，无后端或第三方字体请求。

## 内容

已读取用户提供的完整第 1–36 页 PDF。网站展示 18 组带图片的作品与 9 条其他项目经历；包含中央戏剧学院舞台美术系背景、模型收藏与展出记录、简历下载、电话、微信复制及用户确认的邮箱。职责和成果仅使用 PDF 明确注明的信息；不补写任职、毕业年份或成效数据。

对照完整 36 页 PDF 的全部嵌入图片，已收录 120 张作品图与 1 张肖像；没有标题的连续图片页也纳入清单。广安奇妙夜船游收录第 15–19 页全部 18 张图，光影织诗含第 23 页灯位图，正义必胜含第 24–26 页全部图像。第 28、36 页暂以描述性名称“宴会空间灯光”“空间场景设计”单独展示，不将无标题图像归入未经确认的其他项目。

青山正街图库区分前期预演和街区实拍。简历下载文件由原 PDF 前三页组成，保留原件内容；网页邮箱按照用户回复纠正。

## 开发

在 /workspace/zhangtao-hhh 执行：

```bash
npm ci --cache /tmp/zhangtao-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

普通域名根目录部署：`npm run build`。

GitHub Pages 子目录部署：`npm run build:pages`，站点基路径为 `/zhangtao-hhh/`。构建产物在 `dist/`，包含首页、18 个作品详情页、`/work`、`/about`、404 页面及 `.nojekyll`，可在静态服务器上直接打开与刷新，不依赖单页应用回退。

## 文件

- `src/projects.js`：项目资料、职责、图像与来源页码。
- `src/main.js`：页面、导航、筛选与放大查看。
- `src/style.css`：桌面、手机布局与减少动态效果设置。
- `scripts/static-routes.js`：生成可直接访问的静态路径。
- `public/images/`：PDF 中的 WebP 图像。
- `public/files/resume.pdf`：原简历和项目索引。

## 图片加载

`public/images/` 保留原始 WebP，点开放大时才请求原图。首页和图库使用 240 / 480 / 800px 的预览、`srcset` 与 `sizes`，预留图片尺寸并延迟加载屏幕外图像。失败请求会自动重试两次，仍未加载的图片可以手动重新加载；网络恢复也会触发重试。放大查看先显示预览，原图加载成功后再替换。

预览和 `src/image-manifest.json` 已纳入版本管理，常规构建无额外依赖。新增或替换原图后，安装 Pillow 并运行 `python scripts/prepare-images.py` 重新生成。

## 完整性校验

`content/pdf-image-map.json` 记录逐页图片路径、嵌入图片摘要、完整网站原图摘要和尺寸。`npm run check:content` 将这份原 PDF 清单与作品图库逐项核对，同时检查原图与三档预览均存在。构建会先执行此检查，遗漏图片或原图内容被改动时构建失败。两张旧图的裁切部分已恢复为完整原图，使用新的文件名避开旧缓存；构建也保留旧图片网址供旧页面访问。

## 验证

运行中的开发服务或生产预览可用 Python Playwright 与 Chromium 执行检查：

```bash
python scripts/browser-check.py
python scripts/media-check.py
```

可通过 `PORTFOLIO_TEST_URL` 设置测试地址。已检查 7 种首页宽度、18 个作品直接访问及图库、4 类筛选、图片放大与关闭、历史返回、简历下载、微信复制和 JavaScript 错误。

媒体检查模拟 390px、3 倍像素密度手机和 1.5 Mbps / 300ms 网络：首页全部图片请求约 661KB，比相同作品的原图约 2.87MB 减少 77%。另检查 SVG 图标、白灰背景、连续请求失败后的自动与手动重试、网络恢复补载，以及预览切换到高清原图。

为验证 GitHub Pages 子目录，使用普通 Python 静态服务器承载 `/zhangtao-hhh/` 构建；再以 `PORTFOLIO_STATIC=1` 运行上述检查。检查结果和截图写入已忽略的 `artifacts/`。窄屏 Chromium 检查不等同于 iOS Safari 真机测试。

## 发布状态

网站已发布到：https://1708445880-byte.github.io/zhangtao-hhh/

源码在 `main` 分支，生成站点在 `gh-pages` 分支。GitHub Pages 自动构建与部署已成功。更新源码后需重新运行 `npm run build:pages`，将生成页面更新到 `gh-pages` 才会更新公开网站；只推送 `main` 不会更改已发布页面。

公网首页和所有页面、样式、脚本、图片及简历文件均以保留 TLS 校验的请求检查，并与本地已完成浏览器功能检查的构建逐文件对比。云环境的 Chromium 直接访问公网遇到证书信任错误；没有关闭 TLS 校验或修改证书信任来跳过该错误。普通静态服务器上的桌面与窄屏浏览器功能检查通过。
