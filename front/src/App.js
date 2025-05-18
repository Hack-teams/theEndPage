import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Auth from './components/Auth';
import Register from './components/Register';
import './App.css';
import Example from './components/Example';
import HowItWorks from './components/HowItWorks';
import EmailUI from './components/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path='/homePage' element={<EmailUI />}/>
      </Routes>
    </div>
  );
}

export default App;