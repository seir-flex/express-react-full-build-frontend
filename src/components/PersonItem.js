import "./PersonItem.css";
import { NavLink } from "react-router-dom";

function PersonItem(props) {
  const { person } = props;

  return (
    <li className="personitem">
      <NavLink to={`/${person._id}`} state={person}>
        <h3>{person.name}</h3>
        <h3>{person.title}</h3>
        <img className="avatar" src={person.image} alt="avatar" />
      </NavLink>
    </li>
  );
}

export default PersonItem;
