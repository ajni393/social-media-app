const feedList = document.getElementById('feedList');
const themeToggle = document.getElementById('themeToggle');
const searchUsersInput = document.getElementById('searchUsersInput');
const searchResults = document.getElementById('searchResults');
const chatLog = document.getElementById('chatLog');
const messageInput = document.getElementById('messageInput');
const aiMessages = document.getElementById('aiMessages');
const aiInput = document.getElementById('aiInput');

const defaultFeed = [
  {
    user: '@knot_user',
    time: '2 mins ago',
    caption: 'Amazing moments with friends. #Knot',
    accent: 'linear-gradient(135deg, #7c3aed, #ec4899, #06b6d4)',
  },
  {
    user: '@sarah',
    time: '18 mins ago',
    caption: 'Designing the future and making memories. ✨',
    accent: 'linear-gradient(135deg, #2563eb, #06b6d4, #22c55e)',
  },
  {
    user: '@alex',
    time: '1 hour ago',
    caption: 'Coffee, code, and a little creativity. ☕',
    accent: 'linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)',
  }
];

function renderFeed(posts = defaultFeed) {
  feedList.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card">
          <div class="post-header">
            <div class="post-avatar"></div>
            <div class="post-meta">
              <strong>${post.user}</strong>
              <small>${post.time}</small>
            </div>
          </div>
          <div class="post-cover" style="background:${post.accent};"></div>
          <div class="post-actions">❤️ 💬 ↗️ 🔖</div>
          <div class="post-caption">${post.caption}</div>
        </article>
      `
    )
    .join('');
}

function setPage(pageId) {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });

  document.querySelectorAll('.nav-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageId);
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  themeToggle.textContent = dark ? '☀️' : '🌙';
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

function registerUser() {
  const name = document.getElementById('signupName').value.trim();
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!name || !username || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const user = { name, username, email, password };
  localStorage.setItem('knotUser', JSON.stringify(user));
  alert('Account created successfully!');
  closeModal('signupModal');
  document.getElementById('signupForm').reset?.();
}

function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const savedUser = JSON.parse(localStorage.getItem('knotUser') || 'null');

  if (!savedUser) {
    alert('No account found. Please create one first.');
    return;
  }

  if (savedUser.email === email && savedUser.password === password) {
    alert(`Welcome back, ${savedUser.username}!`);
    closeModal('loginModal');
  } else {
    alert('Wrong credentials. Please try again.');
  }
}

function sendMessage() {
  const value = messageInput.value.trim();
  if (!value) return;

  const row = document.createElement('div');
  row.className = 'message-row outgoing';
  row.innerHTML = `<span class="name">You:</span> ${value}`;
  chatLog.appendChild(row);
  messageInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendAIMessage() {
  const value = aiInput.value.trim();
  if (!value) return;

  const userRow = document.createElement('div');
  userRow.className = 'message-row outgoing';
  userRow.innerHTML = `<span class="name">You:</span> ${value}`;
  aiMessages.appendChild(userRow);

  const response = `That’s a great idea. Knot AI is ready to help you build a smarter social experience.`;
  const aiRow = document.createElement('div');
  aiRow.className = 'message-row incoming';
  aiRow.innerHTML = `<span class="name">Knot AI:</span> ${response}`;
  aiMessages.appendChild(aiRow);

  aiInput.value = '';
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function startAudioCall() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => {
      alert('Audio call started.');
    })
    .catch(() => {
      alert('Microphone permission denied.');
    });
}

function startVideoCall() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      const video = document.getElementById('localVideo');
      video.srcObject = stream;
      video.style.display = 'block';
    })
    .catch(() => {
      alert('Camera permission denied.');
    });
}

function publishPost() {
  const caption = document.getElementById('postCaption').value.trim();
  if (!caption) {
    alert('Please write a caption.');
    return;
  }

  const published = {
    user: '@knot_user',
    time: 'just now',
    caption,
    accent: 'linear-gradient(135deg, #06b6d4, #7c3aed, #ec4899)',
  };

  const updatedFeed = [published, ...defaultFeed];
  renderFeed(updatedFeed);
  closeModal('createPostModal');
  document.getElementById('postCaption').value = '';
  setPage('homePage');
}

function handleSearch() {
  const query = searchUsersInput.value.trim().toLowerCase();
  const users = ['@alex', '@emma', '@john', '@sarah'];

  const filtered = users.filter((user) => user.toLowerCase().includes(query));
  searchResults.innerHTML = filtered.length
    ? filtered.map((user) => `<div class="search-item">👤 ${user}</div>`).join('')
    : '<div class="search-item">No users found</div>';
}

function bindEvents() {
  document.querySelectorAll('[data-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const page = button.dataset.page;
      setPage(page);
    });
  });

  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.openModal));
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => closeModal(button.dataset.closeModal));
  });

  document.getElementById('openAI').addEventListener('click', () => openModal('aiModal'));
  document.getElementById('openCreateModal').addEventListener('click', () => openModal('createPostModal'));
  document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
  document.getElementById('sendAIButton').addEventListener('click', sendAIMessage);
  document.getElementById('registerBtn').addEventListener('click', registerUser);
  document.getElementById('loginBtn').addEventListener('click', loginUser);
  document.getElementById('publishPostBtn').addEventListener('click', publishPost);
  document.getElementById('audioCallBtn').addEventListener('click', startAudioCall);
  document.getElementById('videoCallBtn').addEventListener('click', startVideoCall);
  themeToggle.addEventListener('click', toggleTheme);
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendMessage();
  });
  aiInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendAIMessage();
  });
  searchUsersInput.addEventListener('input', handleSearch);

  document.querySelectorAll('.story-pill').forEach((story) => {
    story.addEventListener('click', () => {
      alert('Story opened');
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('modal')) {
      target.classList.remove('active');
    }
  });
}

renderFeed();
handleSearch();
bindEvents();
setPage('homePage');
