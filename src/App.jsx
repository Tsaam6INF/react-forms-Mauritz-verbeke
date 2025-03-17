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
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    axios.get(apiEndPoint).then((result) => {
      setPosts(result.data.data);
    });
  }, []);

  const handleUserAdded = (newUser) => {
    setPosts((prevPosts) => [...prevPosts, newUser]);
    setIsAddingUser(false); // Sluit het formulier af nadat een gebruiker is toegevoegd
  };

  const handleUserUpdated = (updatedUser) => {
    setPosts((prevPosts) =>
      prevPosts.map((user) =>
        user.user_id === updatedUser.user_id ? updatedUser : user
      )
    );
    setEditingUser(null);
  };

  const handleCancelAdd = () => {
    setIsAddingUser(false); // Sluit het formulier af zonder iets toe te voegen
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
      ) : isAddingUser ? (
        <Add onUserAdded={handleUserAdded} onCancel={handleCancelAdd} /> // Pass handleCancelAdd as a prop
      ) : (
        <>
          <button onClick={() => setIsAddingUser(true)}>
            Gebruiker Toevoegen
          </button>
          <Users posts={posts} onEdit={setEditingUser} />
        </>
      )}
    </>
  );
}

export default App;
