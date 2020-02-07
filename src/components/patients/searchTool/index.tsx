import React from "react";
import { Icon, H3, Button } from "@blueprintjs/core";
import "./style.css";
import SearchItem from "components/patients/searchTool/searchItem";

interface searchForm {
  attribute: string;
  symbol: string;
  text: string;
}

const SearchTool = () => {
  const [searchItems, setSearchItems] = React.useState([0]);
  const [searchForms, setSearchForms] = React.useState([] as searchForm[]);

  const handleFormChange = (
    itemId: number,
    label: string,
    symbol: string,
    inputText: string
  ) => {
    console.log("in search tools : ", itemId, label, symbol, inputText);

    let newSearchForms = [...searchForms];
    const newValue: searchForm = {
      attribute: label,
      symbol: symbol,
      text: inputText
    };
    newSearchForms[itemId] = newValue;
    setSearchForms(newSearchForms);
    //TODO : update setSearchForms
    // setSearchForms(evt.target.value);
  };

  const handleRemove = (id: number) => {
    const index = searchItems.indexOf(id);

    if (index > -1) {
      console.log("removing " + id);
      let copyItems = [...searchItems];
      copyItems.splice(index, 1);
      setSearchItems(copyItems);

      let copyForms = [...searchForms];
      copyForms.splice(index, 1);
      setSearchForms(copyForms);
    }
  };

  const search = () => {
    console.log(searchForms);
  };

  return (
    <>
      <H3>
        <Icon icon={"search-template"} className="icon-title" /> Recherche
      </H3>
      <div className="div-searchItems">
        {searchItems.map(m => (
          <div className="div-searchItem" key={"div-" + m}>
            <SearchItem
              key={m}
              searchItemId={m}
              onFormChange={handleFormChange}
              onRemove={handleRemove}
            />
          </div>
        ))}
        <Button
          className="buttonAdd"
          icon="plus"
          intent="primary"
          onClick={() => {
            setSearchItems([...searchItems, Math.max(...searchItems) + 1]);
            console.log(searchItems);
          }}
        />
      </div>

      <div className="validationButton">
        <Button icon="tick" intent="success" text="Chercher" onClick={search} />
      </div>
    </>
  );
};

export default SearchTool;
