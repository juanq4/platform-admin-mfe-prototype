import styled from "@emotion/styled";
import { MediaDeviceSize, peacockPalette } from "@q4/nimbus-ui";

export const Container = styled.div`
  background: ${peacockPalette.primary.primary500};
  display: flex;
  justify-content: space-between;
  height: 80px;

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    height: 56px;
  }
`;

export const Column = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const LogoContainer = styled.div`
  margin-left: 24px;
`;

export const LogoAnchor = styled.a`
  text-decoration: none;
`;

export const Logo = styled.img`
  height: 38px;
  width: 60px;
`;

export const Separator = styled.div`
  border-left: 2px solid rgba(0, 0, 0, 0.21);
  height: 30px;
  margin: 4px 8px 0px 8px;

  @media only screen and (max-width: 428px) {
    display: none;
  }
`;

export const NotificationDrawerContainer = styled.div`
  margin: 0;

  &:hover {
    button {
      background-color: ${peacockPalette.primary.primary700};
      border-radius: 5px;
    }
  }
`;

export const ApplicationSwitcherContainer = styled.div`
  margin: 0;

  &:hover {
    button {
      background-color: ${peacockPalette.primary.primary700};
      border-radius: 5px;
    }
  }
`;

export const ProfileMenuContainer = styled.div`
  margin-right: 16px;
`;
