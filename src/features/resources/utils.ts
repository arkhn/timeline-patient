import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { DateTime } from "luxon";

export const getResourceDateOrPeriod = (
  resource: IResourceList
): string | { start: string; end: string } | undefined => {
  let start: string | undefined;
  let end: string | undefined;
  switch (resource.resourceType) {
    case "AdverseEvent":
    case "DocumentReference":
    case "FamilyMemberHistory":
      start = resource.date;
      break;
    case "AllergyIntolerance":
    case "Condition":
      if (resource.onsetPeriod) {
        start = resource.onsetPeriod.start;
        end = resource.onsetPeriod.end;
      } else {
        start = resource.onsetDateTime;
      }
      break;
    case "CarePlan":
    case "Encounter":
    case "EpisodeOfCare":
    case "Flag":
      start = resource.period?.start;
      end = resource.period?.end;
      break;
    case "ClinicalImpression":
    case "DiagnosticReport":
    case "MedicationAdministration":
    case "MedicationStatement":
    case "Observation":
      if (resource.effectivePeriod) {
        start = resource.effectivePeriod.start;
        end = resource.effectivePeriod.end;
      } else {
        start = resource.effectiveDateTime;
      }
      break;
    case "Consent":
      start = resource.dateTime;
      break;
    case "DetectedIssue":
      start = resource.identifiedDateTime;
      break;
    case "DeviceRequest":
    case "MedicationRequest":
    case "ServiceRequest":
      start = resource.authoredOn;
      break;
    case "Immunization":
      start = resource.occurrenceDateTime;
      break;
    case "RiskAssessment":
      if (resource.occurrencePeriod) {
        start = resource.occurrencePeriod.start;
        end = resource.occurrencePeriod.end;
      } else {
        start = resource.occurrenceDateTime;
      }
      break;
    case "Media":
      if (resource.createdPeriod) {
        start = resource.createdPeriod.start;
        end = resource.createdPeriod.end;
      } else {
        start = resource.createdDateTime;
      }
      break;
    case "MedicationDispense":
      start = resource.whenHandedOver;
      break;
    case "Procedure":
      if (resource.performedPeriod) {
        start = resource.performedPeriod.start;
        end = resource.performedPeriod.end;
      } else {
        start = resource.performedDateTime;
      }
      break;
    case "QuestionnaireResponse":
      start = resource.authored;
      break;
    case "Specimen":
      if (resource.collection?.collectedPeriod) {
        start = resource.collection?.collectedPeriod.start;
        end = resource.collection?.collectedPeriod.end;
      } else {
        start = resource.collection?.collectedDateTime;
      }
      break;

    default:
      break;
  }

  return start && end ? { start, end } : start;
};

export const sortResourcesByDate = (
  resource1: IResourceList,
  resource2: IResourceList
): number => {
  let date1: DateTime | undefined;
  let date2: DateTime | undefined;

  const dateOrPeriod1 = getResourceDateOrPeriod(resource1);
  const dateOrPeriod2 = getResourceDateOrPeriod(resource2);

  if (typeof dateOrPeriod1 === "string") {
    date1 = DateTime.fromISO(dateOrPeriod1);
  } else if (typeof dateOrPeriod1 === "object") {
    date1 = DateTime.fromISO(dateOrPeriod1.start);
  }

  if (typeof dateOrPeriod2 === "string") {
    date2 = DateTime.fromISO(dateOrPeriod2);
  } else if (typeof dateOrPeriod2 === "object") {
    date2 = DateTime.fromISO(dateOrPeriod2.start);
  }

  if (date1 && date2) {
    return date1 < date2 ? 1 : -1;
  }
  return 0;
};
