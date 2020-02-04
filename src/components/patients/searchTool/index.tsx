import React, { useState } from "react";
import { Icon, H3, Button } from "@blueprintjs/core";
import "./style.css";
import SearchItem from "components/patients/searchTool/searchItem";
import { LineSeries } from "@amcharts/amcharts4/charts";

const SearchTool = () => {
  const [searchItems, setSearchItems] = useState([0]);

  return (
    <>
      <H3>
        <Icon icon={"search-template"} /> Recherche
      </H3>
      {searchItems.map(m => (
        <SearchItem key={m} />
      ))}

      <Button
        className="buttonAdd"
        icon="plus"
        intent="primary"
        onClick={() => {
          setSearchItems([...searchItems, searchItems.length]);
        }}
      />
      <div className="validationButton">
        <Button icon="tick" intent="success" text="Chercher" />
      </div>
    </>
  );
};

export default SearchTool;
