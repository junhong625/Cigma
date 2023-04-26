import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProjectPage from "./components/pages/ProjectPage";
import ProjectListOrganism from "./components/organisms/ProjectListOrganism";
import TrashListOrganism from "./components/organisms/TrashListOrganism";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/projects" element={<ProjectPage />}>
            <Route path="/projects" element={<ProjectListOrganism />} />
            <Route path="/projects/trashcan" element={<TrashListOrganism />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
