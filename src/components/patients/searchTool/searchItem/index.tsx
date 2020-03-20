import React from "react";
import {
  Button,
  InputGroup,
  Card,
  Elevation,
  HTMLSelect
} from "@blueprintjs/core";
import { SEARCH_FIELDS } from "../../../../constants";

import "./style.css";

interface Props {
  onRemove: Function;
  searchItem: any;
  launchSearch: Function;
}

const SearchItem = ({ searchItem, onRemove, launchSearch }: Props) => {
  const [label, setLabel] = React.useState(SEARCH_FIELDS[0].name);
  const [symbol, setSymbol] = React.useState(SEARCH_FIELDS[0].operations[0]);
  const [inputText, setInputText] = React.useState("");

  /*
    Symbol list depends on the selected label
   */
  const [symbols, setSymbols] = React.useState<string[]>(
    SEARCH_FIELDS[0].operations
  );

  const names = SEARCH_FIELDS.map(x => x.name);

  /*
    Classes are modified depending on the necessity of having an input box or not.
  */
  const [classLabel, setClassLabel] = React.useState("formElement-label");
  const [classSymbol, setClassSymbol] = React.useState("formElement-symbol");
  const [classInput, setClassInput] = React.useState("formElement-input");

  /*
    onFormChange updates the searchItem object with current label, symbol and inputText.
  */
  const onFormChange = (label: string, symbol: string, inputText: string) => {
    searchItem.label = label;
    searchItem.symbol = symbol;
    searchItem.text = inputText;
  };

  /*
    Updating the searchItem container according to the chosen label.
  */
  const onLabelChange = (evt: any) => {
    setLabel(evt.target.value);
    /*
      We may want to set the input text as empty when we change the label field ?
      setInputText("");
    */
    let newSymbolList = SEARCH_FIELDS[evt.target.selectedIndex].operations;

    if (newSymbolList !== symbols) {
      // In the case the new label doesn't have the same symbol list, we have to update the new HTMLSelect symbol
      setSymbols(newSymbolList);
      setSymbol(newSymbolList[0]);
      onFormChange(evt.target.value, newSymbolList[0], inputText);
    } else {
      onFormChange(evt.target.value, symbol, inputText);
    }

    // Updating formElement classes depending on the selected label
    if (SEARCH_FIELDS[evt.target.selectedIndex].isInputText) {
      setClassInput("formElement-input");
      setClassSymbol("formElement-symbol");
      setClassLabel("formElement-label");
    } else {
      setClassInput("formElement-input-invisible");
      setClassSymbol("formElement-wo-input-symbol");
      setClassLabel("formElement-wo-input-label");
    }
  };

  const enterPressed = (event: any) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //enter keycode
      launchSearch();
    }
  };

  return (
    <div className="searchItem">
      <Card elevation={Elevation.TWO} className="searchCard">
        <div className={classLabel}>
          <HTMLSelect
            className="bp3-fill"
            options={names}
            onChange={evt => onLabelChange(evt)}
          />
        </div>
        <div className={classSymbol}>
          <HTMLSelect
            className="bp3-fill"
            options={symbols}
            onChange={(evt: any) => {
              setSymbol(evt.target.value);
              onFormChange(label, evt.target.value, inputText);
              searchItem.label = label;
              searchItem.symbol = evt.target.value;
              searchItem.inputText = inputText;
            }}
          />
        </div>
        <div className={classInput}>
          <InputGroup
            placeholder="Rechercher sur la base FHIR"
            value={inputText}
            onChange={(evt: any) => {
              setInputText(evt.target.value);
              onFormChange(label, symbol, evt.target.value);
            }}
            onKeyPress={enterPressed}
          />
        </div>
      </Card>
      <Button
        className="buttonDelete bp3-small bp3-minimal"
        icon="small-cross"
        intent="primary"
        onClick={(evt: any) => {
          onRemove(searchItem);
        }}
      />
    </div>
  );
};

export default SearchItem;
