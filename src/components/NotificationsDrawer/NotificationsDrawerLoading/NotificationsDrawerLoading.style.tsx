import styled from "@emotion/styled";
import { peacockPalette } from "@q4/nimbus-ui";

export const Container = styled.div`
  background: ${peacockPalette.shades.white};
  border-radius: 8px;
  padding: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Heading = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const Body = styled.div`
  padding: 0 40px;
`;

export const Tags = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`;
