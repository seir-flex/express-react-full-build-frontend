import React, { useState } from "react";
import "./NewPerson.css";

function NewPerson() {
  const [nameState, setNameState] = useState("");
  const [titleState, setTitleState] = useState("");
  const [imageState, setImageState] = useState("");

  //Here we are making a dynamic onChangeHandler that'll accept a state updater
  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value); //this represents any state updater (setName) that we passed in
  }; //end of func

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newPerson = {
      name: nameState,
      title: titleState,
      image: imageState,
    };

    console.log("New Person, yo: ", newPerson);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    };

    const responseData = await fetch(
      "https://people-api-qn7s.onrender.com/people/",
      options
    );

    const newPersonObj = await responseData.json();
    console.log(newPersonObj);
  }; //end of submitH

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

        <input type="submit" value="Create a Person" />
      </form>
    </div>
  );
}

export default NewPerson;
