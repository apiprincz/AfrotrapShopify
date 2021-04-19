import React from "react";
import Pick from "../Components/Content/Pick";
import Exclusive from "../Components/Content/Exclusive";
import Flash from "../Components/Content/Flash";
import Latest from "../Components/Content/Latest";

const Content = ({ pick, exclusive, flash, latest }) => {
  // console.log("products" + JSON.stringify(products));

  // console.log(products);

  return (
    <div>
      <Pick pick={pick} />

      <Exclusive exclusive={exclusive} />
      <Flash flash={flash} />
      <Latest latest={latest} />
    </div>
  );
};

export default Content;
