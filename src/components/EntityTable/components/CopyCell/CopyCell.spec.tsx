import React from "react";
import { NimbusConfig } from "../../../../__mocks__/contexts/NimbusConfig.mock";
import { getAppWrapper } from "../../../../__mocks__/utils/wrappers";
import { render, screen } from "../../../../utils/testUtils";
import { CheckMarkCellIdModel } from "../CheckMarkCell/CheckMarkCell.definition";
import { CopyCell } from "./CopyCell.component";
import { CopyCellListId } from "./CopyCell.definition";
import { mapIdToCopyCell } from "./CopyCell.utils";

const mockData = { id: "4dec165f-4093-4182-bd72-88754" };
const mockCopyCellValues = [null, "", "     ", mockData.id];

function testCopyCell(id: string): void {
  const element = screen.queryByTestId(id);
  expect(element).toBeInTheDocument();
  expect(element).toMatchSnapshot();
}

function renderWithConfigs(element: JSX.Element) {
  return <NimbusConfig.ConfigProvider>{element}</NimbusConfig.ConfigProvider>;
}

describe("CopyCell Component", () => {
  const idModel = new CheckMarkCellIdModel("MockCheckMarkCellId");

  test("7386010: [Given] no props are provided [Expect] the component should render", () => {
    render(renderWithConfigs(<CopyCell value={null} />), { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434643: [Given] value is 'null' [Expect] the checkmark to not be visible", () => {
    render(renderWithConfigs(<CopyCell id={idModel.id} value={mockCopyCellValues[0]} />));
    testCopyCell(idModel.id);
  });

  test("7434644: [Given] value is '' [Expect] the checkmark to not be visible", () => {
    render(renderWithConfigs(<CopyCell id={idModel.id} value={mockCopyCellValues[1]} />));
    testCopyCell(idModel.id);
  });

  test("7434645: [Given] value is '     ' [Expect] the checkmark to be visible", () => {
    render(renderWithConfigs(<CopyCell id={idModel.id} value={mockCopyCellValues[2]} />));
    testCopyCell(idModel.id);
  });

  test("7434646: Given] value is '4dec165f-4093-4182-bd72-88754' [Expect] the checkmark to be visible", () => {
    render(renderWithConfigs(<CopyCell id={idModel.id} value={mockCopyCellValues[3]} />));
    testCopyCell(idModel.id);
  });
});

describe("mapIdToCopyCell", () => {
  const listId = new CopyCellListId("MockCheckMarkCell");

  test("7386011: [Given] the function is passed not no props [Expect] the component should render", () => {
    render(renderWithConfigs(mapIdToCopyCell(null, null)), { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("7434647: [Given] value is 'null' [Expect] the checkmark to not be visible", () => {
    render(renderWithConfigs(mapIdToCopyCell({ data: { ...mockData }, value: mockCopyCellValues[0] }, listId)));
    const id = listId.getId(mockData.id);
    testCopyCell(id);
  });

  test("7434648: [Given] value is '' [Expect] the checkmark to not be visible", () => {
    render(renderWithConfigs(mapIdToCopyCell({ data: { ...mockData }, value: mockCopyCellValues[1] }, listId)));
    const id = listId.getId(mockData.id);
    testCopyCell(id);
  });

  test("7434649: [Given] value is '     ' [Expect] the checkmark to be visible", () => {
    render(renderWithConfigs(mapIdToCopyCell({ data: { ...mockData }, value: mockCopyCellValues[2] }, listId)));
    const id = listId.getId(mockData.id);
    testCopyCell(id);
  });

  test("7434650: [Given] value is '4dec165f-4093-4182-bd72-88754' [Expect] the checkmark to be visible", () => {
    render(renderWithConfigs(mapIdToCopyCell({ data: { ...mockData }, value: mockCopyCellValues[3] }, listId)));
    const id = listId.getId(mockData.id);
    testCopyCell(id);
  });
});
