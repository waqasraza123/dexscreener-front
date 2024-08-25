import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import TokenView from './components/TokenView';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:chainId/:contractAddress" element={<TokenView />} />
      </Routes>
    </Router>
  );
};

export default App;
