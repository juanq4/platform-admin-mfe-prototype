import styled from "@emotion/styled";
//TODO: We should be using gux for out margins and padding - update once new gux is implemented in nimbus

export const Container = styled.div`
  width: 388px;
  max-height: 680px;
  height: auto;
  overflow: auto;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 12px 8px;
  box-shadow: inset 0px -1px 0px #e7ecef;
`;

export const Body = styled.div`
  width: 308px;
  margin: 0px 16px;
  flex: 1;
`;

export const Icon = styled.div`
  margin: 8px 0px;
`;

export const Copy = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.neutral700};
  margin-bottom: 6px;
`;

export const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.neutral500};
`;

export const PipContainer = styled.div`
  margin: auto;
`;

export const Pip = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.secondary500};
  border-radius: 4px;
`;

export const Notification = styled.div<NotificationContainerProps>`
  width: ${(props) => (props.full ? "100%" : "388px")};
  max-height: 680px;
  height: auto;
  overflow: auto;
`;

interface NotificationContainerProps {
  full?: boolean;
}
