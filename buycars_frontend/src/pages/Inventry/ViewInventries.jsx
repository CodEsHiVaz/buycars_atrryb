import React, { useContext } from "react";

import { MainContext } from "../../Context/MinContext";

function ViewInventries() {
  const { savedforCurd } = useContext(MainContext);

  return <div>{savedforCurd.modelName}</div>;
}

export default ViewInventries;
