import React from "react";

import "./Station.css";
//   import people from "assets/images/people_SVG.svg";
import useStation from "../../hooks/useStation";

export default function Station() {
  const { stations } = useStation();
  stations();
  return <></>;
}
