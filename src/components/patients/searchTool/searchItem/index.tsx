import React from "react";
import { Button, InputGroup, HTMLSelect } from "@blueprintjs/core";
import { SEARCH_FIELDS, OPERATIONS } from "constants/searchFields";
import "./style.css";

interface Props {
  onFormChange: Function;
  onRemove: Function;
  searchItemId: number;
}

const SearchItem = ({ onFormChange, onRemove, searchItemId }: Props) => {
  const [label, setLabel] = React.useState(SEARCH_FIELDS[0]);
  const [symbol, setSymbol] = React.useState(OPERATIONS[0]);
  const [inputText, setInputText] = React.useState("");

  React.useEffect(() => {
    onFormChange(searchItemId, label, symbol, inputText);
  }, [label, symbol, inputText]);
  return (
    <div className="searchItem">
      <div className="bp3-card bp3-elevation-3 searchCard">
        <div className="formElement formElement-label">
          <HTMLSelect
            options={SEARCH_FIELDS}
            onChange={evt => setLabel(evt.target.value)}
          />
        </div>
        <div className="formElement formElement-symbol">
          <HTMLSelect
            options={OPERATIONS}
            onChange={evt => setSymbol(evt.target.value)}
          />
        </div>
        <div className="formElement formElement-input">
          <InputGroup
            placeholder="Contenu"
            onChange={(evt: any) => setInputText(evt.target.value)}
          />
        </div>
      </div>
      <Button
        className="buttonDelete bp3-small bp3-minimal"
        icon="minus"
        intent="primary"
        onClick={(evt: any) => {
          onRemove(searchItemId);
        }}
      />
    </div>
  );
};

export default SearchItem;
