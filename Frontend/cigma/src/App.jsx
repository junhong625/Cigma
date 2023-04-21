// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import LoadingAtom from "./components/atoms/LoadingAtom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignupPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
