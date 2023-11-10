import { ButtonIdModel, ButtonTheme } from "@q4/nimbus-ui";
import React from "react";
import { NimbusConfig } from "../../__mocks__/contexts/NimbusConfig.mock";
import { MockOrganizations } from "../../__mocks__/data/organizations.mock";
import { getAppWrapper } from "../../__mocks__/utils/wrappers";
import AddUserImage from "../../assets/icons/addUserImage.svg";
import type { Organization } from "../../definitions/organization.definition";
import { fireEvent, render, screen } from "../../utils/testUtils";
import { EntityTable } from "./EntityTable.component";
import { EntityTableIdModel } from "./EntityTable.definition";
import type { EntityTableProps } from "./EntityTable.definition";
import { EntityTablePaginationDirection } from "./components/Pagination/Pagination.definition";

describe("AdminEntityTable Component", () => {
  const idModel = new EntityTableIdModel("MockId");
  const [last] = MockOrganizations.slice(-1);
  const lastPageRef = [last.id];

  const nullProps: EntityTableProps<Organization> = {
    items: null,
    error: null,
    onError: null,
    title: null,
  };

  const mockProps: EntityTableProps<Organization> = {
    id: idModel.id,
    items: MockOrganizations,
    page: 1,
    pageRefs: [lastPageRef],
    onPageChange: jest.fn(),
    loading: false,
    error: null,
    onError: jest.fn(),
    title: "Mock Title",
  };

  function renderWithConfigs(props: EntityTableProps<Organization>) {
    return (
      <NimbusConfig.ConfigProvider>
        <EntityTable {...props} />
      </NimbusConfig.ConfigProvider>
    );
  }

  test("7386005: [Given] no props are provided [Expect] the component to render", () => {
    render(<EntityTable {...nullProps} />, { container: getAppWrapper() });
    const element = screen.queryByTestId("root");
    expect(element).toMatchSnapshot();
  });

  test("1271120: [Given] toolbarActions are provided [Expect] the buttons to render", () => {
    const onClick = jest.fn();
    const onClickDisabled = jest.fn();
    const mockButtonActive = new ButtonIdModel("mockButtonActive");
    const mockButtonDisabled = new ButtonIdModel("mockButtonDisabled");

    const testProps = {
      ...mockProps,
      title: "Toolbar Actions Test",
      toolbarActions: [
        {
          key: "This button has a key",
          label: "Button with key",
        },
        {
          id: mockButtonActive.id,
          label: "Button with onClick handler",
          onClick,
        },
        {
          id: mockButtonDisabled.id,
          disabled: true,
          label: "Button is disabled",
          onClick: onClickDisabled,
        },
      ],
    };

    const { rerender } = render(renderWithConfigs({ ...testProps, loading: true }));

    const element = screen.getByTestId(idModel.id);
    const button = screen.getByTestId(mockButtonActive.id);
    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(0);

    const buttonDisabled = screen.getByTestId(mockButtonDisabled.id);
    fireEvent.click(buttonDisabled);
    expect(onClickDisabled).toBeCalledTimes(0);

    rerender(renderWithConfigs(testProps));
    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(1);

    fireEvent.click(buttonDisabled);
    expect(onClickDisabled).toBeCalledTimes(0);

    expect(element).toMatchSnapshot();
  });

  test("1271121: [Given] there are no items [And] there is an error [Expect] the Error placeholder to be rendered [And] the Refresh button to work", () => {
    const testProps = {
      ...mockProps,
      loading: false,
      error: new Error("mock error"),
      items: [] as Organization[],
      pageRefs: null as unknown as string[][],
    };
    const { rerender } = render(renderWithConfigs(testProps));

    const element = screen.queryByTestId(idModel.id);
    expect(element).toMatchSnapshot();

    const onErrorButton = screen.queryByTestId(idModel.onError.id);
    fireEvent.click(onErrorButton);
    rerender(renderWithConfigs({ ...testProps, loading: true }));
    expect(screen.queryByTestId(idModel.onError.id)).toBeDisabled();
    expect(mockProps.onError).toBeCalledTimes(1);
  });

  test("1271122: [Given] there are items [When] there is more than one page [And] the user is on page 1 [Expect] the pagination to be present [And] the next button clickable", () => {
    render(<EntityTable {...mockProps} />);

    const pagination = screen.getByTestId(idModel.pagination.id);
    expect(pagination).toBeInTheDocument();

    const next = screen.getByTestId(idModel.pagination.next.id);
    fireEvent.click(next);
    expect(mockProps.onPageChange).toBeCalledTimes(1);
    expect(mockProps.onPageChange).toBeCalledWith(lastPageRef, 2, EntityTablePaginationDirection.Next);
  });

  test("1271123: [Given] there are items [And] there is more than one page [And] the user is on page 2 [Expect] the pagination to be present [And] the previous button clickable", () => {
    render(<EntityTable {...mockProps} page={2} />);

    const pagination = screen.getByTestId(idModel.pagination.id);
    expect(pagination).toBeInTheDocument();

    const previous = screen.getByTestId(idModel.pagination.previous.id);
    fireEvent.click(previous);
    expect(mockProps.onPageChange).toBeCalledTimes(1);
    expect(mockProps.onPageChange).toBeCalledWith(undefined, 1, EntityTablePaginationDirection.Previous);
  });

  test("7344764: [Given] there are less that 10 items [Expect] the pagination to not be present", () => {
    const mockLessThan10Results = {
      ...mockProps,
      items: MockOrganizations.splice(0, 5),
      pageRefs: [] as string[][],
    };

    render(<EntityTable {...mockLessThan10Results} />, { container: getAppWrapper() });
    const pagination = screen.queryByTestId(idModel.pagination.id);
    expect(pagination).not.toBeInTheDocument();
  });

  test("1271124: [Given] there no items [And] a placeholder is provided [Expect] the placeholder to be present [And] the placeholder action button clickable", () => {
    const mockButtonIdModel = new ButtonIdModel("mockPlaceholderButton");
    const onClick = jest.fn();
    const props: EntityTableProps<Organization> = {
      ...mockProps,
      // items: null,
      pageRefs: undefined,
      placeholderProps: {
        image: AddUserImage,
        actions: [
          {
            id: mockButtonIdModel.id,
            theme: ButtonTheme.Q4Blue,
            icon: "q4i-add-4pt",
            label: "Add User",
            onClick,
          },
        ],
      },
    };
    render(renderWithConfigs(props));

    const placeholder = screen.getByTestId(idModel.placeholder.id);
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toMatchSnapshot();

    const button = screen.getByTestId(mockButtonIdModel.id);
    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });
});
