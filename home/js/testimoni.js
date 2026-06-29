    document.getElementById('year').textContent = new Date().getFullYear();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#testimonialGrid .card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          const show = filter === 'all' || cat === filter;
          card.style.display = show ? 'block' : 'none';
        });
      });
    });

    const form = document.getElementById('testimonialForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const category = document.getElementById('category').value;
      const message = document.getElementById('message').value.trim();

      const avatarText = (name[0] || 'U').toUpperCase();
      const date = new Date();
      const dateStr = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

      const card = document.createElement('article');
      card.className = 'card';
      card.setAttribute('data-category', category);

      card.innerHTML = `
        <div class="top">
          <div class="avatar">${avatarText}</div>
          <div style="text-align:left; flex:1;">
            <div class="name">${escapeHtml(name)}</div>
            <div class="date">${escapeHtml(dateStr)}</div>
          </div>
          <div class="stars" aria-label="5 bintang">★★★★★</div>
        </div>
        <p class="review">${escapeHtml(message)}</p>
        <span class="product-tag">${categoryLabel(category)}</span>
      `;

      document.getElementById('testimonialGrid').prepend(card);
      form.reset();

      const active = document.querySelector('.filter-btn.active');
      if (active) active.click();
    });

    function categoryLabel(cat){
      if(cat === 'sepatu') return 'Sepatu';
      if(cat === 'tas') return 'Tas';
      if(cat === 'pakaian') return 'Pakaian';
      if(cat === 'topi') return 'Topi';
      if(cat === 'jam') return 'Jam Tangan';
      if(cat === 'sabuk') return 'Sabuk';
      return 'Kacamata';
    }

    function escapeHtml(str){
      return String(str)
        .replaceAll('&','&amp;')
        .replaceAll('<','&lt;')
        .replaceAll('>','&gt;')
        .replaceAll('"','&quot;')
        .replaceAll("'",'&#039;');
    }
    const menuIcon = document.querySelector('#menu-icon');
    const navMenu = document.querySelector('.navbar-links'); // Pastikan ini sesuai CSS
    
    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });