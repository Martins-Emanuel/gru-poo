import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import NovaPagina from './pages/tabela';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tabela" element={<NovaPagina />} />
      </Routes>
    </BrowserRouter>
  );
}