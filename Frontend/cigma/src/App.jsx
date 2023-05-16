//import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProjectPage from "./components/pages/ProjectPage";
import ProjectListOrganism from "./components/organisms/ProjectListOrganism";
import TrashListOrganism from "./components/organisms/TrashListOrganism";
import StartPage from "./components/pages/StartPage";
import DocsPage from "./components/pages/DocsPage";
import DocsContainer from "./components/organisms/DocsContainer";
import LoadingAtom from "./components/atoms/LoadingAtom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import IdePage from "./components/pages/IdePage";
import IdeHeaderOrganism from "./components/organisms/IdeHeaderOrganism";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<StartPage />}></Route>
          <Route path="/docs" element={<DocsPage />}>
            <Route
              path="/docs/intro"
              element={<DocsContainer containerText={"hehe"} />}
            />
            <Route
              path="/docs/setting"
              element={<DocsContainer containerText={"aaa"} />}
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/projects" element={<ProjectPage />}>
            <Route path="/projects" element={<ProjectListOrganism />} />
            <Route path="/projects/trashcan" element={<TrashListOrganism />} />
          </Route>
          <Route path="/test" element={<IdeHeaderOrganism />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
