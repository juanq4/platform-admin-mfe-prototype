import React from "react";
import { render, screen } from "../../utils/testUtils";
import { LoadingBar } from "../LoadingBar/LoadingBar.component";

const mockMesage = "I'm a message";

describe("LoadingBar", () => {
  test("expect to render", () => {
    const { container } = render(<LoadingBar />);

    expect(container).toMatchSnapshot();
  });

  test("11519452: [Given] a message is provided [Then] expect message to show on loader", () => {
    render(<LoadingBar message={mockMesage} />);

    expect(screen.getByText(mockMesage)).toBeInTheDocument();
  });

  test("11519453: [Given] a message is not provided [Then] expect no message to be show on loader", () => {
    render(<LoadingBar />);

    expect(screen.queryByText(mockMesage)).not.toBeInTheDocument();
  });
});
