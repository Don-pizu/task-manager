//const API = 'http://localhost:5000/api'; // for testing

const API = 'https://task-manager-qzog.onrender.com/api';   //for deployment

// Handle form submission for task
document.getElementById('dashboardForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form behavior

  const title = document.getElementById('title').value; // 💡 Ensure input has id="title"
  const content = document.getElementById('content').value; // 💡 Ensure input has id="content"
  const priority = document.getElementById('priority').value;

  
  try {
    const res = await fetch(`${API}/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, priority }) 
    });

    const data = await res.json();

    if (res.ok) {
      alert('Task successfully created');
      window.location.href = 'dashboard.html'; // Redirect to dashboard page
    } else {
      alert(data.message || 'Task failed to be created');
    }
  } catch (err) {
    console.error('Login Error:', err);
    alert('An error occurred. Please try again.');
  }
});


// Logout helper 
function logout() { 
  window.location.href = 'index.html'; 
} 

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});



//Handle task list

async function loadTasks() {
  const taskList = document.getElementById('taskList');

  try {
    const res = await fetch (`${API}/tasks`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
       
       taskList.innerHTML = ''; // clear existing

        data.forEach(task => {
          const li = document.createElement('li');

           // Title
        const titleEl = document.createElement('strong');
        titleEl.textContent = `Title: ${task.title}`;
        li.appendChild(titleEl);
        li.appendChild(document.createElement('br'));

        // Content
        li.appendChild(document.createTextNode(`Content: ${task.content}`));
        li.appendChild(document.createElement('br'));

        // Priority
        const priorityEl = document.createElement('span');
        priorityEl.className = task.priority.toLowerCase();
        priorityEl.textContent = `Priority: ${task.priority}`;
        li.appendChild(priorityEl);
        li.appendChild(document.createElement('br'));

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(task.id));
        li.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        li.appendChild(deleteBtn);

          taskList.appendChild(li);
        });

      } else {
        alert(data.message || 'Failed to load tasks');
      }
  } catch (err) {
    console.error('Error during registration:', err);
      alert('An error occurred. Please try again.');
  }
};


//Handle Edit/Update
async function editTask(id) {
  const newTitle = prompt('Enter new title:');
  const newContent = prompt('Enter new content:');
  const newPriority = prompt('Enter new priority (Low, Medium, High):');

  /* if (!newTitle || !newContent || !newPriority) {       /// to maake user update all the fields 
    alert("All fields are required for updating task");
    return;
  }

  */

  let normalizedPriority = newPriority.trim().toLowerCase();

  if(!['low', 'medium', 'high'].includes(normalizedPriority)) {
    alert('Invalid priority! Please enter Low, Medium or High');
    return;
  }

  // Capitalize again for saving
  const capitalizedPriority = normalizedPriority.charAt(0).toUpperCase() + normalizedPriority.slice(1);

  try {
    const res = await fetch(`${API}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent, priority: capitalizedPriority })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Task updated');
      loadTasks();
    } else {
      alert(data.message || 'Failed to update task');
    }
  } catch (err) {
    console.error('Error updating task:', err);
  }
}

// Delete task
async function deleteTask(id) {
  id = Number(id);
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const res = await fetch(`${API}/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      loadTasks();
    } else {
      alert(data.message || 'Failed to delete task');
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}


// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);