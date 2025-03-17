import { useState, useEffect } from "react";
import Users from "./components/Users";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(apiEndPoint).then((resultaat) => {
      setPosts(resultaat.data.data); // Haal enkel de array op
    });
  }, []);

  const handleAdd = () => {
    const obj = { title: "titel A", body: "inhoud", userId: 1 };
    axios.post(apiEndPoint, obj).then(({ data }) => setPosts([...posts, data]));
  };
  return (
    <>
      <Users posts={posts} />
    </>
  );
}

export default App;
