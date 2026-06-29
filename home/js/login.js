const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const viewLogin = document.getElementById('viewLogin');
    const viewRegister = document.getElementById('viewRegister');

    function setTab(mode){
      const isLogin = mode === 'login';
      tabLogin.classList.toggle('active', isLogin);
      tabRegister.classList.toggle('active', !isLogin);
      tabLogin.setAttribute('aria-selected', String(isLogin));
      tabRegister.setAttribute('aria-selected', String(!isLogin));

      viewLogin.style.display = isLogin ? 'block' : 'none';
      viewRegister.style.display = isLogin ? 'none' : 'block';
    }

    tabLogin.addEventListener('click', () => setTab('login'));
    tabRegister.addEventListener('click', () => setTab('register'));
    document.getElementById('goRegister').addEventListener('click', (e) => { e.preventDefault(); setTab('register'); });
    document.getElementById('goLogin').addEventListener('click', (e) => { e.preventDefault(); setTab('login'); });

    // Demo redirect: saat tombol Login di-submit, langsung menuju home.html
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const msg = document.getElementById('loginMsg');
      msg.className = 'message show ok';
      msg.textContent = 'Login berhasil (demo). Mengalihkan ke Home...';

      setTimeout(() => {
        window.location.href = 'home.html';
      }, 400);
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
      // Demo UI: alihkan ke form login (tanpa backend)
      e.preventDefault();

      const msg = document.getElementById('registerMsg');
      msg.className = 'message show ok';
      msg.textContent = 'Registrasi berhasil (demo). Silakan login...';

      // setelah pesan tampil, pindahkan tab ke Login
      setTimeout(() => {
        setTab('login');
        const loginMsg = document.getElementById('loginMsg');
        loginMsg.className = 'message show ok';
        loginMsg.textContent = 'Silakan masukkan email & password untuk login.';
        // optional: scroll ke atas form login
        document.getElementById('viewLogin').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    });