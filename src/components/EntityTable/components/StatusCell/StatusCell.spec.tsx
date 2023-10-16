import React from "react";
import { getAppWrapper } from "../../../../__mocks__/utils/wrappers";
import { render, screen } from "../../../../utils/testUtils";
import { CheckMarkCellIdModel } from "../CheckMarkCell/CheckMarkCell.definition";
// import { getAppWrapper } from "../../../../__mocks__";
import { StatusCell } from "./StatusCell.component";
import { StatusCellListId } from "./StatusCell.definition";
import { mapIdToStatusCell } from "./StatusCell.utils";

const mockStatusCellValues = [null, false, true];

function testStatusCopyCell(id: string): void {
  const element = screen.queryByTestId(id);
  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
}

describe("StatusCell Component", () => {
  const idModel = new CheckMarkCellIdModel("MockCheckMarkCellId");

  test("7386710: [Given] no props are provided [Expect] the component should render", () => {
    render(<StatusCell value={null} />, { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434605: [Given] value is 'null' [Expect] the status to be 'Deactivated'", () => {
    render(<StatusCell id={idModel.id} value={mockStatusCellValues[0]} />);
    testStatusCopyCell(idModel.id);
  });

  test("7434606: [Given] value is 'false' [Expect] the status to be 'Deactivated'", () => {
    render(<StatusCell id={idModel.id} value={mockStatusCellValues[1]} />);
    testStatusCopyCell(idModel.id);
  });

  test("7434607: [Given] value is 'true' [Expect] the status to be 'Active'", () => {
    render(<StatusCell id={idModel.id} value={mockStatusCellValues[2]} />);
    testStatusCopyCell(idModel.id);
  });
});

describe("mapIdToStatusCell", () => {
  const listId = new StatusCellListId("MockCheckMarkCell");
  const mockData = { id: "4dec165f-4093-4182-bd72-88754" };

  test("7386711: [Given] the function is passed not no props [Expect] the component should render", () => {
    render(mapIdToStatusCell(null, null), { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434624: [Given] value is 'null' [Expect] the status to be 'Deactivated'", () => {
    render(mapIdToStatusCell({ data: { ...mockData }, value: mockStatusCellValues[0] }, listId));
    const id = listId.getId(mockData.id);
    testStatusCopyCell(id);
  });

  test("7434629: [Given] value is 'false' [Expect] the status to be 'Deactivated'", () => {
    render(mapIdToStatusCell({ data: { ...mockData }, value: mockStatusCellValues[1] }, listId));
    const id = listId.getId(mockData.id);
    testStatusCopyCell(id);
  });

  test("7434642: [Given] value is 'true' [Expect] the status to be 'Active'", () => {
    render(mapIdToStatusCell({ data: { ...mockData }, value: mockStatusCellValues[2] }, listId));
    const id = listId.getId(mockData.id);
    testStatusCopyCell(id);
  });
});
