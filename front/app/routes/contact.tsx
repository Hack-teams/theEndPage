import { useState } from "react";
import Navbar from '~/components/Navbar';
import { Mail, User, MessageSquare, Phone } from 'lucide-react';
import contactImage from "../assets/contactBLanc.png";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    alert('Message envoyé!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-blue-900 mb-4"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Nous serions ravis d'entendre parler de vous. Remplissez le formulaire ou utilisez nos coordonnées directes.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2 bg-white p-10 rounded-2xl shadow-xl border border-blue-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label htmlFor="name" className="block text-lg font-medium text-blue-900">
                  Nom complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-700" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-4 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-400 transition-all"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="email" className="block text-lg font-medium text-blue-900">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-700" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-4 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-400 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="message" className="block text-lg font-medium text-blue-900">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4">
                    <MessageSquare className="h-5 w-5 text-blue-700" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-4 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-400 transition-all"
                    placeholder="Votre message..."
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all"
                >
                  Envoyer le message
                </button>
              </motion.div>
            </form>

            <div className="mt-16 border-t border-blue-200 pt-12">
              <h2 className="text-2xl font-bold text-blue-900 mb-8">
                Autres moyens de contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex items-start p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100 transition-all"
                >
                  <div className="flex-shrink-0 bg-blue-100 p-4 rounded-xl">
                    <Mail className="h-6 w-6 text-blue-800" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-blue-900">Email</h3>
                    <p className="text-blue-700 mt-2">contact@example.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex items-start p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100 transition-all"
                >
                  <div className="flex-shrink-0 bg-blue-100 p-4 rounded-xl">
                    <Phone className="h-6 w-6 text-blue-800" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-blue-900">Téléphone</h3>
                    <p className="text-blue-700 mt-2">+1 (555) 123-4567</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <motion.img
              src={contactImage}
              alt="Contact illustration"
              className="max-w-lg w-full h-auto object-contain"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}