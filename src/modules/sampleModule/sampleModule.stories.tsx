import type { MfeProps } from "@q4/platform-definitions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { SampleModule, defaultSampleModuleProps } from "./sampleModule.component";

export default {
  title: "Exported/SampleModule",
  component: SampleModule,
} as ComponentMeta<typeof SampleModule>;

const Template: ComponentStory<typeof SampleModule> = (args) => <SampleModule {...(args as MfeProps)} />;

export const Default = Template.bind({});
Default.args = defaultSampleModuleProps;
