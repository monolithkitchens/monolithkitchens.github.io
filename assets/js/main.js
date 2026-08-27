/* MONOLITH by OYA — landing interactions */
(function(){
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // mobile drawer
  const burger = document.querySelector('.burger');
  const drawer = document.querySelector('.drawer');
  const toggle = (open) => {
    burger.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggle(!drawer.classList.contains('open')));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ensure hero video plays (autoplay muted)
  const v = document.querySelector('.hero-video');
  if(v){ v.play().catch(()=>{}); }

  // form -> friendly confirmation (Web3Forms handles the actual send)
  const form = document.getElementById('lead-form');
  if(form){
    form.addEventListener('submit', function(){
      const btn = form.querySelector('button[type=submit]');
      if(btn){ btn.textContent = 'שולח...'; btn.disabled = true; }
    });
  }
})();
