export interface Patient {
  /* logical id of the Patient resource */
  id: string;
  /* patient identifier(s) (ex: NIP) */
  identifier?: string;
  /* patient first name */
  firstName?: string;
  /* patient last name */
  lastName?: string;
  /* patient age name */
  age?: number;
  /* patient birth date */
  birthDate?: string;

  /* list of allergy intolerance resources linked to this patient*/
  allergyIntolerances?: any;
  /* list of condition resources linked to this patient*/
  conditions?: any;
  /* list of observation resources linked to this patient*/
  observations?: any;
  /* list of episode of care resources linked to this patient*/
  episodesOfCare?: any;
}

export interface Bundle {
  /* list of entries */
  entry: any[];
  /* total number of patients matching the criteria */
  total?: number;

  /* parameters leading to this request */
  parameters?: any;

  /* link to get more entries */
  nextLink?: string;
}

export interface PatientBundle extends Bundle {
  patients: Patient[];
}
