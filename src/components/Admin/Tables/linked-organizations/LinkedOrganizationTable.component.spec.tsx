import React from "react";
import { getAppWrapper, NimbusConfig } from "../../../../__mocks__";
import { render, screen } from "../../../../utils/testUtils";
import { LinkedOrganizationTableIdModel } from "./LinkedOrganizationTable.definition";
import { LinkedOrganizationTable } from "./LinkedOrganizationsTable.component";

describe("Linked organization table Component", () => {
  const idModel = new LinkedOrganizationTableIdModel("mockLinkedOrganizationTable");

  test("7386720: [Given] no props are provided [Expect] the component to render", () => {
    render(
      <NimbusConfig.ConfigProvider>
        <LinkedOrganizationTable
          id={idModel.id}
          items={[]}
          error={new Error("mock error")}
          onError={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NimbusConfig.ConfigProvider>,
      {
        container: getAppWrapper(),
      },
    );
    const rootElement = screen.queryByTestId(idModel.id);
    expect(rootElement).toBeInTheDocument();
  });

  test("7386721: [Given] empty, null or white space id model [Expect] the id be undefined", () => {
    expect(new LinkedOrganizationTableIdModel("").id).toBe(undefined);
    expect(new LinkedOrganizationTableIdModel(" ").id).toBe(undefined);
    expect(new LinkedOrganizationTableIdModel(null).id).toBe(undefined);
  });
});
