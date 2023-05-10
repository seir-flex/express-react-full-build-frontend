import React, { useEffect, useState } from "react";
import "./People.css";
import { NavLink } from "react-router-dom";
import PersonItem2 from "../components/PersonItem2";
//index page that shows all of our people on display
//contain componenet to fetch and display people
function People2(props) {
  const { people } = props;

  //we only want this to run when it's mounted
  useEffect(() => {
    console.log("UseEffect ran 🪝");
    // setTimeout(fetchPeople, 2000);
    if (!props.people) {
      props.fetchPeople();
    }
  }, [props]);

  let peopleList;

  //if there is something in state, then loop through and use it
  if (people) {
    peopleList = people.map((person, index) => {
      return <PersonItem2 key={index} person={person} />;
    });
  }

  return (
    <div className="people">
      <h2>All the People</h2>
      {people ? <ul>{peopleList}</ul> : <h2>LOADING...</h2>}
    </div>
  );
}

export default People2;
