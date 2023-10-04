import { fireEvent, render, screen } from "../../utils/testUtils";
import { ToggleSwitch } from "./ToggleSwitch.component";

describe("ToggleSwitch ", () => {
  it("7391335: passes id to the checkbox", () => {
    render(<ToggleSwitch id="test" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("id", "test");
  });

  it("7391336: can be checked", () => {
    render(<ToggleSwitch isChecked onChange={jest.fn()} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("7392407: triggers onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<ToggleSwitch onChange={handleChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
