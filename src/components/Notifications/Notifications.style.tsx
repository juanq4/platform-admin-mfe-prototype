import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.porcelain}, 0px 2px 4px ${({ theme }) => theme.colors.gray2};
  display: flex;
  flex-direction: column;
  max-height: inherit;
  padding: 32px;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  line-height: 28px;
  padding: 16px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
`;

export const Unread = styled.div`
  color: ${({ theme }) => theme.colors.neutral700};
  font-size: 12px;
`;

export const Content = styled.div`
  padding: 0px 16px;
  overflow: auto;
`;

export const Footer = styled.div`
  box-shadow: inset 0px 1px 0px ${({ theme }) => theme.colors.neutral100};
`;
