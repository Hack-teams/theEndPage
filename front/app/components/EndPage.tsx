import React, { useState, type ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import backgroundImage from '../assets/background.png';

export default function EndPage() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [todo, setTodo] = useState<EndPage>({
    humeur: 'neutre',
    evenement: '',
    dernierMot: '',
    plainte: ''
  });

  const moods: MoodOption[] = [
    { value: 'heureux', label: 'Happy', emoji: '😊', color: 'from-yellow-400 to-yellow-600' },
    { value: 'triste', label: 'Sad', emoji: '😢', color: 'from-blue-400 to-blue-700' },
    { value: 'enerve', label: 'Angry', emoji: '😠', color: 'from-red-500 to-red-800' },
    { value: 'stressé', label: 'Stressed', emoji: '😰', color: 'from-purple-500 to-purple-800' },
    { value: 'fatigue', label: 'Tired', emoji: '😴', color: 'from-gray-500 to-gray-700' },
    { value: 'neutre', label: 'Neutral', emoji: '😐', color: 'from-gray-400 to-gray-600' }
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.evenement.trim() !== '') {
      console.log("New entry:", todo);
      setShowModal(false);
      setShowAlert(true);
      setTodo({
        humeur: 'neutre',
        evenement: '',
        dernierMot: '',
        plainte: ''
      });
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-opacity-50 z-0"></div>

      <div className="relative z-10 text-center max-w-2xl w-full">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
            Daily Reflection
          </span>
        </h1>
        
        <p className="text-xl text-gray-200 mb-10 animate-fadeIn delay-100">
          Capture your emotions and thoughts for the day
        </p>
        
        <button
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 animate-bounce"
        >
          Create End page
        </button>
      </div>

      <Transition appear show={showModal} as={React.Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => setShowModal(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
                
                <Dialog.Title as="h2" className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">📝</span> New Entry
                </Dialog.Title>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Mood of the day</label>
                    <div className="grid grid-cols-3 gap-3">
                      {moods.map(mood => (
                        <div
                          key={mood.value}
                          onClick={() => setTodo({...todo, humeur: mood.value})}
                          className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${todo.humeur === mood.value ? `bg-gradient-to-br ${mood.color} ring-2 ring-white` : 'bg-gray-800 hover:bg-gray-700'}`}
                        >
                          <span className="text-3xl">{mood.emoji}</span>
                          <span className="text-xs text-white mt-1">{mood.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">What happened today</label>
                    <input
                      type="text"
                      name="evenement"
                      value={todo.evenement}
                      onChange={handleInputChange}
                      placeholder="Describe your day..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">A word to summarize</label>
                    <input
                      type="text"
                      name="dernierMot"
                      value={todo.dernierMot}
                      onChange={handleInputChange}
                      placeholder="Your word of the day..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Remarks or complaints</label>
                    <textarea
                      name="plainte"
                      value={todo.plainte}
                      onChange={handleInputChange}
                      placeholder="Feel free to express yourself..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                      rows={3}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                  >
                    Save Entry
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition
        show={showAlert}
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
      >
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-30 flex items-center">
          <span className="mr-2">✓</span>
          Your entry has been successfully saved!
        </div>
      </Transition>
    </div>
  );
}
