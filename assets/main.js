(function(){
  // Mobile menu
  var burger=document.getElementById('burger'),links=document.getElementById('navLinks'),use=burger.querySelector('use');
  function setMenu(open){
    links.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
    burger.setAttribute('aria-label',open?'Close menu':'Open menu');
    use.setAttribute('href',open?'#i-close':'#i-menu');
  }
  burger.addEventListener('click',function(){setMenu(!links.classList.contains('open'));});
  links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&links.classList.contains('open')){setMenu(false);burger.focus();}
  });
  document.addEventListener('click',function(e){
    if(links.classList.contains('open')&&!e.target.closest('.nav-inner'))setMenu(false);
  });

  // Waitlist: posts to data-endpoint when one is configured; never pretends to save otherwise
  var form=document.getElementById('waitlistForm'),email=document.getElementById('waitlistEmail'),msg=document.getElementById('formMsg'),btn=form.querySelector('button');
  function say(text,kind){msg.textContent=text;msg.className='form-msg '+kind;}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var v=email.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){
      say('That email address doesn’t look right. Could you check it?','err');
      email.setAttribute('aria-invalid','true');email.focus();return;
    }
    email.removeAttribute('aria-invalid');
    var endpoint=form.getAttribute('data-endpoint');
    if(!endpoint){
      say('Thanks! Sign-ups open very soon. Please check back shortly.','info');
      return;
    }
    btn.disabled=true;say('Adding you to the list…','info');
    fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email:v,source:'tamish-website',_subject:'New Tamish waitlist sign-up',_gotcha:document.getElementById('waitlistTrap').value})})
      .then(function(r){
        if(!r.ok)throw new Error(r.status);
        say('You’re on the list. We’ll email you the day Tamish launches.','ok');form.reset();
      })
      .catch(function(){say('Sorry, something went wrong. Please try again in a moment.','err');})
      .then(function(){btn.disabled=false;});
  });

  // Scroll reveal
  var els=document.querySelectorAll('.reveal');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){
    els.forEach(function(el){el.classList.add('in');});
  }else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
    },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }
})();
