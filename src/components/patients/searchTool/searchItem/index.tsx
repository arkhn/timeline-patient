import React from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import { SEARCH_FIELDS } from "constants/searchFields";

import "./style.css";

interface Props {
  onFormChange: Function;
  onRemove: Function;
  searchItemId: number;
}

const SearchItem = ({ onFormChange, onRemove, searchItemId }: Props) => {
  const [label, setLabel] = React.useState(SEARCH_FIELDS[0].name);
  const [symbol, setSymbol] = React.useState(SEARCH_FIELDS[0].operations[0]);
  const [inputText, setInputText] = React.useState("");

  const [operations, setOperations] = React.useState<string[]>(
    SEARCH_FIELDS[0].operations
  );

  const names = SEARCH_FIELDS.map(x => x.name);

  const [classLabel, setClassLabel] = React.useState("formElement-label");
  const [classSymbol, setClassSymbol] = React.useState("formElement-symbol");
  const [classInput, setClassInput] = React.useState("formElement-input");
  const renderSelectOptions = (attribute: string[]) => {
    return attribute.map(attr => (
      <option value={attr} key={attr}>
        {attr}
      </option>
    ));
  };
  return (
    <div className="searchItem">
      <div className="bp3-card bp3-elevation-3 searchCard">
        <div className={classLabel}>
          <div className="bp3-select bp3-fill">
            <select
              onChange={evt => {
                setLabel(evt.target.value);
                let newOperationList =
                  SEARCH_FIELDS[evt.target.selectedIndex].operations;

                if (newOperationList !== operations) {
                  setOperations(newOperationList);
                  setSymbol(evt.target.value);
                  onFormChange(
                    searchItemId,
                    evt.target.value,
                    newOperationList[0],
                    inputText
                  );
                } else {
                  onFormChange(
                    searchItemId,
                    evt.target.value,
                    symbol,
                    inputText
                  );
                }
                if (SEARCH_FIELDS[evt.target.selectedIndex].isInputText) {
                  setClassInput("formElement-input");
                  setClassSymbol("formElement-symbol");
                  setClassLabel("formElement-label");
                } else {
                  setClassInput("formElement-input-invisible");
                  setClassSymbol("formElement-wo-input-symbol");
                  setClassLabel("formElement-wo-input-label");
                }
              }}
            >
              {renderSelectOptions(names)}
            </select>
          </div>
        </div>
        <div className={classSymbol}>
          <div className="bp3-select bp3-fill">
            <select
              onChange={evt => {
                setSymbol(evt.target.value);
                onFormChange(searchItemId, label, evt.target.value, inputText);
              }}
            >
              {renderSelectOptions(operations)}
            </select>
          </div>
        </div>
        <div className={classInput}>
          <InputGroup
            placeholder="Rechercher sur la base FHIR"
            onChange={(evt: any) => {
              setInputText(evt.target.value);
              onFormChange(searchItemId, label, symbol, evt.target.value);
            }}
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
