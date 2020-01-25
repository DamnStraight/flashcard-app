import "./Card.scss";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }) => {
  return (
    <div className="Card">
      {children}
    </div>
  );
};

export default Card;
