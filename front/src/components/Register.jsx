import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tree from "../assets/tree.png";
import trees from "../assets/trees.png";
import leaf from "../assets/leaf.png";

const FloatingLeaves = ({ count = 12 }) => {
  const leaves = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotate: Math.random() * 360,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            rotate: `${leaf.rotate}deg`,
            backgroundImage: `url(${leaf})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, 50, 0],
            rotate: [0, 180, 360],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969')] bg-cover bg-center"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 0.95, 0.9]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-purple-900/80 to-gray-900/80 backdrop-blur-sm" />
      <FloatingLeaves />
    </div>
  );
};

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(null);

const handleFileChange = (e) => {
  setImage(e.target.files[0]);
};


  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = ("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      checkPasswordStrength(value);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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


  const validateForm = () => {
    const newErrors = {};

    if (!form.firstname.trim()) newErrors.firstname = "First name is required";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength === "weak") {
      newErrors.password = "Password must be stronger";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");

  if (form.password !== form.confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("firstname", form.firstname);
    formData.append("lastname", form.lastname);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("image", image); // <- Ajoute l'image ici

    const res = await axios.post("http://localhost:4000/api/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const token = res.data.token;
    localStorage.setItem("token", token);
    navigate("/homePage");
  } catch (err) {
    alert(err.response?.data?.error || "Une erreur est survenue.");
  }
};

   

  return (
    <>
      <Header />
      <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen p-6">
        <AnimatedBackground />
        
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
        
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col justify-center items-center relative mb-8 lg:mb-0 z-10"
        >
          <div className="relative h-64 w-full flex justify-center items-end">
            <motion.img
              src={trees}
              alt="Forest background"
              className="w-64 h-64 drop-shadow-2xl absolute bottom-0 left-1/4"
              animate={{
                y: [0, -5, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={tree}
              alt="Main tree"
              className="w-48 h-48 drop-shadow-2xl relative z-10"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={leaf}
              alt="Floating leaf"
              className="w-12 h-12 drop-shadow-xl absolute top-1/4 right-1/4"
              animate={{
                x: [0, 15, 0],
                y: [0, -15, 0],
                rotate: [0, 10, 0],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="min-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4"
          encType="multipart/form-data"
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="text-4xl font-extrabold text-center text-white">Sign Up</h2>
            <p className="text-center text-white/80 mt-2">Create your account to get started</p>
          </motion.div>

          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-center p-2 rounded-lg bg-red-900/30"
            >
              {errorMessage}
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["firstname", "lastname"].map((field, i) => (
              <div key={i}>
                <label htmlFor={field} className="block text-white/80 text-sm font-semibold mb-1.5 capitalize">
                  {field.replace("name", " Name")}
                </label>
                <input
                  id={field}
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field === "firstname" ? "John" : "Doe"}
                  className={`w-full border-2 rounded-xl p-3 text-white bg-white/10 placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors[field] ? "border-red-400" : "border-white/20"}`}
                  aria-invalid={errors[field] ? "true" : "false"}
                />
                {errors[field] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1.5"
                    role="alert"
                  >
                    {errors[field]}
                  </motion.p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="email" className="block text-white/80 text-sm font-semibold mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl p-3 text-white bg-white/10 placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.email ? "border-red-400" : "border-white/20"}`}
              placeholder="your@email.com"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1.5"
                role="alert"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

                  <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

          <div>
            <label htmlFor="password" className="block text-white/80 text-sm font-semibold mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl p-3 text-white bg-white/10 placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.password ? "border-red-400" : "border-white/20"}`}
              placeholder="••••••••"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {passwordStrength && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs mt-1.5 ${passwordStrength === "weak" ? "text-red-400" : "text-green-400"}`}
              >
                {passwordStrength === "weak" ? "Password too weak (min. 8 chars, 1 uppercase, 1 number)" : "Strong password"}
              </motion.div>
            )}
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1.5"
                role="alert"
              >
                {errors.password}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-semibold mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl p-3 text-white bg-white/10 placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.confirmPassword ? "border-red-400" : "border-white/20"}`}
              placeholder="••••••••"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1.5"
                role="alert"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${isSubmitting ? "bg-purple-400/50 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 shadow-lg"}`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Registering...
              </div>
            ) : (
              "Sign Up"
            )}
          </motion.button>

          <div className="text-center text-sm text-white/80">
            Already have an account?{" "}
            <NavLink to="/auth" className="text-purple-300 hover:text-purple-400 font-semibold transition-colors">
              Log in
            </NavLink>
          </div>
        </motion.form>
      </div>
    </>
  );
};


const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login successful", form);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <Header />
      <div
        className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <AnimatedBackground />
        
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
        
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col justify-center items-center relative mb-8 lg:mb-0 z-10"
        >
          <div className="relative h-64 w-full flex justify-center items-end">
            <motion.div
              className="absolute bottom-0 left-1/4"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <img
                src={trees}
                alt="Forest background"
                className="w-64 h-64 drop-shadow-2xl opacity-90"
              />
            </motion.div>
            <motion.img
              src={tree}
              alt="Main tree"
              className="w-48 h-48 drop-shadow-2xl relative z-10"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={leaf}
              alt="Floating leaf"
              className="w-12 h-12 drop-shadow-xl absolute top-1/4 right-1/4"
              animate={{
                x: [0, 15, 0],
                y: [0, -15, 0],
                rotate: [0, 10, 0],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg p-8 bg-black/30 backdrop-blur-md rounded-3xl shadow-2xl space-y-6 lg:ml-12 z-10 border border-white/10"
          whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          aria-label="Login form"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          >
            <h2 className="text-4xl font-extrabold text-center text-white">Welcome Back</h2>
            <p className="text-center text-white/80 mt-2">Log in to your account</p>
          </motion.div>

          <div>
            <label htmlFor="email" className="block text-white/80 text-sm font-semibold mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl p-3 text-white bg-white/10 placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.email ? "border-red-400" : "border-white/20"}`}
              placeholder="your@email.com"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-red-400 text-xs mt-1.5"
                role="alert"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-white/80 text-sm font-semibold mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl p-3 text-white bg-white/10 placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.password ? "border-red-400" : "border-white/20"}`}
              placeholder="••••••••"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-red-400 text-xs mt-1.5"
                role="alert"
              >
                {errors.password}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#7C3AED" }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${isSubmitting ? "bg-purple-400/50 cursor-not-allowed" : "bg-purple-600 shadow-lg"}`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Log In"
            )}
          </motion.button>

          <motion.div
            className="text-center text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-purple-300 hover:text-purple-400 font-semibold transition-colors"
            >
              Sign up
            </NavLink>
          </motion.div>
        </motion.form>
      </div>
    </>
  );
};

export { RegisterForm, LoginForm };