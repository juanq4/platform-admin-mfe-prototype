import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { InfoIcon } from "@q4/nimbus-ui";
import React, { useState } from "react";
import { SAVE_DATA } from "../../../api/saveData";
import { Button } from "../../../common/components";
import type { HelloWorldProps } from "./helloWorld.definition";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .sample-label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
  }

  .button {
    margin: auto;
  }
`;

export const HelloWorld = ({ sampleText = "Hello World" }: HelloWorldProps): JSX.Element => {
  const [text, setText] = useState(sampleText);
  const [saveData, { loading, error, data }] = useMutation(SAVE_DATA);

  const onClick = () => {
    saveData({ variables: { id: 1 } });
  };

  if (loading) return <div>Saving data...</div>;
  if (error) return <div>{error.message}</div>;
  if (data && text !== "Saved") setText("Saved");

  return (
    <Container>
      <div className="sample-label">
        <InfoIcon />
        <div className="sample-text">{text}</div>
      </div>
      {!data && <Button label={"save"} onClick={onClick} />}
    </Container>
  );
};
