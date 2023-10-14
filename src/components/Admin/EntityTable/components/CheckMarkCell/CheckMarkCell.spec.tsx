import React from "react";
// import { getAppWrapper } from "../../../../../__mocks__";
import { render, screen } from "../../../../../utils/testUtils";
import { CheckMarkCell } from "./CheckMarkCell.component";
import { CheckMarkCellIdModel, CheckMarkCellListId } from "./CheckMarkCell.definition";
import { mapIdToCheckMarkCell } from "./CheckMarkCell.utils";

function testCheckMarkCell(id: string): void {
  const element = screen.queryByTestId(id);
  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
}

describe("CheckMarkCell Component", () => {
  const idModel = new CheckMarkCellIdModel("MockCheckMarkCellId");

  test("7386008: [Given] no props are provided [Expect] the component should render", () => {
    render(<CheckMarkCell value={null} />, { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434651: [Given] value is 'null' [Expect] the checkmark to not be visible", () => {
    render(<CheckMarkCell id={idModel.id} value={null} />);
    testCheckMarkCell(idModel.id);
  });

  test("7434652: [Given] value is 'true' [Expect] the checkmark to be visible", () => {
    render(<CheckMarkCell id={idModel.id} value={true} />);
    testCheckMarkCell(idModel.id);
  });

  test("7434653: [Given] value is 'false' [Expect] the checkmark to not be visible", () => {
    render(<CheckMarkCell id={idModel.id} value={false} />);
    testCheckMarkCell(idModel.id);
  });
});

describe("mapIdToCheckMarkCell", () => {
  const listId = new CheckMarkCellListId("MockCheckMarkCell");
  const mockData = { id: "4dec165f-4093-4182-bd72-88754" };

  test("7386009: [Given] the function is passed not no props [Expect] the component should render", () => {
    render(mapIdToCheckMarkCell(null, null), { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434654: [Given] value is 'null' [Expect] the checkmark to not be visible", () => {
    render(mapIdToCheckMarkCell({ data: { ...mockData }, value: null }, listId));
    const id = listId.getId(mockData.id);
    testCheckMarkCell(id);
  });

  test("7434655: [Given] value is 'true' [Expect] the checkmark to be visible", () => {
    render(mapIdToCheckMarkCell({ data: { ...mockData }, value: true }, listId));
    const id = listId.getId(mockData.id);
    testCheckMarkCell(id);
  });

  test("7434656: [Given] value is 'false' [Expect] the checkmark to not be visible", () => {
    render(mapIdToCheckMarkCell({ data: { ...mockData }, value: false }, listId));
    const id = listId.getId(mockData.id);
    testCheckMarkCell(id);
  });
});
