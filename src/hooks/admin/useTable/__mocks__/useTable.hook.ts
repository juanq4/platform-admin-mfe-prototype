import { useTable } from "../useTable.hook";

const mockHandleGridReady = jest.fn();

jest.mock("../useTable.hook", () => ({
  useTable: () => ({ handleGridReady: mockHandleGridReady }),
}));

export { useTable };
