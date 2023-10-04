import styled from "@emotion/styled";
//TODO: We should be using gux for out margins and padding - update once new gux is implemented in nimbus

export const Container = styled.div`
  padding-top: 16px;
`;

export const MfeWrapper = styled.div`
  padding-top: 16px;

  & > div:has(.nui-layout) {
    height: auto;
  }
`;
