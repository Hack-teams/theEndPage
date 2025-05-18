import { useState } from "react";

export default function Post({ name, email, date, text, image, emotion }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(prev => !prev);

  // Mapping des couleurs de fond selon l'émotion
  const emotionBg = {
    joie: "bg-green-100",
    tristesse: "bg-blue-100",
    colere: "bg-red-100",
    autre: "bg-yellow-100"
  };
  const bgClass = emotionBg[emotion] || "bg-gray-100";

  return (
    <div className={`border p-4 rounded-md shadow-md my-4 ${bgClass}`}>
      {/* En-tête du post */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      {/* Contenu du post */}
      <div className="mt-3">
        {expanded ? (
          <p className="whitespace-pre-wrap text-gray-800">{text}</p>
        ) : (
          <p className="whitespace-pre-wrap text-gray-800 line-clamp-5">{text}</p>
        )}
        {text.split("\n").length > 5 && (
          <button onClick={toggleExpand} className="text-blue-600 text-xs mt-2">
            {expanded ? "Réduire" : "Développer"}
          </button>
        )}
      </div>

      {/* Image facultative */}
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Illustration du post"
            className="w-full object-cover rounded"
          />
        </div>
      )}
    </div>
  );
}