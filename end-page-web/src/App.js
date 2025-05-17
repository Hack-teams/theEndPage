import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Auth from './components/Auth';
import Register from './components/Register';
import './App.css';
import Showcase from './components/Showcase';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/showcase" element={<Showcase/>} />
      </Routes>
    </div>
  );
}

export default App;