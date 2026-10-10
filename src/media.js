import manifest from './image-manifest.json';

const base = import.meta.env.BASE_URL;
const siteUrl = path => base + path.replace(/^\//, '');
const paths = {
  arrow: '<path d="M6 18 18 6M6 6h12v12"/>',
  right: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  left: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  up: '<path d="M12 20V4m-6 6 6-6 6 6"/>',
  grid: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
  list: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="1"/><path d="M15 8V4H4v11h4"/>',
};

export function svgIcon(name = 'arrow') {
  return `<span class="ui-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" focusable="false">${paths[name]}</svg></span>`;
}

const escapeAttribute = text => String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function imageTag(src, alt, { sizes = '240px', className = '', eager = false, priority = false } = {}) {
  const data = manifest[src];
  const variants = data?.variants || [];
  const fallback = variants.find(v => v.width === 480) || variants[0];
  const responsive = data ? ` width="${data.width}" height="${data.height}" srcset="${variants.map(v => `${siteUrl(v.path)} ${v.width}w`).join(', ')}" sizes="${escapeAttribute(sizes)}"` : '';
  return `<img class="${className}" src="${siteUrl(fallback?.path || src)}"${responsive} alt="${escapeAttribute(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${priority ? ' fetchpriority="high"' : ''}>`;
}

function statusElement() {
  let status = document.querySelector('.image-status');
  if (!status) {
    status = document.createElement('div');
    status.className = 'image-status';
    status.setAttribute('role', 'status');
    status.innerHTML = '<span>部分图片暂未载入</span><button type="button">重新加载</button>';
    status.querySelector('button').addEventListener('click', retryFailedImages);
    document.body.append(status);
  }
  return status;
}

function updateStatus() {
  const failed = document.querySelectorAll('img[data-failed="true"]').length;
  const status = document.querySelector('.image-status');
  if (failed) statusElement().hidden = false;
  else if (status) status.hidden = true;
}

function retryImage(img) {
  if (!img.isConnected) return;
  const url = new URL(img.currentSrc || img.src);
  url.searchParams.set('retry', String(Date.now()));
  img.removeAttribute('srcset');
  img.dataset.failed = 'false';
  img.src = url.href;
  updateStatus();
}

function retryFailedImages() {
  document.querySelectorAll('img[data-failed="true"]').forEach(img => {
    img.dataset.retryCount = '0';
    retryImage(img);
  });
}

export function setupImageRecovery() {
  document.addEventListener('load', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    img.dataset.failed = 'false';
    updateStatus();
  }, true);
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || !img.isConnected) return;
    const attempts = Number(img.dataset.retryCount || 0);
    if (attempts < 2) {
      img.dataset.retryCount = String(attempts + 1);
      setTimeout(() => retryImage(img), attempts ? 1500 : 500);
    } else {
      img.dataset.failed = 'true';
      updateStatus();
    }
  }, true);
  window.addEventListener('online', retryFailedImages);
  new MutationObserver(updateStatus).observe(document.querySelector('#app'), { childList: true, subtree: true });
}
