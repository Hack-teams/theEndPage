import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { ColorPicker } from './ColorPicker';
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf';

function getComplaintByMood(mood) {
  const complaints = {
    dramatic: "Le rideau tombe sur cette tragédie qu'était notre relation.",
    ironic: "C'était tellement bien que je ne veux plus jamais recommencer.",
    cringe: "Je cringe tellement fort que mon médecin m'a diagnostiqué un torticolis permanent.",
    classy: "Comme disent les Anglais: 'It's been a pleasure, but the pleasure is mine no more'.",
    angry: "J'espère que ton café sera toujours trop chaud ou trop froid, jamais parfait.",
    absurd: "Je pars rejoindre ma tribu de licornes ninjas sur Mars. Bye."
  };
  return complaints[mood] || "C'est fini. Point.";
}

const EditableText = ({ initialText, className, color, onTextChange }) => {
  const [text, setText] = useState(initialText);
  const [editing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    onTextChange && onTextChange(text);
  };
 
  return editing ? (
    <motion.input
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className={`bg-transparent border-b-2 ${className}`}
      style={{ borderColor: color }}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
      onKeyPress={(e) => e.key === 'Enter' && handleBlur()}
      autoFocus
    />
  ) : (
    <motion.p
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setEditing(true)}
      className={`cursor-text ${className}`}
      style={{ color }}
    >
      {text}
    </motion.p>
  );
};

const StoryCard = ({ mood, regretLevel, selectedGif }) => {
  const [colors, setColors] = useState({
    mood: '#93c5fd',
    event: '#fef08a',
    lastWords: '#000000',
    complaint: '#fecaca',
    text: '#000000',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const cardRef = useRef(null);
  const [items, setItems] = useState(['mood', 'event', 'lastWords', 'complaint']);
  
  const [cardData, setCardData] = useState({
    mood: `Humeur: ${mood}`,
    moodGif: selectedGif || "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
    event: "C'est fini.",
    lastWords: regretLevel > 70 ? "Je ne m'en remettrai jamais..." : 
              regretLevel < 30 ? "Enfin libre !" : 
              "C'était... intéressant.",
    complaint: getComplaintByMood(mood),
    complaintGif: selectedGif || "https://media.giphy.com/media/l2JhGxjRKSNljW9Xa/giphy.gif",
  });

  const handleTextChange = (field) => (newText) => {
    setCardData(prev => ({ ...prev, [field]: newText }));
  };

  const handleColorChange = (field) => (newColor) => {
    setColors(prev => ({ ...prev, [field]: newColor }));
  };

  const exportToPdf = async () => {
    setIsLoading(true);
    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ma-carte-creative.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCard = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const shareOnSocial = (platform) => {
    let url = '';
    const text = encodeURIComponent(`Regardez ma création: "${cardData.lastWords}"`);
    
    switch(platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${text}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
  };

  const cardElements = {
    mood: (
      <Reorder.Item value="mood" className="mb-4">
        <motion.div className="p-4 rounded-xl flex items-center gap-4"
          style={{ backgroundColor: colors.mood }}>
          <motion.img 
            src={cardData.moodGif} 
            className="w-20 h-20 rounded-full object-cover shadow-md" 
          />
          <div className="flex-1">
            <EditableText 
              initialText={cardData.mood} 
              className="text-xl font-bold"
              color={colors.text}
              onTextChange={handleTextChange('mood')}
            />
            <ColorPicker 
              color={colors.mood} 
              onChange={handleColorChange('mood')} 
              label="Background"
            />
          </div>
        </motion.div>
      </Reorder.Item>
    ),
    
    event: (
      <Reorder.Item value="event" className="mb-4">
        <motion.div className="p-4 rounded-xl mx-4"
          style={{ backgroundColor: colors.event }}>
          <EditableText 
            initialText={cardData.event} 
            className="text-lg"
            color={colors.text}
            onTextChange={handleTextChange('event')}
          />
          <ColorPicker 
            color={colors.event} 
            onChange={handleColorChange('event')} 
            label="Background"
          />
        </motion.div>
      </Reorder.Item>
    ),
    
    lastWords: (
      <Reorder.Item value="lastWords" className="mb-4">
        <motion.div className="p-6 rounded-xl m-4 bg-gradient-to-r from-gray-800 to-black">
          <EditableText
            initialText={`"${cardData.lastWords}"`}
            className="text-center italic text-xl"
            color="#ffffff"
            onTextChange={handleTextChange('lastWords')}
          />
        </motion.div>
      </Reorder.Item>
    ),
    
    complaint: (
      <Reorder.Item value="complaint" className="mb-4">
        <motion.div className="border-l-4 p-4 rounded-lg m-4"
          style={{ 
            backgroundColor: colors.complaint,
            borderColor: colors.text
          }}>
          <EditableText 
            initialText={cardData.complaint} 
            className="font-semibold"
            color={colors.text}
            onTextChange={handleTextChange('complaint')}
          />
          <ColorPicker 
            color={colors.complaint} 
            onChange={handleColorChange('complaint')} 
            label="Background"
          />
          <ColorPicker 
            color={colors.text} 
            onChange={handleColorChange('text')} 
            label="Text"
          />
          <motion.img
            src={cardData.complaintGif}
            className="mt-3 w-full h-48 object-cover rounded-md shadow-md"
          />
        </motion.div>
      </Reorder.Item>
    )
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      {/* Carte principale */}
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden p-4"
      >
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
          {items.map((item) => cardElements[item])}
        </Reorder.Group>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveCard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md"
          >
            Enregistrer
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToPdf}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md"
          >
            Exporter PDF
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md"
          >
            Partager
          </motion.button>
        </div>

        {/* Options de partage */}
        {showShareOptions && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex gap-3 justify-center"
          >
            <button 
              onClick={() => shareOnSocial('twitter')}
              className="p-2 bg-blue-400 text-white rounded-full"
            >
              Twitter
            </button>
            <button 
              onClick={() => shareOnSocial('facebook')}
              className="p-2 bg-blue-600 text-white rounded-full"
            >
              Facebook
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Modals et loaders */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full"
            />
          </motion.div>
        )}

        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-8 rounded-xl max-w-md text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                className="text-6xl mb-4"
              >
                ✅
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Succès!</h2>
              <p className="text-gray-600">Votre carte a été sauvegardée.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryCard;