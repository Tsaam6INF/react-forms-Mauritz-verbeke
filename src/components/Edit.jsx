import { useState, useEffect } from "react";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

export default function Edit({ user, onUserUpdated, onCancel }) {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user); // Update formulier als de geselecteerde gebruiker verandert
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiEndPoint}/${user.user_id}`, formData); // Update de gebruiker via API
      onUserUpdated(formData); // Roep de callback aan om de lijst te updaten
    } catch (error) {
      console.error("Fout bij bewerken van gebruiker:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Gebruiker Bewerken</h2>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="login"
        value={formData.login}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Opslaan</button>
      <button type="button" onClick={onCancel}>
        Annuleren
      </button>
    </form>
  );
}
