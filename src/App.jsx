import { Outlet } from "react-router-dom";
import { NavbarComp } from "./components/NavbarComp";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <NavbarComp />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;