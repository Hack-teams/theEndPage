import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Auth from './components/Auth';
import Faq from "./components/Faq";
import EndPage from "./components/EndPage";
import { LoginForm, RegisterForm } from './components/Register';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/endpage" element={<EndPage />} />
      </Routes>
    </div>
  );
}

export default App;
