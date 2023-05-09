import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import People from "./pages/People";
import NewPerson from "./pages/NewPerson";
//container comp
function App() {
  let routes;

  routes = (
    <Routes>
      <Route exact={true} path="/" element={<People />} />
      <Route path="/new" element={<NewPerson />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div className="App">
      App.js
      <header>
        <h1>People App</h1>
      </header>
      <main>{routes}</main>
    </div>
  );
}

export default App;
