import React from "react";
import { InputGroup } from "@blueprintjs/core";

import "./style.css";

interface Props {
  launchSearch: Function;
  setNameSearch: Function;
}

const SearchName = ({ launchSearch, setNameSearch }: Props) => {
  /*
    onFormChange updates the searchItem object with current label, symbol and inputText.
  */

  const enterPressed = (event: any) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //enter keycode
      launchSearch();
    }
  };

  return (
    <div className="searchItem searchCard">
      <div className="nameItem">
        <InputGroup
          placeholder="Recherche par nom ou identifiant"
          onChange={(evt: any) => {
            setNameSearch(evt.target.value);
          }}
          onKeyPress={enterPressed}
        />
      </div>
    </div>
  );
};

export default SearchName;
