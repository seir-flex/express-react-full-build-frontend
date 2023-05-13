import { useNavigate, useParams } from "react-router-dom";
import "./UpdatePerson.css";
import { useEffect, useState } from "react";

function UpdatePerson() {
  const [nameState, setNameState] = useState("");
  const [titleState, setTitleState] = useState("");
  const [imageState, setImageState] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `https://people-api-qn7s.onrender.com/people/${id}`;
  //---------fetch data here
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

        const { name, title, image } = personData;

        setNameState(name);
        setTitleState(title);
        setImageState(image);
      } catch (error) {}
    };
    //this is the code that gets activated
    console.log("#2: inside useeffect...component mounted, now we are here.");

    fetchPerson(); //fetching data and setting state
  }, [id]);
  //-----------

  //Here we are making a dynamic onChangeHandler that'll accept a state updater
  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value); //this represents any state updater (setName) that we passed in
  }; //end of func

  //onSubmit
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const updatedPerson = {
      name: nameState,
      title: titleState,
      image: imageState,
    };

    console.log("updated Person: ", updatedPerson);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPerson),
    };

    const responseData = await fetch(url, options);

    const updatedPersonObj = await responseData.json();
    console.log(updatedPersonObj);
    navigate(`/${id}`); //--Take us home 🚀
  }; //end of submitH

  //-------------onSubmit end

  //--------onDeleteHandler
  const onDeleteHandler = async (event) => {
    event.preventDefault();

    console.log("Deleting person with id of: ", id);

    const options = {
      method: "DELETE",
    };

    const responseData = await fetch(url, options);

    const response = await responseData.json();
    console.log(response);

    navigate(`/`); //--Take us home 🚀
  }; //end of submitH
  //---------

  return (
    <div className="newperson">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={nameState}
          name="name"
          placeholder="name"
          onChange={(e) => onChangeHandler(e, setNameState)}
        />
        <input
          type="text"
          value={imageState}
          name="image"
          placeholder="image URL"
          onChange={(e) => onChangeHandler(e, setImageState)}
        />
        <input
          type="text"
          value={titleState}
          name="title"
          placeholder="title"
          onChange={(e) => onChangeHandler(e, setTitleState)}
        />

        <input type="submit" value="✅UPDATE PERSON" />
        <input
          onClick={onDeleteHandler}
          type="button"
          value="😵DELETE PERSON"
        />
      </form>
    </div>
  );
}

export default UpdatePerson;
