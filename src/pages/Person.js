import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Person.css";

function Person() {
  const [personState, setPersonState] = useState(null);

  const [number, setNumber] = useState(5);

  const { id } = useParams();
  console.log(useParams());
  const url = `https://people-api-qn7s.onrender.com/people/${id}`; //fetch a person by id this will reach our server.

  //useeffect will only run once []
  useEffect(() => {
    //this is the code that gets activated
    console.log("Componenet mounted.🏗️. This will only happen once");
  }, []); //faking out useeffect to "wait" on a change from the array of dependencies. But we don't have any in there...snicker snicker......

  useEffect(() => {
    const fetchPerson = async () => {
      console.log("going to fetch person with id of: ", id);
      try {
        const responseData = await fetch(url);
        const personData = await responseData.json(); //converting our html response that we got from the server into a useable person {object}.
        console.log(personData); //usable person
        console.log(
          "Setting state, about to rerender..(not remount, just re-render)."
        );
        setPersonState(personData);
      } catch (error) {}
    };
    //this is the code that gets activated
    console.log("#2: inside useeffect...component mounted, now we are here.");

    fetchPerson(); //fetching data and setting state
  }, [id, number]);

  return (
    <div className="person">
      {console.log("#1: 🖼️Rendering component...")}
      {personState ? (
        <>
          <div className="person">
            <h2>{personState.name}</h2>
            <h3>{personState.title}</h3>
            <div className="profile-pic-container">
              <img
                className="profile-pic"
                src={personState.image}
                alt="profile pic"
              />
            </div>

            <h3>BIO:</h3>
            <p>
              If your person had a bio property, it would go here. But rather
              than just boring old Lorem Ipsum. Here's an article about Lorem
              Ipsum instead. Contrary to popular belief, Lorem Ipsum is not
              simply random text. It has roots in a piece of classical Latin
              literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32.
            </p>
            <Link to={`/${personState._id}/edit`}>
              <button>EDIT</button>
            </Link>
          </div>
        </>
      ) : (
        "...loading"
      )}
    </div>
  );
}

export default Person;
