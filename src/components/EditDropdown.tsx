import { useState } from "react";

export const EditDropdown = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleOpenClick = () => {
    setShow(!show);
  };

  return (
    <>
      <section id="edit-project-container">
        <div className="meatballs" onClick={handleOpenClick}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="dropdown"></div>
      </section>
      <section id="edit-dropdown" className={`dropdown ${show ? "show" : ""}`}>
        <div className="dropdown-body">
          <nav className="dropdown-options">
            <div className="dropdown-option"></div>
          </nav>
          <div className="divider"></div>
          <nav className="dropdown-actions"></nav>
        </div>
      </section>
    </>
  );
};
