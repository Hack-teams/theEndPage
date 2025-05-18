import { useState } from "react";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";
import {
    Home,
    Bookmark,
    Calendar,
    Folder,
    Trash,
} from "lucide-react";

const posts = [
  {
    author: "Akhil Gautam",
    subject: "You have been invited!",
    date: "23m ago",
    title: "We need UI/UX designer",
    content: `Hi Akhil,\nDesign and develop enterprise-facing UI and consumer-facing UI as well as REST API backends. Work with Product Managers and User Experience designers to create an appealing user experience for desktop web and mobile web.\n\nThanks & Regards,\nAlexandar`
  },
  {
    author: "Sofia Lee",
    subject: "Meeting rescheduled",
    date: "45m ago",
    title: "Updated meeting invite",
    content: `Hi Akhil,\nThe meeting has been rescheduled to tomorrow at 10:00 AM. Please update your calendar accordingly.\n\nBest,\nSofia`
  },
  {
    author: "Jason Smith",
    subject: "New project kickoff",
    date: "1h ago",
    title: "Project Alpha Kickoff",
    content: `Hello Akhil,\nWe are excited to start the Project Alpha next Monday. Please find the agenda attached and let me know if you have any questions.\n\nCheers,\nJason`
  },
  {
    author: "Emily Johnson",
    subject: "Feedback request",
    date: "2h ago",
    title: "UI Review Feedback Needed",
    content: `Hey Akhil,\nCould you please review the UI changes on the new dashboard and share your feedback by end of day?\n\nThanks,\nEmily`
  },
  {
    author: "Raj Patel",
    subject: "Design assets shared",
    date: "3h ago",
    title: "Design Resources for Sprint 5",
    content: `Hi Akhil,\nI've uploaded the final design assets for Sprint 5 to the shared drive. Let me know if anything is missing.\n\nRegards,\nRaj`
  },
  {
    author: "Anna Müller",
    subject: "Join our UX workshop",
    date: "5h ago",
    title: "UX Workshop Invitation",
    content: `Hi Akhil,\nYou're invited to our UX workshop happening this Friday. It's a great opportunity to learn and collaborate with other designers.\n\nSee you there,\nAnna`
  }
];

function HomePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [postEmotion, setPostEmotion] = useState("joie");
  const [user, setUser] = useState({
    name: "Akhil Gautam",
    email: "akhil.gautam123@gmail.com",
    photo: "https://via.placeholder.com/80",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const emotionContent = {
    joie: "Voici les moments de joie partagés avec vous.",
    tristesse: "Voici les messages tristes ou réflexifs.",
    colere: "Voici les messages marqués par la colère.",
    autre: "Autres émotions ou messages variés.",
  };

  return (
    <div className="space-y-8 p-4">
      {/* Profil inspirant */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-pink-300 to-yellow-300 p-4 rounded-lg shadow-lg">
        <img 
          src={user.photo} 
          alt="profile" 
          className="w-20 md:w-24 h-20 md:h-24 rounded-full border-4 border-white" 
        />
        {!isEditing ? (
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-700">{user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 px-4 py-1 bg-white text-purple-600 rounded-md text-sm border"
            >
              Modifier
            </button>
          </div>
        ) : (
          <div className="space-y-2 w-full md:w-auto">
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => setIsEditing(false)}
              className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-md text-sm"
            >
              Enregistrer
            </button>
          </div>
        )}
      </div>

      {/* Section d'émotion */}
      <div>
        <div className="flex flex-wrap gap-4 mb-4">
          {["joie", "tristesse", "colere", "autre"].map((emo) => (
            <button
              key={emo}
              onClick={() => setPostEmotion(emo)}
              className={`px-4 py-2 border rounded-full text-sm transition-colors duration-200 ${
                postEmotion === emo ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              {emo.charAt(0).toUpperCase() + emo.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-4 border rounded-md bg-gray-50">
          <p className="text-gray-800">{emotionContent[postEmotion]}</p>
        </div>
      </div>
    </div>
  );
}

export default function EmailUI() {
  const [user] = useState({
    name: "Akhil Gautam",
    email: "akhil.gautam123@gmail.com",
    photo: "https://via.placeholder.com/80",
  });

  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedPost, setSelectedPost] = useState(0);

  const getFilteredPosts = () => {
    if (activeTab === "profile") return [];
    switch (activeTab) {
      case "inbox":
        return posts;
      case "Home":
        return posts.slice(1, 3);
      case "bookmarks":
        return posts.slice(3, 4);
      case "calendar":
        return posts.slice(4, 5);
      case "folder":
        return posts.slice(5, 6);
      case "trash":
        return [];
      default:
        return posts;
    }
  };

  const filteredPosts = getFilteredPosts();
  const currentPost = filteredPosts[selectedPost];
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* En-tête inspirant */}
      <header className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center gap-4 shadow-md flex-wrap">
        <img
          src="https://via.placeholder.com/80"
          alt="Illustration"
          className="w-20 h-20 rounded-full border-4 border-white"
        />
        <h1 className="text-3xl font-bold">The EndPage</h1>
      </header>
      
      {/* Contenu principal */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Menu latéral interactif */}
        <div className="w-full md:w-20 bg-white border-r flex flex-row md:flex-col items-center py-6 gap-6 overflow-x-auto md:overflow-visible">
        <button
          onClick={() => {
            setActiveTab("profile");
            setSelectedPost(0);
          }}
          className={`p-1.5 rounded-full transition-transform hover:scale-110 ${activeTab === "profile" ? "ring-2 ring-purple-600" : ""}`}
        >
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="rounded-full w-10 h-10"
          />
        </button>

        {["Home", "bookmarks", "calendar", "folder", "trash"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedPost(0);
            }}
            className={`p-4 rounded-2xl transition-transform hover:scale-110 ${
              activeTab === tab ? "bg-purple-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            {tab === "Home" && <Home />}
            {tab === "bookmarks" && <Bookmark />}
            {tab === "calendar" && <Calendar />}
            {tab === "folder" && <Folder />}
            {tab === "trash" && <Trash />}
          </button>
        ))}

        {/* Spacer to push the logout button to the bottom */}
        <div className="flex-1" />

        {/* Logout button */}
        <button
          onClick={handleLogout} // Remplace handleLogout par ta logique de déconnexion
          className="p-4 rounded-2xl text-red-600 hover:bg-red-100 transition-transform hover:scale-110"
        >
        </button>
      </div>


        {/* Liste des posts restructurée */}
        {activeTab !== "profile" && (
          <div className="w-full md:w-96 border-r overflow-y-auto space-y-2 bg-gray-50 p-4">
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border rounded-md"
              />
            </div>
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                onClick={() => setSelectedPost(index)}
                className={`p-4 border-t cursor-pointer transition-all duration-300 rounded-md ${
                  selectedPost === index 
                    ? "bg-purple-100 text-gray-900 border-l-4 border-purple-600 shadow-md" 
                    : "hover:bg-gray-100"
                } text-left`}
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{post.subject}</p>
                <p className="line-clamp-5 text-sm text-gray-700 mt-2">{post.content}</p>
                <p className="text-blue-600 text-xs mt-1">Lire tout</p>
              </div>
            ))}
          </div>
        )}

        {/* Aperçu en gros plan interactif */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          {activeTab === "profile" ? (
            <ProfilePage />
          ) : currentPost ? (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src="https://via.placeholder.com/60"
                  alt="avatar"
                  className="rounded-full w-16 h-16 border-2 border-purple-600"
                />
                <div>
                  <p className="text-2xl font-bold">{currentPost.author}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <hr className="my-4" />
              <h2 className="text-3xl font-extrabold text-purple-700">{currentPost.title}</h2>
              <div className="p-6 bg-gray-50 border rounded-lg shadow-sm">
                <p className="whitespace-pre-wrap text-gray-800 text-lg">{currentPost.content}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-20">No posts to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

