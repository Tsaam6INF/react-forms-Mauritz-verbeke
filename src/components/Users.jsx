export default function Users({ posts, onEdit }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.user_id}>
          <h2>
            {post.first_name} {post.last_name}
          </h2>
          <p>Login: {post.login}</p>
          <button onClick={() => onEdit(post)}>Bewerken</button>
        </div>
      ))}
    </>
  );
}
