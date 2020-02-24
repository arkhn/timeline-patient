import React from "react";
import { Icon, H3, Button } from "@blueprintjs/core";
import "./style.css";
import SearchItem from "components/patients/searchTool/searchItem";

interface searchForm {
  label: string;
  symbol: string;
  text: string;
}

const SearchTool = () => {
  const newSearchForm: searchForm = {
    label: "",
    symbol: "",
    text: ""
  };
  const [searchForms, setSearchForms] = React.useState([
    newSearchForm
  ] as searchForm[]);

  const addSearchForm = () => {
    const newSearchForm: searchForm = {
      label: "",
      symbol: "",
      text: ""
    };
    searchForms.push(newSearchForm);
    setSearchForms([...searchForms]);
  };

  const handleRemove = (searchItem: any) => {
    searchForms.splice(searchForms.indexOf(searchItem), 1);
    setSearchForms([...searchForms]);
  };

  const search = () => {
    //This function will search for patients corresponding to the request and will show the patient list on the patient table.
    // For now, it only show the search parameters.
    console.log(searchForms);
  };

  return (
    <>
      <H3>
        <Icon icon={"search-template"} className="icon-title" /> Recherche
      </H3>
      <div className="div-searchItems">
        {searchForms.map((searchForm, index) => (
          <div className="div-searchItem" key={index}>
            <SearchItem searchItem={searchForm} onRemove={handleRemove} />
          </div>
        ))}
        <Button
          className="buttonAdd"
          icon="plus"
          intent="primary"
          onClick={addSearchForm}
        />
      </div>

      <div className="validationButton">
        <Button icon="tick" intent="success" text="Chercher" onClick={search} />
      </div>
    </>
  );
};

export default SearchTool;
