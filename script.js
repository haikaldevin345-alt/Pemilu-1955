  /* ---------- Utility: smooth scroll when clicking nav chips ---------- */
    document.querySelectorAll('.nav-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const t = document.querySelector(chip.dataset.target);
        if (!t) return;
        const top = t.getBoundingClientRect().top + window.scrollY - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        const top = t.getBoundingClientRect().top + window.scrollY - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    /* ---------- Timeline interaction ---------- */
    const timelineButtons = document.querySelectorAll('.timeline button');
    const timelineContent = document.getElementById('timelineContent');
    const timelineMap = {
      t1: '<strong>1945–1954:</strong> Revolusi kemerdekaan, transisi pemerintahan, persiapan administrasi pemilu.',
      t2: '<strong>29 Sep 1955:</strong> Pemilu legislatif untuk DPR — 257 kursi diperebutkan.',
      t3: '<strong>15 Des 1955:</strong> Pemilu Konstituante — 514 anggota terpilih untuk menyusun UUD baru.',
      t4: '<strong>Pasca-1955:</strong> Konstituante gagal mufakat → kebuntuan politik → Dekrit Presiden 5 Juli 1959.'
    };
    timelineButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        timelineButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timelineContent.innerHTML = timelineMap[btn.dataset.id] || '';
      });
    });

    /* ---------- Scroll spy / highlight nav chip ---------- */
    const sections = document.querySelectorAll('main .story');
    const navChips = document.querySelectorAll('.sticky-nav .nav-chip');
    const spyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navChips.forEach(n => n.classList.toggle('active', n.dataset.target === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => spyObserver.observe(s));

    /* ---------- Gallery modal zoom ---------- */
    const modal = document.getElementById('modal');
    const modalImg = modal.querySelector('img');
    document.querySelectorAll('.gallery img').forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.dataset.large || img.src;
        document.body.style.overflow = 'hidden';
      });
    });
    modal.addEventListener('click', () => { modal.style.display = 'none'; document.body.style.overflow = ''; });

    /* ---------- Quiz logic ---------- */
    document.getElementById('checkQuiz').addEventListener('click', () => {
      const qs = document.querySelectorAll('.quiz .q');
      let score = 0;
      qs.forEach((q, i) => {
        const correct = q.dataset.correct;
        const chosen = q.querySelector('input[type=radio]:checked');
        if (chosen && chosen.value === correct) score++;
        // highlight answers
        q.style.background = chosen ? (chosen.value === correct ? 'linear-gradient(90deg,#e6ffef,#f7fff9)' : 'linear-gradient(90deg,#fff6f6,#fff0f0)') : '';
      });
      const res = document.getElementById('quizResult');
      res.textContent = `Skormu: ${score} dari ${qs.length} soal.`;
      res.style.color = score === qs.length ? 'green' : (score > 0 ? 'orange' : 'red');
    });

    /* ---------- Back to top ---------- */
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => {
      backTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ---------- Typewriter small title (visual polish) ---------- */
    (function () {
      const lead = document.querySelector('.leadline');
      if (lead) {
        lead.style.width = '0';
        lead.style.display = 'inline-block';
        lead.style.overflow = 'hidden';
        lead.style.whiteSpace = 'nowrap';
        lead.style.borderRight = '2px solid rgba(0,0,0,0.15)';
        lead.style.animation = 'type 2s steps(40,end)';
        setTimeout(() => lead.style.borderRight = '0', 2100);
      }
    })();

    /* ---------- Accessibility: close modal with Esc ---------- */
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') modal.style.display = 'none';
    });

    /* ---------- Scroll reveal for sections (simple) ---------- */
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)'; entry.target.style.opacity = '1';
        } else {
          entry.target.style.transform = 'translateY(20px)'; entry.target.style.opacity = '0.02';
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-scroll]').forEach(el => {
      el.style.transition = 'all 0.8s ease-out';
      el.style.transform = 'translateY(20px)'; el.style.opacity = '0.02';
      revealObserver.observe(el);
    });

    /* ---------- finishing touch: color theme tweak (optional) ---------- */
    // If you want to change accent colors quickly, edit :root at top of CSS.
