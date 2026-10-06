export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{ maxWidth: 760, margin: '60px auto', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)', textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', margin: '0 auto 18px' }} />
        <h2 style={{ margin: 0 }}>{user.displayName || user.username || '@knot_user'}</h2>
        <p style={{ color: '#64748b' }}>@{user.username || 'knot_user'}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 30, marginTop: 24, flexWrap: 'wrap' }}>
          <div><strong>25</strong><div>Posts</div></div>
          <div><strong>1.4K</strong><div>Followers</div></div>
          <div><strong>420</strong><div>Following</div></div>
        </div>
      </div>
    </div>
  );
}
