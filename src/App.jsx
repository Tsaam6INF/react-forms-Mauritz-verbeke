import { useState, useEffect } from "react";
import Users from "./components/Users";
import Add from "./components/Add";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(apiEndPoint).then((resultaat) => {
      setPosts(resultaat.data.data);
    });
  }, []);

  const handleUserAdded = (newUser) => {
    setPosts((prevPosts) => [...prevPosts, newUser]);
  };

  return (
    <>
      <h1>Gebruikerslijst</h1>
      <Add onUserAdded={handleUserAdded} />
      <Users posts={posts} />
    </>
  );
}

export default App;
