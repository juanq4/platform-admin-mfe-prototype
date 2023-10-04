import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: inherit;
  padding: 8px 32px;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

export const Content = styled.div`
  overflow: auto;
`;
