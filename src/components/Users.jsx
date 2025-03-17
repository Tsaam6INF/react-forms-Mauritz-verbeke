export default function Users({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <div>
          <h2>{post.first_name}</h2>
        </div>
      ))}
    </>
  );
}
