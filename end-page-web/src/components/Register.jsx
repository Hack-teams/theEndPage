import { motion } from "framer-motion";
import React, { useState } from "react";
import Header from "../components/Header";
import { NavLink } from "react-router";

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (!strongRegex.test(password)) {
      setPasswordStrength("weak");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-screen h-screen text-gray-700 bg-gradient-to-br from-gray-900 via-purple-950 to-black">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="min-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Inscription</h2>

          <div>
            <label className="block text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Prénom</label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
            {passwordStrength === "weak" && (
              <p className="text-red-500 text-sm mt-1">
                Mot de passe trop faible (min. 8 caractères, 1 majuscule, 1 chiffre)
              </p>
            )}
            {passwordStrength === "strong" && (
              <p className="text-green-600 text-sm mt-1">Mot de passe sécurisé ✅</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            S'inscrire
          </button>

          <NavLink to="/auth" className="text-blue-600 hover:underline text-sm block text-center">
            Se connecter
          </NavLink>
        </motion.form>
      </div>
    </>
  );
};

export default RegisterForm;
