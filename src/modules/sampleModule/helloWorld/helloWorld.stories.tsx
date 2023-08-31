import { MockedProvider } from "@apollo/client/testing";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SAVE_DATA } from "../../../api/saveData";
import { HelloWorld } from "./helloWorld.component";

export default {
  title: "Internal/HelloWorld",
  component: HelloWorld,
} as ComponentMeta<typeof HelloWorld>;

const mocks = [
  {
    request: {
      query: SAVE_DATA,
      variables: { id: 1 },
    },
    result: { data: { id: 1 } },
  },
];

const Template: ComponentStory<typeof HelloWorld> = (args) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <HelloWorld {...args} />
    </MockedProvider>
  );
};

export const Default = Template.bind({});
