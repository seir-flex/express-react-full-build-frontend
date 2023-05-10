import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Person.css";
import { useEffect, useState } from "react";

function Person2(props) {
  console.log(props);
  const location = useLocation();
  console.log(location);
  const person = location.state || null; //if no location.state then we can just use backup null value
  const navigate = useNavigate();
  const [personState, setPersonState] = useState(person);

  useEffect(() => {
    console.log(
      "componenet mounted🧱. This will only happen once in the componenet life cycle. rendering however can happen many times."
    );
  }, []);

  useEffect(() => {
    console.log("inside useEffect...lets check some stuff...");
    if (personState === null) {
      const fetchPerson = async () => {
        console.log("Fetching person!");
        try {
          let responseData = await fetch(
            `http://localhost:8080/people${location.pathname}`
          );
          let personData = await responseData.json();
          console.log(personData);
          console.log("Setting state, about to rerender..");
          setPersonState(personData);
        } catch (error) {}
      }; //end of func

      fetchPerson();

      // navigate(`/`); //<--this would just redirect them if person
    } else {
      console.log("guess theres no need to fetch 😎");
    }
  }, [personState, props, location.pathname]);

  console.log("personState:", personState);
  return (
    <div className="person">
      {console.log("🖼️ Render ")}
      {personState ? personState.name : "...loading"}
    </div>
  );
}

export default Person2;

//since the user's individual data is passed via a NavLink, if the user somehow reaches this page (ex: pasting url manually or via a bookmark) then the person's info would have never been fetched from People.js and sent when we tunnel through the NavLink to get here.
//This means we could check to see if the NavLink state is there, if not, we could fetch the user's data in here.
//The other option would be to just redirect the user back to the homepage. But that wouldn't be a good userExp. we should fetch.

//NEXT: place navigate() in there first, and then immediately after show them how to call state by using the location object we are already passing in. Also can do this with useParams()
//the main will still be the crappy version.
