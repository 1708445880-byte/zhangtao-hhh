import { projects } from './projects.js';

const base = import.meta.env.BASE_URL;
const siteUrl = path => base + path.replace(/^\//, '');
const app = document.querySelector('#app');
const rail = document.querySelector('.page-rail');
const categories = [['all', '全部作品'], ['lighting', '灯光与现场'], ['previsualization', '设计与预演'], ['theatre', '剧场作品']];
const countOf = category => projects.filter(p => category === 'all' || p.category === category).length;
const numberOf = project => String(projects.indexOf(project) + 1).padStart(2, '0');
const icon = '<span aria-hidden="true">↗</span>';
let filter = 'all';
let view = 'grid';
let sectionObserver;

for (const a of document.querySelectorAll('.site-header a[href^="/"], .site-footer a[href^="/"]')) {
  a.setAttribute('href', siteUrl(a.getAttribute('href')));
}

function renderRail(project) {
  rail.innerHTML = `<div class="rail-label">浏览目录 <span>CONTENTS</span></div>
    <nav class="rail-nav" aria-label="页面章节">
      <a href="${siteUrl('/#work')}" data-section="work"><span>01</span> 作品索引 ${icon}</a>
      <a href="${siteUrl('/#about')}" data-section="about"><span>02</span> 个人简介 ${icon}</a>
      <a href="${siteUrl('/#contact')}" data-section="contact"><span>03</span> 联系方式 ${icon}</a>
    </nav>
    <div class="rail-categories"><p class="eyebrow">按类型浏览</p>${categories.map(([id, name]) => `<button type="button" data-quick-filter="${id}" aria-pressed="${id === filter}">${name}<span>${String(countOf(id)).padStart(2, '0')}</span></button>`).join('')}</div>
    <details class="rail-index"><summary>项目目录 <span>16 ＋</span></summary><nav aria-label="项目目录">${projects.map(p => `<a href="${siteUrl(`/work/${p.id}`)}" ${p === project ? 'aria-current="page"' : ''}><span>${numberOf(p)}</span>${p.title}</a>`).join('')}</nav></details>
    <div class="rail-note"><span class="rail-mark" aria-hidden="true">ZT /</span><p>张涛<br>舞台视觉设计</p><span>中央戏剧学院 · 舞台美术系</span></div>`;
}

function home() {
  document.title = 'ZHANG TAO — Selected Works';
  app.innerHTML = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-topline"><span><i class="status-dot"></i> 张涛 / 作品选集</span><span>STAGE VISUAL DESIGN</span></div>
      <div class="hero-main">
        <div class="hero-copy"><p class="eyebrow">ZHANG TAO — PORTFOLIO</p><h1 id="hero-title">舞台视觉<span>与灯光设计</span></h1><p class="hero-serif">Stage, light & space.</p><p class="hero-description">舞美预演 · 灯光编程<br>设计方案与现场作品。</p><div class="hero-actions"><a class="primary-link" href="#work">浏览全部作品 <span>↓</span></a><a class="text-link" href="#about">了解张涛 ${icon}</a></div></div>
        <div class="hero-board"><a class="hero-feature" href="${siteUrl('/work/qingshan-zhengjie')}"><div class="feature-topline"><span>01 / 项目选读</span>${icon}</div><img src="${siteUrl('/images/c04-2.webp')}" alt="青山正街主塔灯光预演" fetchpriority="high"><div class="feature-caption"><h2>青山正街</h2><span>园区灯光预演</span></div></a><div class="hero-mini-projects">${['star-tide', 'the-trojans'].map(id => { const p = projects.find(x => x.id === id); return `<a href="${siteUrl(`/work/${p.id}`)}"><img src="${siteUrl(p.cover)}" alt="${p.title}" loading="lazy"><div><span>${p.title}</span><small>${p.label}</small></div>${icon}</a>`; }).join('')}</div></div>
      </div>
      <div class="hero-route">${categories.slice(1).map(([id, name]) => `<button type="button" data-quick-filter="${id}" aria-pressed="${id === filter}"><span class="route-count">${String(countOf(id)).padStart(2, '0')}</span><span>${name}</span><span aria-hidden="true">→</span></button>`).join('')}</div>
    </section>
    <section class="works section-pad" id="work" aria-labelledby="work-title">
      <div class="section-heading"><div><p class="eyebrow">01 / PROJECT INDEX</p><h2 id="work-title">作品索引 <span>Selected works</span></h2></div><p class="section-note">按类型筛选<br>打开项目，查看职责与图像</p></div>
      <div class="work-toolbar"><div class="filter-bar" role="group" aria-label="作品分类">${categories.map(([id, name]) => `<button type="button" class="filter ${id === filter ? 'active' : ''}" data-filter="${id}" aria-pressed="${id === filter}">${name}<span>${String(countOf(id)).padStart(2, '0')}</span></button>`).join('')}</div><div class="view-toggle" role="group" aria-label="作品排列"><button type="button" data-view="grid" aria-pressed="${view === 'grid'}" aria-label="缩略图排列">▦</button><button type="button" data-view="list" aria-pressed="${view === 'list'}" aria-label="列表排列">☰</button></div></div>
      <div class="index-meta"><span id="project-count" role="status"></span><span>项目 / 工作类型 / 图像</span></div><div class="project-grid" id="project-grid"></div>
    </section>
    <section class="about section-pad" id="about"><div class="about-label"><p class="eyebrow">02 / ABOUT</p><img class="portrait" src="${siteUrl('/images/c02-1.webp')}" alt="张涛手持相机的黑白肖像" loading="lazy"><p class="portrait-caption">ZHANG TAO / STAGE VISUAL DESIGN</p><a class="resume-link" href="${siteUrl('/files/resume.pdf')}" download="zhang-tao-resume.pdf">简历与项目索引 <span>PDF ↗</span></a></div><div class="about-content"><h2>张涛 <span>Zhang Tao</span></h2><p class="about-intro">舞台视觉设计。</p><p class="education">中央戏剧学院 <span>舞台美术系</span></p><p class="about-description">从舞台模型与灯光预演，到现场编程与还原。作品涵盖剧场、文旅街区、光影秀与空间灯光装置。</p><div class="recognition"><div><span>模型收藏</span><p>《特洛伊人》剧目微缩模型<br>国家大剧院舞美博物馆</p></div><div><span>模型展出</span><p>《星海之汐》晚会设计模型<br>大同东南邑美术馆</p></div></div><dl class="practice-list"><div><dt>01</dt><dd>舞美与三维预演<span>Stage & Previsualization</span></dd></div><div><dt>02</dt><dd>灯光设计与编程<span>Lighting & Programming</span></dd></div><div><dt>03</dt><dd>现场视觉呈现<span>Live Performance</span></dd></div></dl><div class="tools"><span class="eyebrow">制作工具</span><p>Blender · Unreal Engine 5 · Depence<br>After Effects · Photoshop · CAD</p></div></div></section>
    <section class="experience section-pad"><details><summary><span class="eyebrow">EXPERIENCE</span><span>其他项目经历</span><span class="expand-icon" aria-hidden="true">＋</span></summary><div class="experience-list">${[['新疆喜宴婚礼堂', '灯光设计'], ['温都水城 · 水岸艺术区', '街区灯光设计'], ['宁波十里红妆博物馆', '场馆灯光'], ['中央戏剧学院校园歌手大赛', '舞台灯光设计'], ['图兰朵 / 尼伯龙根的指环', '2021 年度院级重点项目 · 剧目还原'], ['大戏东望开幕式', '灯光操作'], ['西便门古城墙改造项目', '灯光设计'], ['三姊妹', '话剧预演'], ['2024 北京国际车展', '大众汽车展区 AI 交互区']].map(([title, role]) => `<div><h3>${title}</h3><span>${role}</span></div>`).join('')}</div></details></section>
    <section class="contact section-pad" id="contact"><p class="eyebrow">03 / CONTACT</p><div class="contact-heading"><h2>联系张涛 <span>Let’s talk.</span></h2><p>舞台视觉 / 灯光设计 / 预演</p></div><div class="contact-list"><a href="mailto:tao_0706@foxmail.com"><span>邮箱 / EMAIL</span><strong>tao_0706@foxmail.com</strong>${icon}</a><a href="tel:+8615091261041"><span>电话 / PHONE</span><strong>150 9126 1041</strong>${icon}</a><button id="copy-wechat" type="button"><span>微信 / WECHAT</span><strong>zt15091261041</strong><span class="copy-label">复制 ↗</span></button></div><p class="copy-status" role="status" aria-live="polite"></p></section>`;
  renderGrid();
  document.querySelector('#copy-wechat').addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try { await navigator.clipboard.writeText('zt15091261041'); status.textContent = '微信号已复制。'; }
    catch { status.textContent = '请手动复制微信号：zt15091261041'; }
  });
}

function renderGrid() {
  const visible = projects.filter(p => filter === 'all' || p.category === filter);
  const grid = document.querySelector('#project-grid');
  grid.classList.toggle('list-view', view === 'list');
  grid.innerHTML = visible.map(p => `<a class="project-card" href="${siteUrl(`/work/${p.id}`)}"><div class="project-image"><img src="${siteUrl(p.cover)}" alt="${p.title} — ${p.type}" loading="lazy"><span class="image-open" aria-hidden="true">↗</span></div><div class="project-info"><div class="project-meta"><span class="project-number">${numberOf(p)}</span><span class="project-category">${p.label}</span></div><h3>${p.title}</h3><p>${p.en}</p><span class="card-action">查看项目 ${icon}</span></div></a>`).join('');
  document.querySelector('#project-count').textContent = `${String(visible.length).padStart(2, '0')} / ${projects.length} 个项目`;
}

function chooseFilter(category) {
  filter = category;
  if (!document.querySelector('#project-grid')) { history.pushState({}, '', siteUrl('/#work')); route(); }
  else renderGrid();
  document.querySelectorAll('[data-filter], [data-quick-filter]').forEach(b => {
    const selected = (b.dataset.filter || b.dataset.quickFilter) === filter;
    b.setAttribute('aria-pressed', selected);
    b.classList.toggle('active', selected);
  });
}

function detail(p) {
  document.title = `${p.title} — ZHANG TAO`;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const previous = projects[(projects.indexOf(p) + projects.length - 1) % projects.length];
  app.innerHTML = `<article class="project-detail section-pad"><div class="detail-toolbar"><a class="back-link" href="${siteUrl('/#work')}">← 作品索引</a><label class="project-switch">切换项目<select id="project-selector" aria-label="切换项目">${projects.map(x => `<option value="${siteUrl(`/work/${x.id}`)}" ${x === p ? 'selected' : ''}>${numberOf(x)} / ${x.title}</option>`).join('')}</select></label></div><div class="detail-heading"><div><p class="eyebrow">${p.label} / ${p.en.toUpperCase()}</p><h1>${p.title}</h1></div><span class="detail-number">${numberOf(p)}<small> / ${projects.length}</small></span></div><div class="detail-workbench"><div class="detail-visual"><button class="cover-open" type="button" data-image="${p.cover}" data-caption="${p.title} · 主图" aria-label="放大${p.title}主图"><img class="detail-cover" src="${siteUrl(p.cover)}" alt="${p.title}项目主视觉">${icon}</button><span class="cover-note">主图 / 点击放大</span></div><div class="detail-summary"><h2>${p.type}</h2>${p.description ? `<p class="detail-description">${p.description}</p>` : ''}<dl>${p.role ? `<div><dt>工作内容</dt><dd>${p.role}</dd></div>` : ''}${p.tools ? `<div><dt>制作工具</dt><dd>${p.tools}</dd></div>` : ''}<div><dt>图像来源</dt><dd>${p.source}</dd></div></dl><a class="gallery-jump" href="#gallery">浏览图像 <span>${String(p.images.length).padStart(2, '0')} ↓</span></a></div></div><div class="gallery-title" id="gallery"><div><span class="eyebrow">PROJECT GALLERY</span><h2>图像档案 <small>${p.images.length} 张</small></h2></div><span>点击缩略图放大</span></div><div class="detail-gallery">${p.images.map((src, i) => `<button class="gallery-image" type="button" data-image="${src}" data-caption="${p.title} · ${p.caption ? p.caption(i) : '图'} ${i + 1}" aria-label="放大${p.title}图${i + 1}"><img src="${siteUrl(src)}" alt="${p.title} · ${p.caption ? p.caption(i) : '图'} ${i + 1}" loading="lazy"><span><span>${String(i + 1).padStart(2, '0')} / ${p.caption ? p.caption(i) : p.label}</span><span aria-hidden="true">＋</span></span></button>`).join('')}</div><div class="project-pagination"><a href="${siteUrl(`/work/${previous.id}`)}"><small>← 上一个项目</small><span>${previous.title}</span></a><a class="next-project" href="${siteUrl(`/work/${next.id}`)}"><small>下一个项目 →</small><span>${next.title}</span></a></div></article>`;
  document.querySelectorAll('[data-image]').forEach(el => el.addEventListener('click', () => openLightbox(el.dataset.image, el.dataset.caption)));
  document.querySelector('#project-selector').addEventListener('change', e => { history.pushState({}, '', e.target.value); route(); window.scrollTo(0, 0); });
}

function openLightbox(src, caption) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = `<div class="lightbox-bar"><span>${caption}</span><button type="button" aria-label="关闭图片">关闭 ×</button></div><img src="${siteUrl(src)}" alt="${caption}">`;
  document.body.append(dialog); dialog.showModal(); document.body.classList.add('modal-open');
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialog.remove(); });
}

function observeSections(project) {
  sectionObserver?.disconnect();
  for (const a of document.querySelectorAll('[data-section], .site-header nav a')) {
    const active = project && (a.dataset.section === 'work' || a.hash === '#work');
    a.classList.toggle('is-active', Boolean(active));
    if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  }
  if (project) return;
  sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const a of document.querySelectorAll('[data-section], .site-header nav a')) {
        const active = a.dataset.section === entry.target.id || a.hash === '#' + entry.target.id;
        a.classList.toggle('is-active', active);
        if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('#work, #about, #contact').forEach(el => sectionObserver.observe(el));
}

function route() {
  const path = ('/' + location.pathname.slice(base.length)).replace(/\/$/, '');
  const project = projects.find(p => path === `/work/${p.id}`);
  renderRail(project);
  if (project) detail(project);
  else if (path === '' || path === '/work' || path === '/about') {
    home();
    if (path === '/work' || path === '/about') requestAnimationFrame(() => document.getElementById(path.slice(1)).scrollIntoView());
  } else app.innerHTML = `<section class="not-found section-pad"><p class="eyebrow">404</p><h1>页面未找到。</h1><a href="${base}">返回作品集 ↗</a></section>`;
  observeSections(project);
}

function jumpTo(hash) {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  el?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

document.addEventListener('click', e => {
  const categoryButton = e.target.closest('[data-filter], [data-quick-filter]');
  if (categoryButton) { chooseFilter(categoryButton.dataset.filter || categoryButton.dataset.quickFilter); if (categoryButton.hasAttribute('data-quick-filter')) jumpTo('#work'); return; }
  const viewButton = e.target.closest('[data-view]');
  if (viewButton) { view = viewButton.dataset.view; document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === view)); renderGrid(); return; }
  const a = e.target.closest('a');
  if (!a || a.hasAttribute('download') || a.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button > 0 || a.origin !== location.origin) return;
  if (a.id === 'back-top') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const url = new URL(a.href); e.preventDefault();
  if (url.pathname !== location.pathname || !url.hash) { history.pushState({}, '', url.pathname + url.hash); route(); window.scrollTo(0, 0); }
  if (url.hash) { history.replaceState({}, '', url.pathname + url.hash); jumpTo(url.hash); }
});
window.addEventListener('popstate', () => { route(); if (location.hash) jumpTo(location.hash); else window.scrollTo(0, 0); });
route(); if (location.hash) requestAnimationFrame(() => jumpTo(location.hash));
