// Set the backend API URL
const API = 'http://localhost:5000/api'; // Uncomment this for local testing

//const API = 'https://fintech-dashboard-2ifo.onrender.com/api'; // Production backend

// Handle form submission for signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form behavior

  const Name = document.getElementById('name').value; // 💡 Ensure input has id="name"
  const eMail = document.getElementById('email').value;
  const password = document.getElementById('password').value; // 💡 Ensure input has id="password"
  const name = Name.toLowerCase();
  const email = eMail.toLowerCase();

  try {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }) 
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registered successfully');
      window.location.href = 'index.html'; // Redirect to login page
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Error during registration:', err);
    alert('An error occurred. Please try again.');
  }
});
