export interface Patient {
  id: string;
  identifier?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  medicalHistory?: string;
  allergies?: string;
  allergiesNumber?: number;
  observationsNumber?: number;
  conditionsNumber?: number;
}
