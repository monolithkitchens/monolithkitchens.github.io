/* MONOLITH by OYA — landing interactions */
(function(){
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  /* mobile drawer */
  const burger = document.querySelector('.burger');
  const drawer = document.querySelector('.drawer');
  if(burger && drawer){
    const toggle = (open) => {
      burger.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!drawer.classList.contains('open')));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  }

  /* scroll reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ensure hero video plays */
  const v = document.querySelector('.hero-video');
  if(v){ v.play().catch(()=>{}); }

  /* floating contact bar: reveal after slight scroll */
  const floatbar = document.querySelector('.floatbar');
  if(floatbar){
    const showBar = () => floatbar.classList.toggle('show', window.scrollY > 120);
    showBar();
    window.addEventListener('scroll', showBar, {passive:true});
  }

  /* ---- lead popup ---- */
  const modal = document.getElementById('lead-modal');
  const openModal = () => {
    if(!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    const f = modal.querySelector('input[name="name"]');
    setTimeout(()=>{ f && f.focus(); }, 250);
  };
  const closeModal = () => {
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-open-modal]').forEach(b => b.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

  /* ---- Web3Forms AJAX submit (all .w3form) ---- */
  document.querySelectorAll('form.w3form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const original = btn ? btn.textContent : '';
      if(btn){ btn.textContent = 'שולח...'; btn.disabled = true; }
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        const data = await res.json();
        if(data.success){
          const success = form.parentElement.querySelector('.form-success');
          form.setAttribute('hidden','');
          if(success) success.removeAttribute('hidden');
        } else {
          throw new Error(data.message || 'error');
        }
      } catch(err){
        if(btn){ btn.textContent = original; btn.disabled = false; }
        alert('אירעה שגיאה בשליחה. אפשר גם להתקשר: 050-516-5278');
      }
    });
  });
})();
