import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import AllRoutes from "./Router/AllRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
