import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [caption, setCaption] = useState('');

  const loadPosts = async () => {
    const response = await fetch('http://localhost:8080/api/posts');
    const data = await response.json();
    setPosts(Array.isArray(data) ? data : data.content || []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ caption, userId: 1 })
    });

    if (response.ok) {
      setCaption('');
      loadPosts();
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Knot Feed</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/profile">Profile</Link>
          <button onClick={() => localStorage.clear()} style={{ border: 'none', background: 'transparent', color: '#7c3aed' }}>Logout</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 18, padding: 16, boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)', marginBottom: 20 }}>
        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a new post..." />
        <button onClick={createPost} style={{ marginTop: 12, padding: '10px 18px', border: 'none', borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff' }}>
          Post
        </button>
      </div>

      {posts.map((post) => (
        <article key={post.id} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)', padding: 18, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }} />
            <div>
              <strong>{post.user?.displayName || post.user?.username || 'Knot User'}</strong>
              <div style={{ color: '#64748b', fontSize: 12 }}>{new Date(post.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <p style={{ margin: 0 }}>{post.caption}</p>
        </article>
      ))}
    </div>
  );
}
