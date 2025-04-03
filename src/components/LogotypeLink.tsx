import { Link } from "react-router-dom";
import LogoIcon from "../assets/images/Logo.svg";

export const LogotypeLink = () => {
  return (
    <Link to="/" className="logotype">
      <img src={LogoIcon} alt="alpha logotype icon" />
      <span>alpha</span>
    </Link>
  );
};
