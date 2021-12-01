import React from "react";

import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { DateTime } from "luxon";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen } from "common/tests/test-utils";
import { Bundle } from "services/api/api";
import { bundleFactory, patientFactory } from "services/api/factory";

import PatientInfo from "../PatientInfo";
import { getINS, getIPP } from "../utils";

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
  render(<PatientInfo />, undefined, {
    route: `/${patient.id}`,
    path: "/:patientId",
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PatientInfo", () => {
  it("PatientInfo displays", async () => {
    await screen.findByRole("heading", {
      name: new RegExp(
        `${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family}`,
        "i"
      ),
    });
    expect(patient.birthDate).not.toBeUndefined();
    await screen.findByText(
      new RegExp(
        `${DateTime.fromISO(patient.birthDate ?? "").toLocaleString(undefined, {
          locale: navigator.language,
        })}`,
        "i"
      )
    );

    const ipp = getIPP(patient);
    const ins = getINS(patient);

    expect(ipp).not.toBeUndefined();
    expect(ins).not.toBeUndefined();
    await screen.findByText(new RegExp(ipp ?? ""));
    await screen.findByText(new RegExp(ins ?? ""));
  });
});
