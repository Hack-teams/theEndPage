import { useEffect, useState } from "react";
import axios from "axios";
import FilteredPosts from "./FilteredPosts";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [emotion, setEmotion] = useState("joie");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:4000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        setUserInfo({
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          image: user.image
            ? `http://localhost:3000/uploads/${user.image}`
            : "https://via.placeholder.com/60",
        });
      } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Section du haut */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <img
            src={userInfo.image}
            alt="profile"
            className="rounded-full w-16 h-16 object-cover"
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
              onClick={() => setEditMode(false)}
              className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              {editMode ? "Annuler" : "Raconter une nouvelle histoire"}
            </button>
          </div>
        </div>
      </div>

      {/* Section des posts filtrés */}
      <div className="mt-6">
        <FilteredPosts defaultFilter={emotion} />
      </div>
    </div>
  );
}
