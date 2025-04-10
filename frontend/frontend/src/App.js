import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();

    // Nouveau style plus moderne
    const styles = `
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 700px;
        margin: 40px auto;
        padding: 30px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      }
      h1 {
        color: #4A00E0;
        margin-bottom: 20px;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 25px;
      }
      input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s;
      }
      input:focus {
        border-color: #4A00E0;
      }
      .btn {
        padding: 12px 20px;
        font-size: 15px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s, background-color 0.3s;
        margin-right: 10px;
      }
      .btn:hover {
        transform: translateY(-2px);
        opacity: 0.9;
      }
      .btn-primary { background-color: #4A00E0; color: white; }
      .btn-success { background-color: #28a745; color: white; }
      .btn-warning { background-color: #ffc107; color: black; }
      .btn-danger { background-color: #dc3545; color: white; }
      .btn-secondary { background-color: #6c757d; color: white; }
      .user-list {
        list-style: none;
        padding: 0;
      }
      .user-item {
        background: #fafafa;
        padding: 15px 20px;
        border-radius: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        transition: background 0.3s;
      }
      .user-item:hover {
        background: #f0f0f0;
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .user-icon {
        width: 40px;
        height: 40px;
        background-color: #4A00E0;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 18px;
        font-weight: bold;
      }
      .age-badge {
        background: #eee;
        padding: 2px 10px;
        border-radius: 20px;
        font-size: 13px;
        margin-left: 5px;
        color: #555;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const addUser = async () => {
    if (!name || !email || !age) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        name,
        email,
        age: parseInt(age, 10),
      });
      setUsers([...users, response.data]);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
  };

  const updateUser = async () => {
    if (!name || !email || !age) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/users/${editingUser.id}`, {
        name,
        email,
        age: parseInt(age, 10),
      });
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>👥 Gestion des Utilisateurs</h1>
      <div className="form-group">
        <input
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Âge"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div>
          {editingUser ? (
            <>
              <button onClick={updateUser} className="btn btn-success">
                ✅ Modifier
              </button>
              <button onClick={resetForm} className="btn btn-secondary">
                ❌ Annuler
              </button>
            </>
          ) : (
            <button onClick={addUser} className="btn btn-primary">
              ➕ Ajouter
            </button>
          )}
        </div>
      </div>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <div className="user-icon">{user.name[0]}</div>
              <div>
                <strong>{user.name}</strong>
                <br />
                <span>{user.email}</span>
                <span className="age-badge">{user.age} ans</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setEditingUser(user);
                  setName(user.name);
                  setEmail(user.email);
                  setAge(user.age.toString());
                }}
                className="btn btn-warning"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="btn btn-danger"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
