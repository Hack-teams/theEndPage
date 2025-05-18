// ... autres imports
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FilteredPosts from "./FilteredPosts"; // Assurez-vous que le chemin est correct

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    image: null,
    oldPassword: "",
    newPassword: "",
    file: null, // pour l'image
  });

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;
        const imageUrl = user.image
          ? `http://localhost:4000/uploads/${user.image}`
          : "/default-profile.png";

        setUserInfo({
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          image: imageUrl,
          oldPassword: "",
          newPassword: "",
          file: null,
        });

        setUserId(user.id);
      } catch (err) {
        console.error("Erreur de récupération utilisateur :", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo({ ...userInfo, file, image: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("username", userInfo.name);
      formData.append("email", userInfo.email);
      if (userInfo.newPassword) {
        formData.append("password", userInfo.newPassword);
      }
      if (userInfo.file) {
        formData.append("image", userInfo.file);
      }

      await axios.put(`http://localhost:4000/api/auth/update/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditMode(false);
      alert("Profil mis à jour avec succès !");
      window.location.reload();
    } catch (err) {
      console.error("Erreur de mise à jour :", err);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <img
            src={userInfo.image}
            alt="profile"
            className="rounded-full w-16 h-16 object-cover"
            onError={(e) => (e.target.src = "/default-profile.png")}
          />
          <div>
              <>
                <h1>{userInfo.name}</h1>
                <p>{userInfo.email}</p>
              </>
            
          </div>
        </div>
      </div>
      <FilteredPosts defaultFilter="joie" />
    </div>
  );
}
