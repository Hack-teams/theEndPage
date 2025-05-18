import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import StoryCard from './StoryCard';
import MoodSelector from './MoodSelector';
import DoorSlamEffect from './DoorSlamEffect';
import GifExplorer from './GIfExplorer';
import RegretMeter from './REgretMeter';
import FinalButton from './FinalButon';
import FinalPunchline from './FinalPunchline';
import RageSlider from './RageSlider';
const MOTIVATIONAL_MESSAGES = [
  "🌟 Tu es incroyable, ne l'oublie pas !",
  "💬 Aujourd'hui, c'est un nouveau départ.",
  "🎈 Ce n'est pas une fin, c'est une transformation.",
  "🧸 Trouve des gens qui te comprennent. Il y en a.",
  "🌻 Ton histoire continue, tourne juste la page."
];
     
const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

const DEFAULT_STATE = {
  mood: 'ironic',
  slamDoor: false,
  regretLevel: 50,
  rageLevel: 5,
  selectedGif: '',
  punchline: '',
  lastWords: '',
  showStoryCard: false,
  theme: THEMES.DARK,
  elements: [
    'moodSelector',
    'rageSlider',
    'regretMeter',
    'gifExplorer',
    'punchline',
    'lastWords'
  ]
};

const getRandomMessage = () => {
  const index = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  return MOTIVATIONAL_MESSAGES[index];
};

const ConfigCard = ({ children, id }) => (
  <Reorder.Item key={id} value={id} className="mb-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-opacity-20 bg-gray-800 rounded-2xl border border-purple-500 border-opacity-30 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {children}
    </motion.div>
  </Reorder.Item>
);

export default function EndPage() {
  const [state, setState] = useState(DEFAULT_STATE);
  
  const {
    mood,
    slamDoor,
    regretLevel,
    rageLevel,
    selectedGif,
    punchline,
    lastWords,
    showStoryCard,
    theme,
    elements
  } = state;

  const handlePublish = () => {
    setState(prev => ({ ...prev, slamDoor: true }));
    setTimeout(() => {
      setState(prev => ({ ...prev, showStoryCard: true }));
    }, 1200);
  };

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      theme: theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    }));
  };

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const configurableComponents = {
    moodSelector: (
      <ConfigCard id="moodSelector">
        <MoodSelector selected={mood} onSelect={(value) => updateState('mood', value)} />
      </ConfigCard>
    ),
    rageSlider: (
      <ConfigCard id="rageSlider">
        <RageSlider level={rageLevel} onChange={(value) => updateState('rageLevel', value)} />
      </ConfigCard>
    ),
    regretMeter: (
      <ConfigCard id="regretMeter">
        <RegretMeter value={regretLevel} onChange={(value) => updateState('regretLevel', value)} />
      </ConfigCard>
    ),
    gifExplorer: (
      <ConfigCard id="gifExplorer">
        <GifExplorer onSelect={(url) => updateState('selectedGif', url)} />
      </ConfigCard>
    ),
    punchline: (
      <ConfigCard id="punchline">
        <FinalPunchline onSelect={(text) => updateState('punchline', text)} />
      </ConfigCard>
    ),
    lastWords: (
      <ConfigCard id="lastWords">
        <h3 className="text-2xl font-bold mb-4 text-purple-300">Derniers mots</h3>
        <textarea
          className="w-full bg-gray-900 bg-opacity-40 text-white p-4 rounded-lg border border-gray-600 focus:border-purple-400 outline-none min-h-40 resize-y"
          placeholder="Écris ici ta déclaration finale..."
          value={lastWords}
          onChange={(e) => updateState('lastWords', e.target.value)}
        />
      </ConfigCard>
    )
  };

  const themeClasses = {
    container: theme === THEMES.DARK
      ? 'bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white'
      : 'bg-gradient-to-b from-gray-100 via-blue-100 to-white text-gray-900',
    subtitle: theme === THEMES.DARK
      ? 'text-gray-300 dark:text-gray-400'
      : 'text-gray-600',
    badge: theme === THEMES.DARK
      ? 'dark:bg-purple-900/30 text-purple-100'
      : 'bg-pink-100 text-pink-800'
  };

  return (
    <div className={`min-h-screen pb-32 transition-colors duration-500 ${themeClasses.container}`}>
      <DoorSlamEffect trigger={slamDoor} />

      
      <header className="text-center py-12 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`inline-block px-6 py-3 ${themeClasses.badge} rounded-full text-sm font-medium shadow-md mb-4`}
        >
          {getRandomMessage()}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500"
        >
          Bienvenue sur TheEnd.page
        </motion.h1>

        <p className={`text-md md:text-lg mt-4 opacity-80 max-w-2xl mx-auto leading-relaxed ${themeClasses.subtitle}`}>
          Personnalise ta dernière vibe. Écris, glisse, choisis un GIF... et pars avec panache 🪄
        </p>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          Changer le thème ({theme === THEMES.DARK ? 'Clair' : 'Sombre'})
        </motion.button>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl bg-white/5 dark:bg-gray-800/30 backdrop-blur-md shadow-2xl p-8 sm:p-10 border border-purple-500/20"
        >
          {!showStoryCard ? (
            <Reorder.Group axis="y" values={elements} onReorder={(newOrder) => updateState('elements', newOrder)}>
              {elements.map((item) => configurableComponents[item])}
              <div className="mt-12 flex justify-center">
                <FinalButton onClick={handlePublish} />
              </div>
            </Reorder.Group>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <StoryCard
                mood={mood}
                regretLevel={regretLevel}
                rageLevel={rageLevel}
                selectedGif={selectedGif}
                punchline={punchline}
                lastWords={lastWords}
              />
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm mt-16">
        <p>✨ TheEnd.page — Finir en beauté, c'est tout un art.</p>
        <p className="mt-2">© 2025 • Design doux, cœur fort 💜</p>
      </footer>
    </div>
  );
}