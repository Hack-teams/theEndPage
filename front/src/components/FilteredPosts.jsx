import { useState } from "react";
import Post from "./Post";

const dummyPosts = [
  {
    id: 1,
    name: "Alice Dupont",
    email: "alice@example.com",
    date: "2025-05-18",
    text: `Ceci est un post exprimant de la joie.
Il partage des moments heureux et inspirants.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Pellentesque in odio eu quam ullamcorper semper.
Suspendisse potenti.`,
    emotion: "joie",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Bob Martin",
    email: "bob@example.com",
    date: "2025-05-17",
    text: `Ceci est un post exprimant de la tristesse.
Il raconte des moments difficiles et réfléchis.
Lorem ipsum dolor sit amet.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
Nullam non libero.`,
    emotion: "tristesse",
    image: "",
  },
  {
    id: 3,
    name: "Charlie Moreau",
    email: "charlie@example.com",
    date: "2025-05-16",
    text: `Ceci est un post exprimant de la colère.
Il relate des situations injustes et tropivées.
Lorem ipsum dolor sit amet.
Curabitur vehicula mauris at neque imperdiet, in volutpat lectus ultricies.
Suspendisse commodo.`,
    emotion: "colere",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    name: "Diane Leblanc",
    email: "diane@example.com",
    date: "2025-05-15",
    text: `Ceci est un post d'une autre émotion.
Un regard unique sur la vie et ses complexités.
Lorem ipsum dolor sit amet.
Mauris facilisis urna at dui efficitur, non mollis quam sodales.
Aliquam erat volutpat.`,
    emotion: "autre",
    image: "",
  },
];

const emotionOptions = ["all", "joie", "tristesse", "colere", "autre"];

export default function FilteredPosts() {
  const [filter, setFilter] = useState("all");

  const filteredPosts =
    filter === "all" ? dummyPosts : dummyPosts.filter((post) => post.emotion === filter);

  return (
    <div className="p-4">
      {/* Boutons de filtrage */}
      <div className="flex gap-4 mb-4">
        {emotionOptions.map((emo) => (
          <button
            key={emo}
            onClick={() => setFilter(emo)}
            className={`px-4 py-2 border rounded-full text-sm transition-colors duration-200 ${
              filter === emo ? "bg-purple-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            {emo.charAt(0).toUpperCase() + emo.slice(1)}
          </button>
        ))}
      </div>

      {/* Affichage des posts filtrés */}
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              email={post.email}
              date={post.date}
              text={post.text}
              image={post.image}
              emotion={post.emotion}
            />
          ))
        ) : (
          <p className="text-gray-500">Aucun post trouvé pour cette émotion.</p>
        )}
      </div>
    </div>
  );
}