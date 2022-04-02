import React from "react";

export const Alerts = ({ message, classDiv }) => {
  return (
    <div className={classDiv}>
      <p>*{message}</p>
    </div>
  );
};
