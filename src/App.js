import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import People from "./pages/People";
import NewPerson from "./pages/NewPerson";
import Person from "./pages/Person";
import UpdatePerson from "./pages/UpdatePerson";
import Navbar from "./components/Navbar";

//container comp
function App() {
  let routes;

  routes = (
    <Routes>
      <Route exact={true} path="/" element={<People />} />
      <Route path="/new" element={<NewPerson />} />
      <Route path="/:id" element={<Person />} />
      <Route path="/:id/edit" element={<UpdatePerson />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div className="App">
      App.js
      <header>
        <Navbar />
      </header>
      <main>{routes}</main>
    </div>
  );
}

export default App;
