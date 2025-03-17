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

    // Verwijder het login veld uit formData voordat je het verstuurt
    const { login, ...dataToSend } = formData;

    try {
      // Verstuur het PUT verzoek zonder het login veld
      await axios.put(apiEndPoint, dataToSend);
      onUserUpdated(dataToSend); // Roep de callback aan om de lijst te updaten
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
        disabled // Voeg disabled toe zodat de gebruiker het login veld niet kan bewerken
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
