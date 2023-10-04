import styled from "@emotion/styled";
import type { ButtonProps, PopoverProps, PopoverMenuProps, ToolbarProps } from "@q4/nimbus-ui";
import {
  Button,
  PopoverMenu,
  ButtonTheme,
  PopoverMenuTheme,
  Popover,
  MediaQuery,
  Toolbar,
  ToolbarTheme,
  ButtonSize,
  ButtonClassName,
  PopoverMenuClassName,
} from "@q4/nimbus-ui";
import clsx from "clsx";
import Color from "color";
import leftIcon from "../../assets/icons/left-icon.svg";
import { DisplayNoneLaptop } from "../../styles/responsive";
import type { NavigationProps } from "../../trunk/Root/Root.definition";
import type { MobileMenuButtonProps } from "./TopNavigation.definition";
import { TopNavigationAriaLabel } from "./TopNavigation.definition";

const ButtonCustom = {
  ClassModifier: `${ButtonClassName.Base}--custom`,
};

const PopOverMenuWhite = {
  ClassModifier: `${PopoverMenuClassName.Base}--white`,
};

export const Container = styled.div`
  .nui-toolbar {
    box-shadow: inset 0px -1px 0px ${({ theme }) => theme.colors.neutral100};

    &_inner {
      padding-left: 16px;
      padding-right: 16px;

      @media ${MediaQuery.extraSmall.max} {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }
`;

export const BrandOrgContainer = styled.div`
  min-width: 205px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transform: translate(0);
  transition: 0.3s ease-in-out;
  transition-property: width, min-width;

  &.collapsed {
    min-width: 57px;
  }

  @media ${MediaQuery.extraSmall.max} {
    min-width: unset;
    width: 137px;
    height: 40px;
    justify-content: flex-start;
  }
`;

export const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.primary50};
  border-radius: 1px;
  width: 1px;
  height: 28px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 8px;
  margin-left: 8px;
`;

export const Logo = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const LogoWrapper = styled.div`
  position: relative;
  height: 28px;
  width: 188px;

  transition: 0.3s ease-in-out;
  transition-property: width;

  .collapsed & {
    width: 40px;
  }

  @media ${MediaQuery.extraSmall.max} {
    width: 40px;
  }
`;

export const AccountSwitcherButton = styled((props: ButtonProps) => <Button theme={ButtonTheme.None} {...props} />)`
  &.nui-button {
    background-color: ${({ theme }) => theme.colors.transparent};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.q4Blue};
    max-width: 85%;
    padding: 8px;
    overflow: hidden !important;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.nui-button--v2 .nui-button_label {
    display: initial;
  }

  &:before {
    content: url(${leftIcon});
    padding-right: 8px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
    color: ${({ theme }) => theme.colors.primary700};
  }
`;

export const Actions = styled.div`
  display: flex;

  .active {
    background-color: ${({ theme }) => theme.colors.neutral100};
    color: ${({ theme }) => theme.colors.primary700};
  }

  .nui-button + .nui-button {
    margin-left: 0px;
  }

  button.nui-button.${ButtonCustom.ClassModifier} {
    &:focus,
    &:focus-visible {
      box-shadow: none;
      outline: none;
      border-color: ${({ theme }) => theme.colors.transparent};
      background-color: ${({ theme }) => theme.colors.transparent};
      color: ${({ theme }) => theme.colors.q4Blue};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
      color: ${({ theme }) => theme.colors.primary700};
    }
  }
`;

export const NotificationsButton = styled((props: ButtonProps) => (
  <Button {...props} className={clsx(props.className, ButtonCustom.ClassModifier)} />
))`
  &.nui-button {
    color: ${({ theme }) => theme.colors.q4Blue};
    background-color: ${({ theme }) => theme.colors.transparent};
  }
`;

export const NotificationsPopover = styled((props: PopoverProps) => <Popover {...props} />)`
  @media only screen and (max-width: 414px) {
    .nui-popover_anchor {
      display: flex;
      justify-content: center;
      left: 0 !important;
    }

    .nui-popover_anchor,
    .nui-popover_inner {
      position: relative;
    }
  }
`;
export const NotificationsContent = styled.div`
  max-height: 90vh;
  width: 420px;

  @media ${MediaQuery.medium.max} {
    width: 296px;
  }
`;

export const NotificationsTitle = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
`;

export const NotificationsFooter = styled.div`
  height: 64px;
`;

export const NotificationsFooterButton = styled((props: ButtonProps) => <Button theme={ButtonTheme.Q4Blue} {...props} />)`
  bottom: 0;
  margin: 16px;
  padding: 8px;
  position: absolute;
  right: 0;
  text-transform: none;
`;

export const UserButton = styled((props: ButtonProps) => (
  <Button {...props} className={clsx(props.className, ButtonCustom.ClassModifier)} />
))`
  &.nui-button {
    color: ${({ theme }) => theme.colors.q4Blue};
    background-color: ${({ theme }) => theme.colors.transparent};
    white-space: nowrap;
    text-transform: none;

    .caret {
      font-size: 10px;
      transform: scale(1.5, 0.6);
      display: inline-block;
      margin-left: 8px;
    }
  }
`;

export const UserMenu = styled((props: PopoverMenuProps) => (
  <PopoverMenu theme={PopoverMenuTheme.White} {...props} className={clsx(props.className, PopOverMenuWhite.ClassModifier)} />
))`
  &.${PopOverMenuWhite.ClassModifier} {
    .nui-popover-menu_inner {
      border-radius: 3px;
      margin-top: 0px !important;
      padding: 5px;

      &:before {
        display: none;
      }
    }

    .nui-popover_inner > div {
      min-width: 185px;
    }

    .nui-button_label {
      width: 100%;
      text-align: left;
      padding: 4px;
    }

    .nui-popover-menu_item {
      background-color: ${({ theme }) => theme.colors.white};
      min-width: 197px;
      border-radius: 4px;
      padding: 0px;

      &:hover {
        background-color: ${({ theme }) => Color(theme.colors.gray2).alpha(0.1).string()};
      }

      &:focus {
        background-color: ${({ theme }) => theme.colors.gray2};
      }
    }

    .nui-popover-menu_item:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    }

    .nui-popover-menu_item:last-child {
      border-top: 1px solid ${({ theme }) => theme.colors.neutral100};
    }

    .nui-button + .nui-button {
      margin-left: 0px;
    }
  }
`;

export const MobileMenuButton = styled(({ showMobileNavigation: _showMobileNavigation, ...rest }: MobileMenuButtonProps) => (
  <Button
    theme={ButtonTheme.Transparent}
    size={ButtonSize.Large}
    aria-label={TopNavigationAriaLabel.MobileMenuButton}
    {...rest}
  />
))<Pick<NavigationProps, "showMobileNavigation">>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin-right: 10px;
  border-radius: 4px;
  padding: 0px;
  color: ${({ theme }) => theme.colors.q4Blue} !important;
  background-color: ${({ showMobileNavigation, theme }) =>
    showMobileNavigation ? theme.colors.primary50 : theme.colors.white};
  font-size: 20px;
  overflow: hidden;

  &:focus,
  &:hover {
    background-color: ${({ showMobileNavigation, theme }) =>
      showMobileNavigation ? theme.colors.primary50 : theme.colors.white};
  }
  ${DisplayNoneLaptop}
`;

export const Header = styled((props: ToolbarProps) => <Toolbar theme={ToolbarTheme.White} {...props} />)`
  .nui-toolbar_row:first-of-type {
    padding-top: 8px;
  }

  .nui-toolbar_row:last-child {
    padding-bottom: 8px;
  }

  @media ${MediaQuery.small.max} {
    .nui-toolbar_row:first-of-type {
      padding-top: 4px;
    }

    .nui-toolbar_row:last-child {
      padding-bottom: 4px;
    }
  }
`;

export const MobileMenuIcon = styled.img`
  width: 14px;
  height: 14px;
`;
