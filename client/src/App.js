import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Main from "./Pages/Main";
import Dropzone from './Pages/Dropzone';


function App() {
  return (
    <div>
      <Router>

        <div className="list">
          <ul>
            <li><Link to="main">Main</Link></li>
            <li><Link to="dropzone">DropZone</Link></li>
          </ul>
        </div>

        <Routes>
          <Route exact path="main" element={<Main />} />
          <Route exact path="dropzone" element={<Dropzone />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App