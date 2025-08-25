// Set the backend API URL
const API = 'http://localhost:5000/api'; // Uncomment this for local testing

//const API = 'https://fintech-dashboard-2ifo.onrender.com/api'; // Production backend

// Handle form submission for login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form behavior

  const eMail = document.getElementById('email').value; // 💡 Ensure input has id="email"
  const password = document.getElementById('password').value; // 💡 Ensure input has id="password"

  const email = eMail.toLowerCase();
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) // ✅ Send as { email, password }
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successfully');
      window.location.href = 'dashboard.html'; // Redirect to dashboard page
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login Error:', err);
    alert('An error occurred. Please try again.');
  }
});

//Singup function
function signup() {
  try {
    window.location.href = 'signup.html'; 
  } catch (err) {
    console.error("Signup page missing:", err);
    alert("Signup page not found. Please check your project files.");
  }
}



/* 
//Handle signup function
async function signup() {
  const name = document.getElementById("name").value;
  const eMail = document.getElementById('email').value;
  const password = document.getElementById("password").value;

  let res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  alert(await res.text());

  if (res.ok) {
      alert('Registration successfully');
      window.location.href = 'index.html'; // Redirect to dashboard page
    } else {
      alert(data.message || 'Registration failed');
    }
};

*/



