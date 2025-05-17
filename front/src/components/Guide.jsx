import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/background.png';

const moods = [
  { value: 'heureux', label: 'Happy', emoji: '😊', color: 'from-yellow-400 to-yellow-600' },
  { value: 'triste', label: 'Sad', emoji: '😢', color: 'from-blue-400 to-blue-700' },
  { value: 'enerve', label: 'Angry', emoji: '😠', color: 'from-red-500 to-red-800' },
  { value: 'stressé', label: 'Stressed', emoji: '😰', color: 'from-purple-500 to-purple-800' },
  { value: 'fatigue', label: 'Tired', emoji: '😴', color: 'from-gray-500 to-gray-700' },
  { value: 'neutre', label: 'Neutral', emoji: '😐', color: 'from-gray-400 to-gray-600' }
];

const instructions = [
  "Select the mood that best represents your day",
  "Describe what happened today in a few words",
  "Summarize your day with a single word",
  "Optionally, share any complaints or reflections",
  "Save your entry to track your emotional journey"
];

const stats = [
  { value: "7+", label: "Moods" },
  { value: "∞", label: "Possibilities" },
  { value: "100%", label: "Private" }
];

const Guide = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [todo, setTodo] = useState({
    humeur: 'neutre',
    evenement: '',
    dernierMot: '',
    plainte: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.evenement.trim() === '') return;

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
      <div className="absolute inset-0{ backgroundImage} bg-opacity-50 z-0" />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white bg-opacity-10"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{
            y: [null, Math.random() * 100 - 50],
            x: [null, Math.random() * 100 - 50],
            transition: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Instructions panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 bg-opacity-80 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Create Your Daily Reflection
            </h2>
            
            <ol className="space-y-4">
              {instructions.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-purple-500 rounded-full mr-3 mt-0.5 flex-shrink- Subsection 0 text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ol>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 p-4 bg-gray-700 bg-opacity-50 rounded-lg border-l-4 border-purple-400"
            >
              <p className="text-sm text-gray-300 italic">
                "Reflecting on your day helps build self-awareness and emotional intelligence."
              </p>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="text-center max-w-2xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
                Daily Reflection
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-gray-200 mb-10"
            >
              Capture your emotions and thoughts to understand your daily journey
            </motion.p>

            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              aria-label="Create end page"
            >
              <span className="relative z-10">Create End Page</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-4 text-black"
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={showModal} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-10"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-10"
            >
              <Dialog.Panel className="relative bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all border border-gray-700">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors duration-200"
                  aria-label="Close modal"
                >
                  ×
                </button>
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Dialog.Title as="h2" className="text-3xl font-bold text-white mb-6 flex items-center">
                    <span className="mr-3">✨</span> New Daily Reflection
                  </Dialog.Title>
                </motion.div>
                
                <form onSubmit={handleSubmit}>
                  {/* Mood selection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Mood of the day
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {moods.map((mood, index) => (
                        <motion.div
                          key={mood.value}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          onClick={() => setTodo({...todo, humeur: mood.value})}
                          className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
                            todo.humeur === mood.value 
                              ? `bg-gradient-to-br ${mood.color} ring-2 ring-white shadow-lg` 
                              : 'bg-gray-800 hover:bg-gray-700'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          role="button"
                          tabIndex={0}
                          aria-label={`Select ${mood.label} mood`}
                        >
                          <span className="text-3xl">{mood.emoji}</span>
                          <span className="text-xs text-white mt-1">{mood.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Event description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <label htmlFor="evenement" className="block text-sm font-medium text-gray-300 mb-2">
                      What happened today
                    </label>
                    <input
                      type="text"
                      id="evenement"
                      name="evenement"
                      value={todo.evenement}
                      onChange={handleInputChange}
                      placeholder="Describe your day..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition placeholder-gray-500"
                      required
                    />
                  </motion.div>
                  
                  {/* Summary word */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6"
                  >
                    <label htmlFor="dernierMot" className="block text-sm font-medium text-gray-300 mb-2">
                      A word to summarize
                    </label>
                    <input
                      type="text"
                      id="dernierMot"
                      name="dernierMot"
                      value={todo.dernierMot}
                      onChange={handleInputChange}
                      placeholder="Your word of the day..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition placeholder-gray-500"
                    />
                  </motion.div>
                  
                  {/* Remarks */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <label htmlFor="plainte" className="block text-sm font-medium text-gray-300 mb-2">
                      Remarks or complaints
                    </label>
                    <textarea
                      id="plainte"
                      name="plainte"
                      value={todo.plainte}
                      onChange={handleInputChange}
                      placeholder="Feel free to express yourself..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition placeholder-gray-500"
                      rows={3}
                    />
                  </motion.div>
                  
                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10">Save Reflection</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Success Alert */}
      <Transition
        show={showAlert}
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-4 scale-95"
      >
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          role="alert"
        >
          <motion.span
            className="mr-2 text-xl"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 0.6 }}
          >
            ✨
          </motion.span>
          <span>Your reflection has been successfully saved!</span>
        </motion.div>
      </Transition>
    </div>
  );
};

export default Guide;