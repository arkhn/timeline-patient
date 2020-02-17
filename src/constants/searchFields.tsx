/*
  This file contains all constants describing the search options.
  Search and types are described in FHIR documentation : https://www.hl7.org/fhir/search.html#ptype
*/

const operation_number = [">", "<", "=", "≠"];

const operation_text = ["Commence par", "Contient", "Exact"];

const operation_boolean = ["Oui", "Non"];

export const SEARCH_FIELDS = [
  {
    name: "Nom",
    operations: operation_text,
    isInputText: true
  },
  {
    name: "Prénom",
    operations: operation_text,
    isInputText: true
  },
  {
    name: "Age",
    operations: operation_number,
    isInputText: true
  },
  {
    name: "Antécédent",
    operations: operation_text,
    isInputText: true
  },
  {
    name: "Allergie",
    operations: operation_text,
    isInputText: true
  },
  {
    name: "Dialysé",
    operations: operation_boolean,
    isInputText: false
  },
  {
    name: "BPCO",
    operations: operation_boolean,
    isInputText: false
  },
  {
    name: "Diabète",
    operations: operation_boolean,
    isInputText: false
  }
];
