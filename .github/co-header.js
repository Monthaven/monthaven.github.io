// === Force apex + HTTPS, and inject canonical/OG ===
(function () {
  var TARGET_HOST = 'crownandoakcapital.com';

  // Skip in local dev
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;

  // Hard redirect any non-target host or non-HTTPS to the apex HTTPS URL
  if (location.hostname !== TARGET_HOST || location.protocol !== 'https:') {
    var to = 'https://' + TARGET_HOST + location.pathname + location.search + location.hash;
    window.location.replace(to);
    return; // stop running on the wrong host
  }

  // Helpers
  function ensure(sel, make) {
    var el = document.querySelector(sel);
    if (!el) { el = make(); document.head.appendChild(el); }
    return el;
  }
  var pageURL = 'https://' + TARGET_HOST + location.pathname + location.search;

  // Canonical
  ensure('link[rel="canonical"]', function () {
    var l = document.createElement('link');
    l.rel = 'canonical';
    l.href = pageURL;
    return l;
  });

  // Open Graph URL
  ensure('meta[property="og:url"]', function () {
    var m = document.createElement('meta');
    m.setAttribute('property', 'og:url');
    m.setAttribute('content', pageURL);
    return m;
  });
})();
(function(){
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.from((r||document).querySelectorAll(s))}
   var header=$('.header'),toggle=$('.nav-toggle'),overlay=$('.overlay'),ticker=$('.ticker');
  function updateTicker(){ if(!header||!ticker) return; var top=header.offsetHeight; ticker.style.top=top+'px'; document.body.style.paddingTop=(top+ticker.offsetHeight)+'px'; }
  function onScroll(){ if(!header) return; if(window.scrollY>10) header.classList.add('header-scrolled'); else header.classList.remove('header-scrolled'); updateTicker(); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  window.addEventListener('resize',updateTicker);
  if(toggle){ toggle.addEventListener('click',function(){ document.documentElement.classList.toggle('nav-open'); document.body.classList.toggle('nav-open'); }); }
  if(overlay){ overlay.addEventListener('click',function(){ document.documentElement.classList.remove('nav-open'); document.body.classList.remove('nav-open'); }); }

  if(ticker){
    var tickerWrapper=$('.ticker-wrapper',ticker);
    var originalHTML=tickerWrapper?tickerWrapper.innerHTML:'';
    fetch('/data/ticker.json').then(function(res){
      if(!res.ok) throw new Error('bad response');
      return res.json();
    }).then(function(json){
      if(!tickerWrapper||!json||!Array.isArray(json.items)) return;
      tickerWrapper.innerHTML='';
      json.items.concat(json.items).forEach(function(text){
        var span=document.createElement('span');
        span.textContent=text;
        tickerWrapper.appendChild(span);
      });
      updateTicker();
    }).catch(function(){
      if(tickerWrapper) tickerWrapper.innerHTML=originalHTML;
      updateTicker();
    });
  }

  // file:// fallback for links, assets, and logo image
  try{
    var isFile = location.protocol==='file:';
    if(isFile){
      var path=location.pathname.replace(/\\/g,'/');
      var parts=path.split('/').filter(Boolean);
      var atRootIndex=(parts.length>=1 && parts[parts.length-1].toLowerCase()==='index.html' && parts.length===1);
      var inSubIndex=(parts.length>=2 && parts[parts.length-1].toLowerCase()==='index.html' && parts.length===2);
      var prefix = inSubIndex ? '../' : './';

      // Rewrite logo link to root
      var logoLink=$('.logo');
      if(logoLink) logoLink.setAttribute('href', prefix);

      // Rewrite nav links to <slug>/index.html
      $$('.nav-link[data-slug], .cta-btn[data-slug]').forEach(function(a){
        var slug=a.getAttribute('data-slug'); if(!slug) return;
        a.setAttribute('href', prefix + slug + '/index.html');
      });

      // Rewrite shared assets if needed
      $$('link[rel="stylesheet"][href="/co-shared.css"]').forEach(function(l){ l.setAttribute('href', prefix + 'co-shared.css'); });
      $$('script[src="/co-header.js"]').forEach(function(s){ s.setAttribute('src', prefix + 'co-header.js'); });

      // Rewrite logo image to relative
      var logoImg=$('.logo img');
      if(logoImg && logoImg.getAttribute('src') && logoImg.getAttribute('src').indexOf('/images/')===0){
        logoImg.setAttribute('src', prefix + 'images/Logo.png');
      }
    }
  }catch(e){}
})();
// === Analytics + JSON-LD (GA only) ===
(function () {
  var TARGET_HOST = 'crownandoakcapital.com';
  var GA_ID = 'G-GEG78J7ZTB'; // <-- replace with your GA4 ID

  if (location.hostname !== TARGET_HOST) return;

  function addScript(src, attrs) {
    var s = document.createElement('script');
    s.src = src; s.async = true;
    if (attrs) Object.keys(attrs).forEach(function(k){ s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
    return s;
  }

  function afterIdle(fn) {
    if ('requestIdleCallback' in window) return requestIdleCallback(fn, { timeout: 3000 });
    var fired = false; var run = function(){ if (!fired){ fired = true; fn(); } };
    setTimeout(run, 2000);
    ['scroll','mousemove','keydown','touchstart'].forEach(function(ev){
      window.addEventListener(ev, run, { once:true, passive:true });
    });
  }

  // Google Analytics 4
  function loadGA() {
    if (!GA_ID) return;
    addScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID));
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  afterIdle(loadGA);

  // JSON-LD
  function addJsonLd(obj) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
  addJsonLd({
    "@context":"https://schema.org",
    "@type":"Organization",
    "name":"Crown & Oak Capital",
    "url":"https://crownandoakcapital.com/",
    "logo":"https://crownandoakcapital.com/images/Logo.png"
  });
  addJsonLd({
    "@context":"https://schema.org",
    "@type":"WebSite",
    "name":"Crown & Oak Capital",
    "url":"https://crownandoakcapital.com/"
  });
})();
