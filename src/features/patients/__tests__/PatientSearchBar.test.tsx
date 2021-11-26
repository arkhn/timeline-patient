import React from "react";

import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen } from "common/tests/test-utils";
import { Bundle } from "services/api/api";
import { bundleFactory, patientFactory } from "services/api/factory";

import PatientSearchBar from "../PatientSearchBar";

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

const onChange = jest.fn();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
beforeEach(() =>
  render(<PatientSearchBar onChange={onChange} />, undefined, {
    path: "/",
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PatientSearchBar", () => {
  it("SearchBar displays", async () => {
    await screen.findByPlaceholderText(/search patient/i);
  });

  it("Execute patient search", async () => {
    const searchBar = await screen.findByPlaceholderText(/search patient/i);

    // Type patient name
    userEvent.type(searchBar, patient.name?.[0]?.family?.[0] ?? "");

    // Expect pop-up to be shown
    await screen.findByRole("option");

    // Should see patient and click on it
    userEvent.click(
      await screen.findByRole("option", {
        name: new RegExp(`${patient.name?.[0]?.family}`),
      })
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual(patient);
  });
});
