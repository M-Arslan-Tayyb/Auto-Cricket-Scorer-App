import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeading from "./components/MainHeading";
import NewMatch from "./pages/NewMatch";
import WelcomePage from "./pages/WelcomePage";
import ScoreBoard from "./pages/ScoreBoard";
import "./App.css"

function App() {
  return (
    
    <main className="w-screen h-screen custom-scrollbar" >
        <Routes>
          {/* MainHeading is the parent route component */}
          <Route path="/" element={<MainHeading />}>
            {/* Child routes are rendered using Outlet */}
            <Route index path="/" element={<WelcomePage></WelcomePage>}></Route>
            <Route path="/newMatch" element={<NewMatch />} />
            <Route path="/scoreBoard" element={<ScoreBoard />} />

            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>

    </main>
    
    
    
  );
}

export default App;
