import React from "react";
import { InputGroup } from "@blueprintjs/core";

import "./style.css";

interface Props {
  nameSearch: any;
  launchSearch: Function;
}

const SearchName = ({ nameSearch, launchSearch }: Props) => {
  const [inputText, setInputText] = React.useState("");

  /*
    onFormChange updates the searchItem object with current label, symbol and inputText.
  */
  const onFormChange = (inputText: string) => {
    nameSearch.text = inputText;
  };

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
          value={inputText}
          onChange={(evt: any) => {
            setInputText(evt.target.value);
            onFormChange(evt.target.value);
          }}
          onKeyPress={enterPressed}
        />
      </div>
    </div>
  );
};

export default SearchName;
