import { projects } from './projects.js';
const base = import.meta.env.BASE_URL;
const siteUrl = path => base + path.replace(/^\//, '');
const app = document.querySelector('#app');
document.querySelectorAll('.site-header a[href^="/"], .site-footer a[href^="/"]').forEach(a => a.setAttribute('href', siteUrl(a.getAttribute('href'))));
let filter = 'all';
const icon = '<span aria-hidden="true">↗</span>';
const home = () => {
  document.title = 'ZHANG TAO — Selected Works';
  app.innerHTML = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-topline"><span><i class="status-dot"></i> 张涛 · 作品选集</span><span>PORTFOLIO — VOL. 01</span></div>
      <div class="hero-main"><div class="hero-copy"><p class="eyebrow">STAGE / LIGHTING / PREVISUALIZATION</p><h1 id="hero-title">Light.<br>Space.<br><span class="italic">Story.</span></h1><div class="hero-bottom"><p>舞台、灯光与空间。<br>从设计图到现场。</p><a class="circle-link" href="#work" aria-label="浏览作品">↓</a></div></div><a class="hero-image" href="${siteUrl('/work/poetry-in-light')}"><img src="${siteUrl('/images/a09-2.webp')}" alt="温都水城光影织诗灯光秀，蓝色光束在夜空中展开" fetchpriority="high"><span class="image-index">01 / FEATURED WORK</span><div class="image-caption"><div><span>光影织诗</span><small>温都水城 · 灯光设计与预演</small></div>${icon}</div></a></div>
      <div class="hero-rule"><span>让作品先说话。</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
    <section class="works section-pad" id="work" aria-labelledby="work-title"><div class="section-heading"><div><p class="eyebrow">01 — SELECTED WORKS</p><h2 id="work-title">作品<span class="heading-serif">Selected works.</span></h2></div><p class="section-note">舞美预演 / 灯光设计 / 剧场作品<br><span>设计过程与现场记录</span></p></div>
    <div class="filter-bar" role="group" aria-label="作品分类">${[['all','全部作品'],['lighting','灯光与现场'],['previsualization','设计与预演'],['theatre','剧场作品']].map(([id,name])=>`<button class="filter ${id===filter?'active':''}" data-filter="${id}" aria-pressed="${id===filter}">${name}<span>${id==='all'?projects.length:projects.filter(p=>p.category===id).length.toString().padStart(2,'0')}</span></button>`).join('')}<span class="filter-note">PROJECT INDEX</span></div><div class="project-grid" id="project-grid"></div><p class="collection-note">图像选自张涛个人作品集 · 点击项目查看原图与说明</p></section>
    <section class="about section-pad" id="about"><div class="about-label"><p class="eyebrow">02 — ABOUT</p><img class="portrait" src="${siteUrl('/images/c02-1.webp')}" alt="张涛手持相机的黑白肖像" loading="lazy"><p class="portrait-caption">ZHANG TAO / STAGE VISUAL DESIGN</p><a class="resume-link" href="${siteUrl('/files/resume.pdf')}" download="zhang-tao-resume.pdf">简历与项目索引 <span>PDF ↗</span></a></div><div class="about-content"><h2>张涛<span>Zhang Tao</span></h2><p class="about-intro">舞台视觉设计。</p><p class="education">中央戏剧学院 <span>舞台美术系</span></p><p class="about-description">从舞台模型与灯光预演，到现场编程与还原。作品涵盖剧场、文旅街区、光影秀与空间灯光装置。</p><div class="recognition"><div><span>模型收藏</span><p>《特洛伊人》剧目微缩模型<br>国家大剧院舞美博物馆</p></div><div><span>模型展出</span><p>《星海之汐》晚会设计模型<br>大同东南邑美术馆</p></div></div><dl class="practice-list"><div><dt>01</dt><dd>舞美与三维预演<span>Stage & Previsualization</span></dd></div><div><dt>02</dt><dd>灯光设计与编程<span>Lighting & Programming</span></dd></div><div><dt>03</dt><dd>现场视觉呈现<span>Live Performance</span></dd></div></dl><div class="tools"><span class="eyebrow">工具 / TOOLS</span><p>Blender · Unreal Engine 5 · Depence<br>After Effects · Photoshop · CAD</p></div></div></section>
    <section class="experience section-pad"><details><summary><span class="eyebrow">03 — EXPERIENCE</span><span>其他项目经历</span><span class="expand-icon" aria-hidden="true">＋</span></summary><div class="experience-list">${[
      ['新疆喜宴婚礼堂','灯光设计'],['温都水城 · 水岸艺术区','街区灯光设计'],['宁波十里红妆博物馆','场馆灯光'],['中央戏剧学院校园歌手大赛','舞台灯光设计'],['图兰朵 / 尼伯龙根的指环','2021 年度院级重点项目 · 剧目还原'],['大戏东望开幕式','灯光操作'],['西便门古城墙改造项目','灯光设计'],['三姊妹','话剧预演'],['2024 北京国际车展','大众汽车展区 AI 交互区'],
    ].map(([title,role])=>`<div><h3>${title}</h3><span>${role}</span></div>`).join('')}</div></details></section>
    <section class="contact section-pad" id="contact"><p class="eyebrow">04 — CONTACT</p><div class="contact-heading"><h2>一起，做下一场。<span class="heading-serif">Let’s talk.</span></h2><p>舞台视觉 / 灯光设计 / 预演</p></div><div class="contact-list"><a href="mailto:tao_0706@foxmail.com"><span>邮箱 / EMAIL</span><strong>tao_0706@foxmail.com</strong><span aria-hidden="true">↗</span></a><a href="tel:+8615091261041"><span>电话 / PHONE</span><strong>150 9126 1041</strong><span aria-hidden="true">↗</span></a><button id="copy-wechat" type="button"><span>微信 / WECHAT</span><strong>zt15091261041</strong><span class="copy-label">复制 ↗</span></button></div><p class="copy-status" role="status" aria-live="polite"></p></section>`;
  renderGrid();
  document.querySelector('#copy-wechat').addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('zt15091261041');
      status.textContent = '微信号已复制。';
    } catch {
      status.textContent = '请手动复制微信号：zt15091261041';
    }
  });
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x.dataset.filter===filter);x.setAttribute('aria-pressed',x.dataset.filter===filter)});renderGrid()}));
};
function renderGrid(){
 const visible=projects.filter(p=>filter==='all'||p.category===filter);
 document.querySelector('#project-grid').innerHTML=visible.map(p=>`<a class="project-card" href="${siteUrl(`/work/${p.id}`)}"><div class="project-image"><img src="${siteUrl(p.cover)}" alt="${p.title} — ${p.type}" loading="lazy"><span class="view-project">查看项目 ${icon}</span></div><div class="project-info"><span class="project-number">${String(projects.indexOf(p)+1).padStart(2,'0')}</span><div><h3>${p.title}</h3><p>${p.en}</p></div><span class="project-category">${p.label}</span><span class="card-arrow" aria-hidden="true">↗</span></div></a>`).join('');
}
function detail(p){
 document.title=`${p.title} — ZHANG TAO`;
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 app.innerHTML=`<article class="project-detail section-pad"><a class="back-link" href="${siteUrl('/#work')}">← 返回作品</a><div class="detail-heading"><div><p class="eyebrow">${p.label} / ${p.en.toUpperCase()}</p><h1>${p.title}</h1></div><span class="detail-number">${String(projects.indexOf(p)+1).padStart(2,'0')}</span></div><img class="detail-cover" src="${siteUrl(p.cover)}" alt="${p.title}项目主视觉"><div class="detail-summary"><h2>${p.type}</h2><div>${p.description?`<p class="detail-description">${p.description}</p>`:''}<dl>${p.role?`<div><dt>工作内容</dt><dd>${p.role}</dd></div>`:''}${p.tools?`<div><dt>制作工具</dt><dd>${p.tools}</dd></div>`:''}<div><dt>图像来源</dt><dd>${p.source}</dd></div></dl></div></div><div class="gallery-title"><span class="eyebrow">PROJECT GALLERY</span><span>点击图像放大 ↗</span></div><div class="detail-gallery">${p.images.map((src,i)=>`<button class="gallery-image" data-image="${src}" data-caption="${p.title} · ${p.caption ? p.caption(i) : '图'} ${i+1}" aria-label="放大${p.title}图${i+1}"><img src="${siteUrl(src)}" alt="${p.title} · ${p.caption ? p.caption(i) : '图'} ${i+1}" loading="lazy"><span>${String(i+1).padStart(2,'0')} ↗</span></button>`).join('')}</div><a class="next-project" href="${siteUrl(`/work/${next.id}`)}"><span class="eyebrow">NEXT PROJECT</span><span>${next.title}</span>${icon}</a></article>`;
 document.querySelectorAll('[data-image]').forEach(el=>el.addEventListener('click',()=>openLightbox(el.dataset.image,el.dataset.caption)));
}
function openLightbox(src,caption){
 const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.innerHTML=`<div class="lightbox-bar"><span>${caption}</span><button aria-label="关闭图片">关闭 ×</button></div><img src="${siteUrl(src)}" alt="${caption}">`;
 document.body.append(dialog);dialog.showModal();document.body.classList.add('modal-open');
 const close=()=>dialog.close();dialog.querySelector('button').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close()});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');dialog.remove()});
}
function route(){
 const path=('/'+location.pathname.slice(base.length)).replace(/\/$/,'');const p=projects.find(x=>path===`/work/${x.id}`);
 if(p)detail(p);else if(path===''||path==='/work'||path==='/about'){home();if(path==='/work'||path==='/about')requestAnimationFrame(()=>document.querySelector(path==='/work'?'#work':'#about').scrollIntoView())}else{app.innerHTML=`<section class="not-found section-pad"><p class="eyebrow">404</p><h1>页面未找到。</h1><a href="${base}">返回作品集 ↗</a></section>`}
 document.querySelectorAll('.site-header nav a').forEach(a=>a.classList.toggle('current',p&&a.hash==='#work'));
}
document.addEventListener('click',e=>{
 const a=e.target.closest('a');if(!a||a.hasAttribute('download')||a.target==='_blank'||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button>0||a.origin!==location.origin)return;
 if(a.id==='back-top'){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});return;}
 const url=new URL(a.href);e.preventDefault();
 if(url.pathname!==location.pathname){history.pushState({},'',url.pathname+url.hash);route();window.scrollTo(0,0)}else if(!url.hash){history.pushState({},'',url.pathname);route();window.scrollTo(0,0)}
 if(url.hash){history.replaceState({},'',url.pathname+url.hash);document.querySelector(url.hash)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
});
window.addEventListener('popstate',()=>{route();if(location.hash)document.querySelector(location.hash)?.scrollIntoView();else window.scrollTo(0,0)});
route();if(location.hash)requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView());
