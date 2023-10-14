import { env } from "../../../config/env/env";
import { RoleLabel } from "../../definitions/role.definition";
import { generateRoleLabel } from "./role.utils";

describe("generateRoleLabel", () => {
  const roles = Object.values(RoleLabel);
  const { labelSuffix: roleLabelSuffix } = env.role;

  test("7403048: [Given] the role label is 'Q4 Admin' [And] the roleLabelSuffix is '[DEV]' [Then] expect the returned value to be 'Q4 Admin [DEV]'", () => {
    const role = roles[0];
    const expected = `${role} ${roleLabelSuffix}`;
    expect(generateRoleLabel(role, roleLabelSuffix)).toBe(expected);
  });

  test("7403049: [Given] the role label is 'Q4 Support' [And] the roleLabelSuffix is '[DEV]' [Then] expect the returned value to be 'Q4 Support [DEV]'", () => {
    const role = roles[1];
    const expected = `${role} ${roleLabelSuffix}`;
    expect(generateRoleLabel(role, roleLabelSuffix)).toBe(expected);
  });

  test("7403050: [Given] the role label is 'Corporate Admin' [And] the roleLabelSuffix is '[DEV]' [Then] expect the returned value to be 'Corporate Admin [DEV]'", () => {
    const role = roles[2];
    const expected = `${role} ${roleLabelSuffix}`;
    expect(generateRoleLabel(role, roleLabelSuffix)).toBe(expected);
  });

  test("7403051: [Given] the role label is 'Corporate Support' [And] the roleLabelSuffix is '[DEV]' [Then] expect the returned value to be 'Corporate Support [DEV]'", () => {
    const role = roles[3];
    const expected = `${role} ${roleLabelSuffix}`;
    expect(generateRoleLabel(role, roleLabelSuffix)).toBe(expected);
  });

  test("7403052: [Given] the role label is 'Q4 Client Team' [And] the roleLabelSuffix is '[DEV]' [Then] expect the returned value to be 'Q4 Client Team [DEV]'", () => {
    const role = roles[4];
    const expected = `${role} ${roleLabelSuffix}`;
    expect(generateRoleLabel(role, roleLabelSuffix)).toBe(expected);
  });

  test("7403053: [Given] the role label is 'Agency User' [And] the roleLabelSuffix is '[DEV]' [Then] expect the returned value to be 'Agency User [DEV]'", () => {
    const role = roles[5];
    const expected = `${role} ${roleLabelSuffix}`;
    expect(generateRoleLabel(role, roleLabelSuffix)).toBe(expected);
  });

  test("7403054: [Given] the role label is 'Q4 Admin' [And] the roleLabelSuffix is 'undefined' [Then] expect the returned value to be 'Q4 Admin'", () => {
    expect(generateRoleLabel(roles[0])).toBe(roles[0]);
  });

  test("7403055: [Given] the role label is 'Q4 Support' [And] the roleLabelSuffix is 'undefined' [Then] expect the returned value to be 'Q4 Support'", () => {
    expect(generateRoleLabel(roles[1])).toBe(roles[1]);
  });

  test("7403056: [Given] the role label is 'Corporate Admin' [And] the roleLabelSuffix is 'undefined' [Then] expect the returned value to be 'Corporate Admin'", () => {
    expect(generateRoleLabel(roles[2])).toBe(roles[2]);
  });

  test("7403057: [Given] the role label is 'Corporate Support' [And] the roleLabelSuffix is 'undefined' [Then] expect the returned value to be 'Corporate Support'", () => {
    expect(generateRoleLabel(roles[3])).toBe(roles[3]);
  });

  test("7403058: [Given] the role label is 'Q4 Client Team' [And] the roleLabelSuffix is 'undefined' [Then] expect the returned value to be 'Q4 Client Team'", () => {
    expect(generateRoleLabel(roles[4])).toBe(roles[4]);
  });

  test("7403059: [Given] the role label is 'Agency User' [And] the roleLabelSuffix is 'undefined' [Then] expect the returned value to be 'Agency User'", () => {
    expect(generateRoleLabel(roles[5])).toBe(roles[5]);
  });
});
