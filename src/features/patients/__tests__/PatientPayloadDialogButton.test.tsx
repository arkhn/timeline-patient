import React from "react";

import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen } from "common/tests/test-utils";
import { Bundle } from "services/api/api";
import { bundleFactory, patientFactory } from "services/api/factory";

import PatientPayloadDialogButton from "../PatientPayloadDialogButton";

const patient = patientFactory.build();
const patientBundle = bundleFactory<IPatient>().build(
  {},
  { transient: { resources: [patient] } }
);

const handlers = [
  rest.get("http://example.com/Patient", (_, res, ctx) =>
    res(ctx.json<Bundle<IPatient>>(patientBundle))
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
beforeEach(() =>
  render(<PatientPayloadDialogButton />, undefined, {
    route: `/${patient.id}`,
    path: "/:patientId",
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PatientPayloadDialogButton", () => {
  it("Shows dialog", async () => {
    const dialogButton = await screen.findByRole("button", {
      name: /show patient resource/i,
    });

    // Click on button
    userEvent.click(dialogButton);

    // Dialog is shown with patient payload displayed
    await screen.findByRole("dialog");
    await screen.findByTestId(`patient-payload-${patient.id}`);
  });
});
