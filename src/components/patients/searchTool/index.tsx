import React from "react";
import { Icon, H3, Button } from "@blueprintjs/core";
import "./style.css";
import SearchItem from "components/patients/searchTool/searchItem";
import SearchName from "components/patients/searchTool/searchName";

interface searchForm {
  label: string;
  symbol: string;
  text: string;
}

interface Props {
  onSearch: Function;
}

const SearchTool = ({ onSearch }: Props) => {
  const [searchForms, setSearchForms] = React.useState([] as searchForm[]);
  const [advancedSearchStyle, setAdvancedSearchStyle] = React.useState(
    "hidden"
  );

  let [nameSearch] = React.useState({ text: "" });

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

  const changeStyle = () => {
    if (advancedSearchStyle === "hidden")
      setAdvancedSearchStyle("advancedSearch");
    else setAdvancedSearchStyle("hidden");
  };

  const search = () => {
    //This function will search for patients corresponding to the request and will show the patient list on the patient table.
    // For now, it only show the search parameters.
    onSearch(nameSearch, searchForms);
  };

  return (
    <>
      <H3>
        <Icon icon={"search-template"} className="icon-title" /> Recherche
      </H3>
      <div className="searchItem">
        <SearchName nameSearch={nameSearch} launchSearch={search} />
      </div>
      <Button onClick={changeStyle} minimal>
        Recherche avancée
      </Button>
      <div className="searchItems">
        <div className={advancedSearchStyle}>
          {searchForms.map((searchForm, index) => (
            <div key={index}>
              <SearchItem
                searchItem={searchForm}
                onRemove={handleRemove}
                launchSearch={search}
              />
            </div>
          ))}
          <Button
            className="buttonAdd"
            icon="plus"
            intent="primary"
            onClick={addSearchForm}
          />
        </div>
      </div>

      <div className="validationButton">
        <Button icon="tick" intent="success" text="Chercher" onClick={search} />
      </div>
    </>
  );
};

export default SearchTool;
