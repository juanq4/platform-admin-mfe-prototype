import { createSerializer, matchers } from "@emotion/jest";
import React from "react";
import { render, screen } from "../../utils/testUtils";
import { List } from "../List/List.component";

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);

const mockHeader = "Mock header";
const mockFooter = "Mock footer";

const dataSourceToday = [
  { title: "today", content: "test 1 data" },
  { title: "today", content: "test 2 data" },
];

describe("Simple List Component", () => {
  test("7387811: [Given] no props are provided [Expect] the component to render", () => {
    const { container } = render(<List />);

    expect(container).toMatchSnapshot();
  });

  test("7387812: [Given] a header is provided [Expect] the header to show", () => {
    render(<List header={<h3>{mockHeader}</h3>} />);

    const header = screen.getByText(mockHeader);
    expect(header).toBeVisible();
  });

  test("7387813: [Given] a footer is provided [Expect] the footer to show", () => {
    render(<List footer={<h3>{mockFooter}</h3>} />);

    const footer = screen.getByText(mockFooter);
    expect(footer).toBeVisible();
  });

  test("7387814: [Given] data is provided [Expect] the data to show", () => {
    render(<List dataSource={dataSourceToday} renderItem={(item) => <div>{item.content}</div>} />);

    dataSourceToday.forEach((el) => {
      expect(screen.getByText(el.content)).toBeVisible();
    });

    const dataCount = screen.getAllByRole("listitem").length;
    expect(dataCount).toEqual(dataSourceToday.length);
  });

  test("7387815: [Given] data and a child exists [Expect] the child data to appear below the data", () => {
    const { container } = render(
      <List dataSource={dataSourceToday} renderItem={(item) => <div>{item.content}</div>}>
        <button>I am a button</button>
      </List>,
    );

    expect(container).toMatchSnapshot();
  });
});
