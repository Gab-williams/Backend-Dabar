import React from "react";
import LogoLight2x from "../../images/logo2x.png";
import LogoDark2x from "../../images/logo-dark2x.png";
import { Link } from "react-router-dom";

const Logo = ({to}) => {
  return (
    <Link to={to ? to : `${process.env.PUBLIC_URL}/`} className="logo-link">
      <img className="logo-light logo-img" src="https://ik.imagekit.io/jtcvnfckl/logo.png?updatedAt=1708008457511" alt="logo" />
      <img className="logo-dark logo-img" src="https://ik.imagekit.io/jtcvnfckl/logo.png?updatedAt=1708008457511" alt="logo" />
    </Link>
  );
};

export default Logo;
