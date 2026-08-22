const form = document.getElementById('registerForm');
const message = document.getElementById('formMessage');
const toast = document.getElementById('toast');

document.querySelectorAll('.show-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.textContent = show ? 'Ascunde' : 'Arată';
  });
});

function setMessage(text, type='error'){
  message.textContent = text;
  message.className = 'form-message ' + type;
}

function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  if(username.length < 3) return setMessage('Numele de utilizator trebuie să aibă cel puțin 3 caractere.');
  if(!/^\S+@\S+\.\S+$/.test(email)) return setMessage('Introdu o adresă de email validă.');
  if(password.length < 8) return setMessage('Parola trebuie să aibă cel puțin 8 caractere.');
  if(password !== confirm) return setMessage('Parolele nu coincid.');
  if(!terms) return setMessage('Trebuie să accepți termenii pentru a continua.');

  setMessage('Formular valid. Contul este pregătit pentru conectarea la baza de date.', 'success');
  showToast('Înregistrare validată!');
});
