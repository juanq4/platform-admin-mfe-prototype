import styled from "@emotion/styled";
import type { ListProps } from "./List.definition";

export const Header = styled.div`
  height: 28px;
  width: 100%;
  padding: 4px 0px;
  font-family: ${({ theme }) => theme.typography.openSans};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutral500};
`;

export const Container = styled.ul`
  list-style: none;
  margin: 0 0 20px 0;
  padding: 0;
`;

export const Item = styled.li<Pick<ListProps<"">, "hasKeyLine">>`
  height: auto;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  box-shadow: inset 0px -1px 0px ${(props) => (props.hasKeyLine ? props.theme.colors.neutral100 : "inherit")};
`;
