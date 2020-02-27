export const ROUTE_HOME = "/";
export const ROUTE_PATIENT = "/patient";

export const URL_SERVER = "http://hapi.fhir.org/baseR4/";

/*
  Search options
  Search and types are described in FHIR documentation : https://www.hl7.org/fhir/search.html#ptype
*/

const OPERATION_NUMBER = [">", "<", "=", "≠"];

const OPERATION_TEXT = ["Commence par", "Contient", "Exact"];

const OPERATION_BOOLEAN = ["Oui", "Non"];

export const SEARCH_FIELDS = [
  {
    name: "Logical id",
    operations: OPERATION_TEXT,
    isInputText: true
  },
  {
    name: "Identifier",
    operations: OPERATION_TEXT,
    isInputText: true
  },
  {
    name: "Nom",
    operations: OPERATION_TEXT,
    isInputText: true
  },
  {
    name: "Prénom",
    operations: OPERATION_TEXT,
    isInputText: true
  },
  {
    name: "Age",
    operations: OPERATION_NUMBER,
    isInputText: true
  },
  {
    name: "Antécédent",
    operations: OPERATION_TEXT,
    isInputText: true
  },
  {
    name: "Allergie",
    operations: OPERATION_TEXT,
    isInputText: true
  },
  {
    name: "Dialysé",
    operations: OPERATION_BOOLEAN,
    isInputText: false
  },
  {
    name: "BPCO",
    operations: OPERATION_BOOLEAN,
    isInputText: false
  },
  {
    name: "Diabète",
    operations: OPERATION_BOOLEAN,
    isInputText: false
  }
];
