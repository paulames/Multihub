import React, { Fragment } from "react";
import { useState } from "react";

const ToggleComponent = ({ onClick }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [activeLink, setActiveLink] = useState('INICIO');

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };
}

export default ToggleComponent;