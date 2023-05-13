import React, { useEffect, useState } from "react";
import "./People.css";
import { NavLink } from "react-router-dom";
import PersonItem from "../components/PersonItem";
//index page that shows all of our people on display
//contain componenet to fetch and display people
function People() {
  const [people, setPeople] = useState(null);

  const URL = "https://people-api-qn7s.onrender.com/people/";

  useEffect(() => {
    //useeffect will render once when the compon is mounted.
    //if array dep. is left empty, it will only execute it's code once.
    console.log("UseEffect ran 🪝");
    const fetchPeople = async () => {
      try {
        let responseData = await fetch(URL);
        let allPeople = await responseData.json();
        console.log(allPeople);
        setPeople(allPeople);
      } catch (error) {}
    }; //end of func

    // setTimeout(fetchPeople, 2000);
    fetchPeople();
  }, []);

  let peopleList;

  //if there is something in state, then loop through and use it
  if (people) {
    peopleList = people.map((person, index) => {
      return <PersonItem key={index} person={person} />;
    });
  }

  return (
    <div className="people">
      <h2>All the People</h2>
      {people ? (
        <ul className="people-list">{peopleList}</ul>
      ) : (
        <h2>LOADING...</h2>
      )}
    </div>
  );
}

export default People;
