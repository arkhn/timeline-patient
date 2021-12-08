import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { DateTime } from "luxon";

export const sortResourcesByDate = (
  resource1: IResourceList,
  resource2: IResourceList
): number => {
  let date1: DateTime | null = null;
  let date2: DateTime | null = null;

  switch (resource1.resourceType) {
    case "Condition":
      date1 = DateTime.fromISO(resource1.onsetDateTime ?? "");
      break;
    case "Encounter":
    case "CarePlan":
      date1 = DateTime.fromISO(resource1.period?.start ?? "");
      break;
    case "DocumentReference":
      date1 = DateTime.fromISO(resource1.date ?? "");
      break;

    default:
      break;
  }
  switch (resource2.resourceType) {
    case "Condition":
      date2 = DateTime.fromISO(resource2.onsetDateTime ?? "");
      break;
    case "Encounter":
    case "CarePlan":
      date2 = DateTime.fromISO(resource2.period?.start ?? "");
      break;
    case "DocumentReference":
      date2 = DateTime.fromISO(resource2.date ?? "");
      break;

    default:
      break;
  }

  if (date1 && date2) {
    return date1 < date2 ? 1 : -1;
  }
  return 0;
};
