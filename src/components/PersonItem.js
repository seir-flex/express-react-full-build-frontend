import "./PersonItem.css";
import { NavLink } from "react-router-dom";

function PersonItem(props) {
  const { person } = props;

  return (
    <li className="personitem">
      <NavLink to={`/people/${person._id}`}>
        <h3>{person.name}</h3>
        <h3>{person.title}</h3>
      </NavLink>
      <img src={person.image} alt="avatar" />
    </li>
  );
}

export default PersonItem;
