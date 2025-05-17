import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Endpage {
  id: string;
  mood: string;
  event: string;
  complaint: string;
  date: string;
}

const EndpageList: React.FC = () => {
  const [endpages, setEndpages] = useState<Endpage[]>([]);
  const [newEndpage, setNewEndpage] = useState<Omit<Endpage, 'id' | 'date'>>({
    mood: '',
    event: '',
    complaint: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!newEndpage.mood || !newEndpage.event || !newEndpage.complaint) return;

    if (editingId) {
      setEndpages(endpages.map((item) =>
        item.id === editingId ? { ...item, ...newEndpage } : item
      ));
      setEditingId(null);
    } else {
      setEndpages([
        ...endpages,
        {
          id: uuidv4(),
          ...newEndpage,
          date: new Date().toLocaleDateString('fr-FR'),
        },
      ]);
    }

    setNewEndpage({ mood: '', event: '', complaint: '' });
  };

  const handleEdit = (endpage: Endpage) => {
    setNewEndpage({
      mood: endpage.mood,
      event: endpage.event,
      complaint: endpage.complaint,
    });
    setEditingId(endpage.id);
  };

  const handleDelete = (id: string) => {
    setEndpages(endpages.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Endpage</h1>

        {/* Formulaire d'ajout/modification */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Modifier une entrée' : 'Ajouter une nouvelle entrée'}
          </h2>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Humeur"
              value={newEndpage.mood}
              onChange={(e) => setNewEndpage({ ...newEndpage, mood: e.target.value })}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Ce qui se passe"
              value={newEndpage.event}
              onChange={(e) => setNewEndpage({ ...newEndpage, event: e.target.value })}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Dernier mot plainte"
              value={newEndpage.complaint}
              onChange={(e) => setNewEndpage({ ...newEndpage, complaint: e.target.value })}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddOrUpdate}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>

        {/* Liste des endpages */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Liste des entrées</h2>
          {endpages.length === 0 ? (
            <p className="text-gray-500">Aucune entrée pour le moment.</p>
          ) : (
            <div className="grid gap-4">
              {endpages.map((endpage) => (
                <div
                  key={endpage.id}
                  className="p-4 border rounded-md flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <p><strong>Humeur :</strong> {endpage.mood}</p>
                    <p><strong>Événement :</strong> {endpage.event}</p>
                    <p><strong>Plainte :</strong> {endpage.complaint}</p>
                    <p className="text-sm text-gray-500">Date : {endpage.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(endpage)}
                      className="text-blue-600 hover:underline"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(endpage.id)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EndpageList;