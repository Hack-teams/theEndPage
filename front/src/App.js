import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Auth from './components/Auth';
import Register, { RegisterForm } from './components/Register';
import './App.css';
import EndPage from './components/EndPage';
import Faq from './components/Faq';
import EmailUI from './components/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/homePage' element={<EmailUI />}/>
        <Route path="/endpage" element={<EndPage />} />
        <Route path='/faq' element={<Faq />}/>
      </Routes>
    </div>
  );
}

export default App;