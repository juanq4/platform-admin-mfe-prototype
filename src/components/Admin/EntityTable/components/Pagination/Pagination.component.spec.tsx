import React from "react";
import { fireEvent, render, screen } from "../../../../../utils/testUtils";
import { EntityTablePagination } from "./Pagination.component";
import type { EntityTablePaginationProps } from "./Pagination.definition";
import { EntityTablePaginationDirection, EntityTablePaginationIdModel } from "./Pagination.definition";

describe("EntityTablePagination", () => {
  const idModel = new EntityTablePaginationIdModel("mockPaginationId");

  const props: EntityTablePaginationProps = { id: idModel.id, page: 1, pageCount: 2, onPageChange: jest.fn() };

  it("7386013: renders without props", () => {
    render(<EntityTablePagination page={null} pageCount={null} onPageChange={null} />);
  });

  test("1271116: [Given] page is 1 [When] the user clicks Next [Expect] page to change to 2", () => {
    render(<EntityTablePagination {...props} page={1} />);

    const nextButton = screen.getByTestId(idModel.next.id);
    fireEvent.click(nextButton);
    expect(props.onPageChange).toBeCalledWith(2, EntityTablePaginationDirection.Next);
  });

  test("1271117: [Given] page is 2 [When] the user clicks Next [Expect] the button to be disabled [And] the page not to change", () => {
    render(<EntityTablePagination {...props} page={2} />);

    const nextButton = screen.getByTestId(idModel.next.id);
    expect(nextButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(props.onPageChange).toBeCalledTimes(0);
  });

  test("1271118: [Given] page is 2 [When] the user clicks Previous [Expect] page to change to 1", () => {
    render(<EntityTablePagination {...props} page={2} />);

    const nextButton = screen.getByTestId(idModel.previous.id);
    fireEvent.click(nextButton);
    expect(props.onPageChange).toBeCalledWith(1, EntityTablePaginationDirection.Previous);
  });

  test("1271119: [Given] page is 1 [When] the user clicks Previous [Expect] the button to be disabled [And] the page not to change", () => {
    render(<EntityTablePagination {...props} page={1} />);

    const nextButton = screen.getByTestId(idModel.previous.id);
    expect(nextButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(props.onPageChange).toBeCalledTimes(0);
  });
});
