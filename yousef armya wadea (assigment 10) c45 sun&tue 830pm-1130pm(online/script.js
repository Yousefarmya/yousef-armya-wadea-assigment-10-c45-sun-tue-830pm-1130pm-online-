// Registration logic
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('registerError');
    errorDiv.style.display = 'none';

    if (!name || !email || !password) {
      errorDiv.textContent = 'All fields are required.';
      errorDiv.style.display = 'block';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errorDiv.textContent = 'Invalid email format.';
      errorDiv.style.display = 'block';
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      errorDiv.textContent = 'Email already exists.';
      errorDiv.style.display = 'block';
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', email);
    window.location.href = 'home.html';
  });
}

// Login logic
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.style.display = 'none';
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (!user) {
      errorDiv.textContent = 'Incorrect email or password.';
      errorDiv.style.display = 'block';
      return;
    }
    if (user.password !== password) {
      errorDiv.textContent = 'Wrong password.';
      errorDiv.style.display = 'block';
      return;
    }
    localStorage.setItem('loggedInUser', email);
    window.location.href = 'home.html';
  });
}

// Home page logic
if (document.getElementById('welcomeMsg')) {
  const loggedInEmail = localStorage.getItem('loggedInUser');
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === loggedInEmail);
  if (!loggedInEmail || !user) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('welcomeMsg').textContent = `Welcome, ${user.name}`;
  }
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });
} 