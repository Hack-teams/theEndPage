// ProfilePage.jsx
import { useState } from "react";
import FilteredPosts from "./FilteredPosts"; // Importation du composant de filtrage

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Akhil Gautam",
    email: "akhil.gautam123@gmail.com",
  });
  const [emotion, setEmotion] = useState("joie");

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Section du haut */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/60"
            alt="profile"
            className="rounded-full w-16 h-16"
          />
          <div>
            {editMode ? (
              <>
                <input
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="text-xl font-bold border-b focus:outline-none"
                />
                <br />
                <input
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="text-sm text-gray-600 border-b focus:outline-none"
                />
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold">{userInfo.name}</h1>
                <p className="text-sm text-gray-600">{userInfo.email}</p>
              </>
            )}
          </div>
          <div className="ml-auto flex gap-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              {editMode ? "Enregistrer" : "Modifier"}
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              {editMode ? "Annuler" : "Raconter une nouvelle histoire"}
            </button>
          </div>
        </div>
      </div>

    

      {/* Intégration des posts filtrés selon l'émotion */}
      <div className="mt-6">
        <FilteredPosts defaultFilter={emotion} />
      </div>
    </div>
  );
}
