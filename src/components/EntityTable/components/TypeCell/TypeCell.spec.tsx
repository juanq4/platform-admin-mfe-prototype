import { OrganizationType } from "@q4/platform-definitions";
import React from "react";
import { render, screen } from "../../../../utils/testUtils";
import { TypeCellIdModel, TypeCellListId } from "../TypeCell/TypeCell.definition";
// import { getAppWrapper } from "../../../../__mocks__";
import { TypeCell } from "./TypeCell.component";
import { mapIdToTypeCell } from "./TypeCell.utils";

const mockTypeCellValues = [null, OrganizationType.AGENCY, OrganizationType.CORP, OrganizationType.ADMIN];

function testTypeCell(id: string): void {
  const element = screen.queryByTestId(id);
  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
}

describe("TypeCell Component", () => {
  const idModel = new TypeCellIdModel("TypeCell");

  test("7386714: [Given] no props are provided [Expect] the component should render", () => {
    render(<TypeCell value={null} />, { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("4754437: [Given] I'm a user of the organizations admin view[When] the organization has a type of ‘Agency’ [Then] I can see the word ‘Agency’ listed under the “Type” column", () => {
    render(<TypeCell id={idModel.id} value={OrganizationType.AGENCY} />);
    testTypeCell(idModel.id);
  });

  test("4754438: [Given] I'm a user of the organizations admin view [When] the organization has a type of “Corporate”[Then] I can see the word “Corporate” listed under the “Type” column", () => {
    render(<TypeCell id={idModel.id} value={OrganizationType.CORP} />);
    testTypeCell(idModel.id);
  });

  test("4754439: [Given] I'm a user of the organizations admin view [When] the organization in that row does not have a type [Then] I can see the word “Corporate” listed under the “Type” column", () => {
    render(<TypeCell id={idModel.id} value={null} />);
    testTypeCell(idModel.id);
  });
});

describe("mapIdToTypeCell", () => {
  const listId = new TypeCellListId("MockCell");
  const mockData = { id: "4dec165f-4093-4182-bd72-88754" };

  test("7386715: [Given] the function is passed not no props [Expect] the component should render", () => {
    render(mapIdToTypeCell(null, null), { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434028: [Given] value is 'null' [Expect] the status to be 'Corporate'", () => {
    render(mapIdToTypeCell({ data: { ...mockData }, value: mockTypeCellValues[0] }, listId));
    const id = listId.getId(mockData.id);
    testTypeCell(id);
  });

  test("7434029: [Given] value is 'agency' [Expect] the status to be 'Agency'", () => {
    render(mapIdToTypeCell({ data: { ...mockData }, value: mockTypeCellValues[1] }, listId));
    const id = listId.getId(mockData.id);
    testTypeCell(id);
  });

  test("7434030: [Given] value is 'corporate' [Expect] the status to be 'Corporate'", () => {
    render(mapIdToTypeCell({ data: { ...mockData }, value: mockTypeCellValues[2] }, listId));
    const id = listId.getId(mockData.id);
    testTypeCell(id);
  });
});
