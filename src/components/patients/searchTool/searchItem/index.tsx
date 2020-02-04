import React from "react";
import { Button, InputGroup, HTMLSelect, FormGroup } from "@blueprintjs/core";
import "./style.css";
import { SEARCH_FIELDS } from "constants/searchFields";
import { OPERATIONS } from "constants/searchFields";

const SearchItem = () => {
  return (
    <div className="searchItem">
      <div className="bp3-card bp3-elevation-3 searchCard">
        <div className="formElement formElement-label">
          <HTMLSelect options={SEARCH_FIELDS} />
        </div>
        <div className="formElement formElement-symbol">
          <HTMLSelect options={OPERATIONS} />
        </div>
        <div className="formElement formElement-input">
          <InputGroup id="text-input" placeholder="Contenu" />
        </div>
      </div>
      <Button className="buttonDelete" icon="minus" intent="primary" />
    </div>
  );
};

export default SearchItem;
