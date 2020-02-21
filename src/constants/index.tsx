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

export const DATA_TEST = [
  {
    firstName: "Martin",
    lastName: "Perrier",
    id: "1",
    age: 5,
    medicalHistory: "Trisomie 21",
    allergies: "Non"
  },
  {
    firstName: "Bernard",
    lastName: "Lebrun",
    id: "2",
    age: 63,
    medicalHistory: "Non",
    allergies: "Graminées, pénicilline"
  },
  {
    firstName: "Thomas",
    lastName: "Besson",
    id: "3",
    age: 56,
    medicalHistory: "Non",
    allergies: "Non"
  },
  {
    firstName: "Laurent",
    lastName: "Perrot",
    id: "4",
    age: 36,
    medicalHistory: "Fracture de la hanche",
    allergies: "Non"
  },
  {
    firstName: "Jean",
    lastName: "Dupont",
    id: "5",
    age: 17,
    medicalHistory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    allergies:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  {
    firstName: "Simon",
    lastName: "Langlois",
    id: "6",
    age: 96,
    medicalHistory: "Diabète de type 2, AVC",
    allergies: "Non"
  }
];
/*
      Todo : test with long names
  */
