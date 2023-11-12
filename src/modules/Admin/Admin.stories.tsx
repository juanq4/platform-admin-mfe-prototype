import type { MfeProps } from "@q4/platform-definitions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { DefaultMfeProps } from "../../definitions/mfe.definition";
import Admin from "./Admin.component";

export default {
  title: "Exported/Admin",
  component: Admin,
} as ComponentMeta<typeof Admin>;

const Template: ComponentStory<typeof Admin> = (args) => <Admin {...(args as MfeProps)} />;

export const Default = Template.bind({});
Default.args = DefaultMfeProps;
