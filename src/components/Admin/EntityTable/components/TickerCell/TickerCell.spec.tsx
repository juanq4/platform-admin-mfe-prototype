import React from "react";
import { CheckMarkCellIdModel } from "..";
import { getAppWrapper } from "../../../../../__mocks__";
import { render, screen } from "../../../../../utils/testUtils";
import { TickerCell } from "./TickerCell.component";
import { TickerCellListId } from "./TickerCell.definition";
import { mapIdToTickerCell } from "./TickerCell.utils";

const mockTickerCellValues = [null, [], ["ART.NYE"]];

function testTickerCell(id: string): void {
  const element = screen.queryByTestId(id);
  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
}

describe("TickerCell Component", () => {
  const idModel = new CheckMarkCellIdModel("MockCheckMarkCellId");

  test("7386712: [Given] no props are provided [Expect] the component should render", () => {
    render(<TickerCell value={null} />, { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434031: [Given] value is 'null' [Expect] the ticker to be 'empty'", () => {
    render(<TickerCell id={idModel.id} value={mockTickerCellValues[0]} />);
    testTickerCell(idModel.id);
  });

  test("7434032: [Given] value is '' [Expect] the ticker to be 'empty'", () => {
    render(<TickerCell id={idModel.id} value={mockTickerCellValues[1]} />);
    testTickerCell(idModel.id);
  });

  test("7434033: [Given] value is 'ART.NYE' [Expect] the ticker to be 'ART'", () => {
    render(<TickerCell id={idModel.id} value={mockTickerCellValues[2]} />);
    testTickerCell(idModel.id);
  });
});

describe("mapIdToTickerCell", () => {
  const listId = new TickerCellListId("MockTickerCell");
  const mockData = { id: "4dec165f-4093-4182-bd72-88754" };

  test("7386713: [Given] the function is passed not no props [Expect] the component should render", () => {
    render(mapIdToTickerCell(null, null), { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434034: [Given] value is 'null' [Expect] the ticker to be 'empty'", () => {
    render(mapIdToTickerCell({ data: { ...mockData }, value: mockTickerCellValues[0] }, listId));
    const id = listId.getId(mockData.id);
    testTickerCell(id);
  });

  test("7434035: [Given] value is '' [Expect] the ticker to be 'empty'", () => {
    render(mapIdToTickerCell({ data: { ...mockData }, value: mockTickerCellValues[1] }, listId));
    const id = listId.getId(mockData.id);
    testTickerCell(id);
  });

  test("7434036: [Given] value is 'ART.NYE' [Expect] the ticker to be 'ART'", () => {
    render(mapIdToTickerCell({ data: { ...mockData }, value: mockTickerCellValues[2] }, listId));
    const id = listId.getId(mockData.id);
    testTickerCell(id);
  });
});
