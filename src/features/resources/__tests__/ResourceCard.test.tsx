import React from "react";

import userEvent from "@testing-library/user-event";
import { DateTime } from "luxon";

import { render, screen } from "common/tests/test-utils";
import { TERMINOLOGY_SYSTEM_URL } from "models/constants";
import {
  carePlanFactory,
  conditionFactory,
  encounterFactory,
} from "services/api/factory";

import ResourceCard from "../ResourceCard";

const condition = conditionFactory.build();
const encounter = encounterFactory.build();
const carePlan = carePlanFactory.build();

describe("ResourceCard", () => {
  it("Displays ConditionCard", async () => {
    render(<ResourceCard resource={condition} />);

    await screen.findByText(new RegExp(`^${condition.resourceType}$`, "i"));

    await screen.findByText(
      new RegExp(`${condition.code?.coding?.[0]?.display}`, "i")
    );
    await screen.findByText(
      new RegExp(`${condition.code?.coding?.[0]?.system}`, "i")
    );
    await screen.findByText(
      new RegExp(`${condition.code?.coding?.[0]?.code}`, "i")
    );

    expect(condition.onsetDateTime).not.toBeUndefined();
    await screen.findByText(
      new RegExp(
        `${DateTime.fromISO(condition.onsetDateTime ?? "").toLocaleString(
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          { locale: navigator.language }
        )}`,
        "i"
      )
    );

    const tagValue = condition.meta?.tag?.find(
      ({ system }) => system === TERMINOLOGY_SYSTEM_URL
    );
    expect(tagValue).not.toBeUndefined();
    await screen.findByText(new RegExp(`${tagValue?.display}`, "i"));

    const expandButton = await screen.findByTestId(
      `expand-button-${condition.id}`
    );
    userEvent.click(expandButton);

    await screen.findByTestId(`expand-text-${condition.id}`);
  });

  it("Displays EncounterCard", async () => {
    render(<ResourceCard resource={encounter} />);
    await screen.findByText(new RegExp(`^${encounter.resourceType}$`, "i"));

    await screen.findByText(
      new RegExp(`${encounter.location?.[0]?.location?.display}`, "i")
    );

    expect(encounter.period?.start).not.toBeUndefined();
    await screen.findByText(
      new RegExp(
        `${DateTime.fromISO(encounter.period?.start ?? "").toLocaleString(
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          {
            locale: navigator.language,
          }
        )}`,
        "i"
      )
    );

    expect(encounter.period?.end).not.toBeUndefined();
    await screen.findByText(
      new RegExp(
        `${DateTime.fromISO(encounter.period?.end ?? "").toLocaleString(
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          {
            locale: navigator.language,
          }
        )}`,
        "i"
      )
    );

    const tagValue = encounter.meta?.tag?.find(
      ({ system }) => system === TERMINOLOGY_SYSTEM_URL
    );
    expect(tagValue).not.toBeUndefined();
    await screen.findByText(new RegExp(`${tagValue?.display}`, "i"));

    const expandButton = await screen.findByTestId(
      `expand-button-${encounter.id}`
    );
    userEvent.click(expandButton);

    await screen.findByTestId(`expand-text-${encounter.id}`);
  });

  it("Displays Default card", async () => {
    render(<ResourceCard resource={carePlan} />);
    await screen.findByText(new RegExp(`^${carePlan.resourceType}$`, "i"));

    const expandButton = await screen.findByTestId(
      `expand-button-${carePlan.id}`
    );
    userEvent.click(expandButton);

    await screen.findByTestId(`expand-text-${carePlan.id}`);
  });
});
