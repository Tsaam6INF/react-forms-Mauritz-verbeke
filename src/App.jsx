import { useState, useEffect } from "react";
import Users from "./components/Users";
import Add from "./components/Add";
import Edit from "./components/Edit";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get(apiEndPoint).then((result) => {
      setPosts(result.data.data); // Use only the array
    });
  }, []);

  const handleUserAdded = (newUser) => {
    setPosts((prevPosts) => [...prevPosts, newUser]);
  };

  const handleUserUpdated = (updatedUser) => {
    setPosts((prevPosts) =>
      prevPosts.map((user) =>
        user.user_id === updatedUser.user_id ? updatedUser : user
      )
    );
    setEditingUser(null);
  };

  return (
    <>
      <h1>Gebruikerslijst</h1>
      {editingUser ? (
        <Edit
          user={editingUser}
          onUserUpdated={handleUserUpdated}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <>
          <Add onUserAdded={handleUserAdded} />
          <Users posts={posts} onEdit={setEditingUser} />
        </>
      )}
    </>
  );
}

export default App;
