import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NewPerson from "./pages/NewPerson";
import People2 from "./pages/People2";
import { useState } from "react";
import Person2 from "./pages/Person2";

//container comp
function App2() {
  const [people, setPeople] = useState(null);

  // const URL = "https://people-api-qn7s.onrender.com/people/";
  const URL = "http://localhost:8080/people/";

  //we have this function here because we want People2 to trigger it.
  const fetchPeople = async () => {
    console.log("Fetching the people!");
    try {
      let responseData = await fetch(URL);
      let allPeople = await responseData.json();
      console.log(allPeople);
      setPeople(allPeople);
    } catch (error) {}
  }; //end of func

  let routes;
  routes = (
    <Routes>
      <Route
        exact={true}
        path="/"
        element={<People2 people={people} fetchPeople={fetchPeople} />}
      />
      <Route path="/new" element={<NewPerson />} />
      <Route path="/:id" element={<Person2 />} />
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

export default App2;
