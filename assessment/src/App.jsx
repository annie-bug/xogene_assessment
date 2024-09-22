import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrugSearch from './components/search/drugSearch.jsx';
import DrugDetail from './components/dugDetails/Drugdetail.jsx';
import NotFound from './components/dugDetails/notFound.jsx';


function App() {
  

  return (
   <Router>
     <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DrugSearch />} />
          <Route path="/drug/:drugName" element={<DrugDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
   </Router>
  )
}

export default App
