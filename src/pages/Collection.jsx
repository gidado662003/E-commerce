import React from "react";
import Collections from "../components/Collections";

function Collection({ searchValue }) {
  console.log(searchValue);
  return (
    <>
      <Collections searchValue={searchValue} />
    </>
  );
}

export default Collection;
