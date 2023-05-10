import { useLocation } from "react-router-dom";
import "./Person.css";
import { useEffect, useState } from "react";

function Person2(props) {
  console.log(props);
  const location = useLocation();
  console.log(location);
  const person = location.state || null;
  const [personState, setPersonState] = useState(person);

  useEffect(() => {
    if (!person) {
      console.log("fetch here you fools");

      setPersonState({ name: "potatoe" });
    }
  }, [person, props]);

  console.log(personState);
  return (
    <div className="person">
      {personState ? personState.name : "...loading"}
    </div>
  );
}

export default Person2;
