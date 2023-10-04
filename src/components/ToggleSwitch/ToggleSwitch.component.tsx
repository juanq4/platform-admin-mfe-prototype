import { memo } from "react";
import type { ToggleSwitchProps } from "./ToggleSwitch.definition";
import { Input, Slider, Toggle } from "./ToggleSwitch.style";

const toggleSwitch = ({ id, isChecked, onChange }: ToggleSwitchProps) => (
  <Toggle>
    <Input type="checkbox" id={id} checked={isChecked} onChange={onChange} />
    <Slider />
  </Toggle>
);

export const ToggleSwitch = memo(toggleSwitch);
