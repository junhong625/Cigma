//import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProjectPage from './components/pages/ProjectPages';
import ProjectList from './components/organisms/ProjectList';
import TrashList from './components/organisms/TrashList';
import StartPage from './components/pages/StartPage';
import DocsPage from './components/pages/DocsPage';
import DocsContainer from './components/organisms/DocsContainer';
import LoadingAtom from "./components/atoms/LoadingAtom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignupPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StartPage />}></Route>
                    <Route path="/docs" element={<DocsPage />}>
                        <Route
                            path="/docs/intro"
                            element={<DocsContainer containerText={'hehe'} />}
                        />
                        <Route
                            path="/docs/setting"
                            element={<DocsContainer containerText={'aaa'} />}
                        />
                    </Route>
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
