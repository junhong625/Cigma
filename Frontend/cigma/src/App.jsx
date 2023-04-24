import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProjectPage from './components/pages/ProjectPages';
import ProjectList from './components/organisms/ProjectList';
import TrashList from './components/organisms/TrashList';
import StartPage from './components/pages/StartPage';
import DocsPage from './components/pages/DocsPage';
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StartPage />}></Route>
                    <Route path="/tutorials" element={<DocsPage />}></Route>
                    <Route path="/projects" element={<ProjectPage />}>
                        <Route path="/projects" element={<ProjectList />} />
                        <Route path="/projects/trashcan" element={<TrashList />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
