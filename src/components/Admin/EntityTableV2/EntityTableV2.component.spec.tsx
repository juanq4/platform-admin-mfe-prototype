import React from "react";
import { fireEvent, render, screen } from "../../../utils/testUtils";
import { EntityTableV2 } from "./EntityTableV2.component";

describe("EntityTableV2", () => {
  test("11226015: [When] total pages is zero [Then] it shows empty state component", () => {
    render(
      <EntityTableV2
        id="id"
        tableProps={{ columnDefs: [], loading: false, rowData: [] }}
        totalPages={1}
        totalItems={0}
        currentPage={1}
        loading={false}
        showError={false}
        toolbarComponent={<div>Toolbar</div>}
        emptyStateComponent={<div>Empty</div>}
        errorStateComponent={<div>Error</div>}
        handlePageChange={jest.fn()}
      />,
    );
    expect(screen.queryByText("Empty")).toBeVisible();
  });

  test("11226016: [When] show error is true [Then] it shows error state component", () => {
    render(
      <EntityTableV2
        id="id"
        tableProps={{ columnDefs: [], loading: false, rowData: [] }}
        totalPages={2}
        totalItems={20}
        currentPage={1}
        showError={true}
        loading={false}
        toolbarComponent={<div>Toolbar</div>}
        emptyStateComponent={<div>Empty</div>}
        errorStateComponent={<div>Error</div>}
        handlePageChange={jest.fn()}
      />,
    );
    expect(screen.queryByText("Error")).toBeVisible();
  });

  test("11226017: [When] toolbar component is provided [Then] it shows toolbar component", () => {
    render(
      <EntityTableV2
        id="id"
        tableProps={{ columnDefs: [], loading: false, rowData: [] }}
        totalPages={1}
        totalItems={0}
        currentPage={1}
        showError={false}
        loading={false}
        toolbarComponent={<div>Toolbar</div>}
        emptyStateComponent={<div>Empty</div>}
        errorStateComponent={<div>Error</div>}
        handlePageChange={jest.fn()}
      />,
    );
    expect(screen.queryByText("Toolbar")).toBeVisible();
  });

  test("11226018: [When] total pages is larger than 1 [Then] it shows pagination [And] pagination button triggers page change action", () => {
    const mockHandlePageChange = jest.fn();
    const data = Array(10)
      .fill(null)
      .map((_, idx) => ({ id: idx, email: `test-${idx}@test.com`, name: `name-${idx}` }));
    render(
      <EntityTableV2
        id="id"
        tableProps={{
          columnDefs: [
            { field: "email", headerName: "Email" },
            { field: "name", headerName: "Name" },
          ],
          loading: false,
          rowData: data,
        }}
        totalPages={2}
        totalItems={20}
        currentPage={1}
        loading={false}
        showError={false}
        toolbarComponent={<div>Toolbar</div>}
        emptyStateComponent={<div>Empty</div>}
        errorStateComponent={<div>Error</div>}
        handlePageChange={mockHandlePageChange}
      />,
    );
    expect(screen.queryByLabelText("Next page")).toBeVisible();
    fireEvent.click(screen.getByLabelText("Next page"));
    expect(mockHandlePageChange).toHaveBeenCalledWith(2);
  });
});
