import { useState } from "react";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

export default function Add({ onUserAdded }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiEndPoint, formData);
      onUserAdded(response.data);
      setFormData({ first_name: "", last_name: "", login: "", password: "" });
    } catch (error) {
      console.error("Fout bij toevoegen van gebruiker:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        placeholder="Voornaam"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Achternaam"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="login"
        placeholder="Loginnaam"
        value={formData.login}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Wachtwoord"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Gebruiker toevoegen</button>
    </form>
  );
}
