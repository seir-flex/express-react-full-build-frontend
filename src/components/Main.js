import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import People from "../pages/People";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = "https://people-api-qn7s.onrender.com/people/";

  const getPeople = () => {
    // fetching all people from our heroku URL
    fetch(URL)
      .then((response) => response.json())
      .then((result) => setPeople(result));
  };
  const queryRunner = async (search) => {
    console.log("inside QueryRunner");
    fetch(`${URL}?q=${search}`)
      .then((response) => response.json())
      .then((result) => setPeople(result));
  };

  const createPeople = async (person) => {
    // make post request to create People
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // I also want to update it here
    getPeople();
  };

  const updatePeople = async (person, id) => {
    // make post request to create People
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // Rerender the list of people
    getPeople();
  };

  const deletePeople = async (id) => {
    // make post request to create People
    await fetch(URL + id, {
      method: "delete",
    });
    // Update the list
    getPeople();
  };

  useEffect(() => getPeople(), []);
  // console.log(`The first person is ${people[0].title}`)

  return (
    <main>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <People
              people={people}
              createPeople={createPeople}
              queryRunner={queryRunner}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
