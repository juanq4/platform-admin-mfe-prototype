/* eslint-disable */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  DateToInteger: any;
  KeyValue: any;
  Time: any;
  Timestamp: any;
  null: any;
};

export enum Activist_Type {
  cyclps = "cyclps",
  sharkwatch50 = "sharkwatch50",
}

export enum Aggregate_Function {
  AVG = "AVG",
  COUNT = "COUNT",
  MAX = "MAX",
  MIN = "MIN",
  SUM = "SUM",
}

export enum Aggr_Field {
  REGION = "REGION",
  SECTOR = "SECTOR",
}

export type AiResponse = {
  __typename?: "AIResponse";
  response?: Maybe<Scalars["String"]>;
};

export type AccessGroup = {
  __typename?: "AccessGroup";
  id: Scalars["String"];
  managedOrganizationIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name: Scalars["String"];
  organizationId: Scalars["String"];
  userIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type AccessGroupList = {
  __typename?: "AccessGroupList";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<AccessGroup>>>;
};

export type AccessGroupUpdateDeltas = {
  add?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  remove?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AccountUser = {
  __typename?: "AccountUser";
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["String"];
  lastName: Scalars["String"];
  organizationId: Scalars["String"];
};

export type AccountUserDto = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["String"];
  lastName: Scalars["String"];
  organizationId: Scalars["String"];
};

export type ActivityFilter = {
  category?: InputMaybe<Scalars["String"]>;
  endDate?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["String"]>;
};

export type AttendeeEventsDto = {
  __typename?: "AttendeeEventsDTO";
  description?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  eventEnd?: Maybe<Scalars["Date"]>;
  eventStart?: Maybe<Scalars["Date"]>;
  meetingId?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type AttendeeJob = {
  id?: InputMaybe<Scalars["String"]>;
  jobTitle?: InputMaybe<Scalars["String"]>;
};

export enum AttendeeType {
  contact = "contact",
  corporateContact = "corporateContact",
  customContact = "customContact",
}

export type Attendees = {
  id?: InputMaybe<Scalars["String"]>;
  jobs?: InputMaybe<Array<InputMaybe<AttendeeJob>>>;
  type?: InputMaybe<AttendeeType>;
};

export type AzureVendorConfigInput = {
  deploymentName?: InputMaybe<Scalars["String"]>;
  openaiApiVersion?: InputMaybe<Scalars["String"]>;
};

export type BedrockVendorConfigInput = {
  modelId?: InputMaybe<Scalars["String"]>;
};

export type BenchmarkEventDailyDto = {
  __typename?: "BenchmarkEventDailyDTO";
  date?: Maybe<Scalars["Date"]>;
  uniqueEventViews?: Maybe<Scalars["Float"]>;
};

export type BenchmarkEventDailyResult = {
  __typename?: "BenchmarkEventDailyResult";
  count?: Maybe<Scalars["Int"]>;
  hasDimensionData?: Maybe<Scalars["Boolean"]>;
  items?: Maybe<Array<Maybe<BenchmarkEventDailyDto>>>;
};

export enum CacheControlScope {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export type ChangeSummary = StudioPersonManageChangeSummaryDto;

export type Client = {
  __typename?: "Client";
  exchange?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
};

export type CompletionInput = {
  cache?: InputMaybe<Scalars["Boolean"]>;
  humanMessage: Scalars["String"];
  maxTokens?: InputMaybe<Scalars["Int"]>;
  stop?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  stream?: InputMaybe<Scalars["Boolean"]>;
  systemMessage?: InputMaybe<Scalars["String"]>;
  tag?: InputMaybe<Array<TagInput>>;
  temperature?: InputMaybe<Scalars["Float"]>;
  vendor: VendorInput;
};

export type CompletionResult = {
  __typename?: "CompletionResult";
  data?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type ContactCreateItemResponse = {
  __typename?: "ContactCreateItemResponse";
  id: Scalars["ID"];
};

export type ContactDto = {
  __typename?: "ContactDTO";
  active?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  contactType?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  email?: Maybe<Array<Maybe<Scalars["String"]>>>;
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  job?: Maybe<Array<Maybe<ContactJob>>>;
  lastName?: Maybe<Scalars["String"]>;
  managedFunds?: Maybe<Array<Maybe<ManagedFunds>>>;
  nickname?: Maybe<Scalars["String"]>;
  phone?: Maybe<Array<Maybe<ContactPhone>>>;
  salutation?: Maybe<Scalars["String"]>;
  state_province?: Maybe<Scalars["String"]>;
  suffix?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type ContactHoldingCurrentDto = {
  __typename?: "ContactHoldingCurrentDTO";
  current?: Maybe<Scalars["Float"]>;
};

export type ContactJob = {
  __typename?: "ContactJob";
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
  jobFunction?: Maybe<Array<Maybe<Scalars["String"]>>>;
  jobTitle?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type ContactJobDto = {
  __typename?: "ContactJobDTO";
  address1?: Maybe<Scalars["String"]>;
  address2?: Maybe<Scalars["String"]>;
  address3?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  countryName?: Maybe<Scalars["String"]>;
  directPhone?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  functions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  institutionName?: Maybe<Scalars["String"]>;
  institutionType?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  stateProvince?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type ContactList = {
  __typename?: "ContactList";
  contactCount?: Maybe<Scalars["Int"]>;
  contacts?: Maybe<Array<Maybe<ContactDto>>>;
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
};

export type ContactListContactInput = {
  id: Scalars["String"];
};

export type ContactListInput = {
  contacts?: InputMaybe<Array<InputMaybe<ContactListContactInput>>>;
  id?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ContactListItemResponse = {
  __typename?: "ContactListItemResponse";
  id?: Maybe<Scalars["ID"]>;
};

export type ContactListResponse = {
  __typename?: "ContactListResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<ContactList>>>;
};

export type ContactPhone = {
  __typename?: "ContactPhone";
  countryCode?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type ContactResult = {
  __typename?: "ContactResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<ContactDto>>>;
};

export type ContactSearch = {
  fields?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  query?: InputMaybe<Scalars["String"]>;
};

export type ContactStrategyDto = {
  __typename?: "ContactStrategyDTO";
  contactId?: Maybe<Scalars["String"]>;
  country?: Maybe<Array<Maybe<Scalars["String"]>>>;
  customRegion?: Maybe<Array<Maybe<Scalars["String"]>>>;
  entityId?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  marketCap?: Maybe<Array<Maybe<Scalars["String"]>>>;
  quality?: Maybe<Array<Maybe<Scalars["String"]>>>;
  regionGroup?: Maybe<Array<Maybe<Scalars["String"]>>>;
  sectors?: Maybe<Array<Maybe<Scalars["String"]>>>;
  securityType?: Maybe<Array<Maybe<Scalars["String"]>>>;
  source?: Maybe<Scalars["String"]>;
  strategy?: Maybe<Array<Maybe<Scalars["String"]>>>;
  style?: Maybe<Array<Maybe<Scalars["String"]>>>;
  summary?: Maybe<Scalars["String"]>;
};

export type ContactTitle = {
  __typename?: "ContactTitle";
  jobRole?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type ContactUpdateInput = {
  active?: InputMaybe<Scalars["Boolean"]>;
  address?: InputMaybe<Scalars["String"]>;
  bio?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  contactType?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  firstName?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  jobs?: InputMaybe<Array<InputMaybe<JobsInput>>>;
  lastName?: InputMaybe<Scalars["String"]>;
  managedFunds?: InputMaybe<Array<InputMaybe<FundEntityInput>>>;
  nickName?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Array<InputMaybe<PhoneInput>>>;
  salutation?: InputMaybe<Scalars["String"]>;
  stateProvince?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
};

export type ContactUpdateItemResponse = {
  __typename?: "ContactUpdateItemResponse";
  id: Scalars["ID"];
  recordsUpdated: Scalars["Int"];
};

export type ContactUrl = {
  __typename?: "ContactUrl";
  active?: Maybe<Scalars["Int"]>;
  type?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type CorporateContact = {
  __typename?: "CorporateContact";
  deleted?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  jobTitle?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type CorporateContactResponse = {
  __typename?: "CorporateContactResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<CorporateContact>>>;
};

export type CreateContactInput = {
  active?: InputMaybe<Scalars["Boolean"]>;
  address?: InputMaybe<Scalars["String"]>;
  bio?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  contactType?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  email: Array<Scalars["String"]>;
  firstName: Scalars["String"];
  jobs?: InputMaybe<Array<InputMaybe<JobsInput>>>;
  lastName: Scalars["String"];
  managedFunds?: InputMaybe<Array<InputMaybe<FundEntityInput>>>;
  nickName?: InputMaybe<Scalars["String"]>;
  phone: Array<PhoneInput>;
  salutation?: InputMaybe<Scalars["String"]>;
  stateProvince?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
};

export type CreateContactListResponse = {
  __typename?: "CreateContactListResponse";
  items?: Maybe<Array<Maybe<ContactListItemResponse>>>;
};

export type CreateContactResponse = {
  __typename?: "CreateContactResponse";
  items: Array<ContactCreateItemResponse>;
};

export type CreateCorporateContactResponse = {
  __typename?: "CreateCorporateContactResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<CreateItemResponse>>>;
};

export type CreateCustomContactResponse = {
  __typename?: "CreateCustomContactResponse";
  items?: Maybe<Array<Maybe<CustomContactItemResponse>>>;
};

export type CreateEntityNoteResponse = {
  __typename?: "CreateEntityNoteResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<CreateItemResponse>>>;
};

export type CreateInteractionResponse = {
  __typename?: "CreateInteractionResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<CreateItemResponse>>>;
};

export type CreateItemResponse = {
  __typename?: "CreateItemResponse";
  id?: Maybe<Scalars["String"]>;
};

export type CreatePageResponse = {
  __typename?: "CreatePageResponse";
  data?: Maybe<Page>;
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type CreateRequestJobInput = {
  data: JobDataInput;
  files?: InputMaybe<Array<RequestFileInput>>;
  id: Scalars["String"];
  instructions?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<RequestScheduleInput>;
  type: RequestJobEnum;
};

export enum CustomCaseTypeEnum {
  missingSite = "missingSite",
}

export type CustomContact = {
  __typename?: "CustomContact";
  createdBy?: Maybe<Scalars["String"]>;
  createdDate?: Maybe<Scalars["Date"]>;
  deleted?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  factsetId?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  fund?: Maybe<Array<Maybe<Entity>>>;
  id?: Maybe<Scalars["ID"]>;
  institution?: Maybe<Entity>;
  jobFunction?: Maybe<Array<Maybe<Scalars["String"]>>>;
  jobTitle?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  modifiedBy?: Maybe<Scalars["String"]>;
  modifiedDate?: Maybe<Scalars["Date"]>;
  organizationId?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  salutation?: Maybe<Scalars["String"]>;
};

export type CustomContactInput = {
  createdBy?: InputMaybe<Scalars["String"]>;
  createdDate?: InputMaybe<Scalars["Date"]>;
  deleted?: InputMaybe<Scalars["Boolean"]>;
  email?: InputMaybe<Scalars["String"]>;
  factsetId?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  fund?: InputMaybe<Array<InputMaybe<InstitutionInput>>>;
  id?: InputMaybe<Scalars["ID"]>;
  institution?: InputMaybe<InstitutionInput>;
  jobFunction?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  jobTitle?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  location?: InputMaybe<Scalars["String"]>;
  modifiedBy?: InputMaybe<Scalars["String"]>;
  modifiedDate?: InputMaybe<Scalars["Date"]>;
  organizationId?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  salutation?: InputMaybe<Scalars["String"]>;
};

export type CustomContactItemResponse = {
  __typename?: "CustomContactItemResponse";
  id?: Maybe<Scalars["ID"]>;
};

export type CustomContactResponse = {
  __typename?: "CustomContactResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<CustomContact>>>;
};

export enum DataProfile {
  admin = "admin",
  preview = "preview",
  published = "published",
  workingCopy = "workingCopy",
}

export type DeleteContactListResponse = {
  __typename?: "DeleteContactListResponse";
  success?: Maybe<Scalars["Boolean"]>;
};

export type DeleteCorporateContactResponse = {
  __typename?: "DeleteCorporateContactResponse";
  count?: Maybe<Scalars["Int"]>;
};

export type DeleteCustomContactResponse = {
  __typename?: "DeleteCustomContactResponse";
  items?: Maybe<Array<Maybe<CustomContactItemResponse>>>;
};

export type DeleteInteractionResponse = {
  __typename?: "DeleteInteractionResponse";
  count?: Maybe<Scalars["Int"]>;
};

export type DeletePageResponse = {
  __typename?: "DeletePageResponse";
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type DepartmentDto = Workflow & {
  __typename?: "DepartmentDTO";
  active: Scalars["Boolean"];
  bucket?: Maybe<Scalars["String"]>;
  departmentId: Scalars["Int"];
  departmentName: Scalars["String"];
  effectiveDate?: Maybe<Scalars["DateTime"]>;
  isDeleted: Scalars["Boolean"];
  languageId: Scalars["Int"];
  publishedRevisionNumber: Scalars["Int"];
  rank?: Maybe<Scalars["Int"]>;
  status: WorkflowStatus;
  statusId: Scalars["Int"];
  title?: Maybe<Scalars["String"]>;
  workflowId: Scalars["String"];
  workingRevisionNumber: Scalars["Int"];
};

export type DepartmentResult = {
  __typename?: "DepartmentResult";
  count: Scalars["Int"];
  items: Array<DepartmentDto>;
};

export type DesktopActivityAddress = {
  id?: InputMaybe<Scalars["String"]>;
  location?: InputMaybe<Scalars["String"]>;
  venue?: InputMaybe<Scalars["String"]>;
};

export type DesktopActivityAddressDto = {
  __typename?: "DesktopActivityAddressDTO";
  id?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  venue?: Maybe<Scalars["String"]>;
};

export type DesktopActivityCategoryCountDto = {
  __typename?: "DesktopActivityCategoryCountDTO";
  comment?: Maybe<Scalars["Int"]>;
  conference?: Maybe<Scalars["Int"]>;
  earnings?: Maybe<Scalars["Int"]>;
  email?: Maybe<Scalars["Int"]>;
  meeting?: Maybe<Scalars["Int"]>;
  other?: Maybe<Scalars["Int"]>;
  phone?: Maybe<Scalars["Int"]>;
  roadshow?: Maybe<Scalars["Int"]>;
};

export type DesktopActivityDto = {
  __typename?: "DesktopActivityDTO";
  address?: Maybe<Array<Maybe<DesktopActivityAddressDto>>>;
  allDay?: Maybe<Scalars["Boolean"]>;
  body?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
  end?: Maybe<DesktopActivityDateDto>;
  id?: Maybe<Scalars["String"]>;
  links?: Maybe<Array<Maybe<DesktopActivityLinksDto>>>;
  participants?: Maybe<Array<Maybe<DesktopActivityParticipantsDto>>>;
  profileId?: Maybe<Scalars["String"]>;
  revisions?: Maybe<Array<Maybe<DesktopActivityRevisionsDto>>>;
  start?: Maybe<DesktopActivityDateDto>;
  tag?: Maybe<Array<Maybe<Scalars["String"]>>>;
  text?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  virtual?: Maybe<Scalars["Boolean"]>;
};

export type DesktopActivityDate = {
  date?: InputMaybe<Scalars["String"]>;
  timezone?: InputMaybe<Scalars["String"]>;
};

export type DesktopActivityDateDto = {
  __typename?: "DesktopActivityDateDTO";
  date?: Maybe<Scalars["String"]>;
  timezone?: Maybe<Scalars["String"]>;
};

export type DesktopActivityLink = {
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Scalars["String"]>;
};

export type DesktopActivityLinksDto = {
  __typename?: "DesktopActivityLinksDTO";
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
  institutionId?: Maybe<Scalars["String"]>;
};

export type DesktopActivityParticipant = {
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  participantId?: InputMaybe<Scalars["String"]>;
};

export type DesktopActivityParticipantsDto = {
  __typename?: "DesktopActivityParticipantsDTO";
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  participantId?: Maybe<Scalars["String"]>;
};

export type DesktopActivityResult = {
  __typename?: "DesktopActivityResult";
  categoryCount?: Maybe<DesktopActivityCategoryCountDto>;
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopActivityDto>>>;
};

export type DesktopActivityRevisionsDto = {
  __typename?: "DesktopActivityRevisionsDTO";
  date?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  profileId?: Maybe<Scalars["String"]>;
};

export type DesktopAddressBookDto = {
  __typename?: "DesktopAddressBookDTO";
  contactId?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  lists?: Maybe<Array<Maybe<Scalars["String"]>>>;
  organizationId?: Maybe<Scalars["String"]>;
  reference?: Maybe<EntityReferenceDto>;
};

export type DesktopAddressBookResult = {
  __typename?: "DesktopAddressBookResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopAddressBookDto>>>;
};

export type DesktopContactDto = {
  __typename?: "DesktopContactDTO";
  bio?: Maybe<Scalars["String"]>;
  contactHoldingCurrent?: Maybe<Array<Maybe<ContactHoldingCurrentDto>>>;
  coverage?: Maybe<Scalars["Boolean"]>;
  directPhone?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  favorite?: Maybe<Array<Maybe<FavoriteDto>>>;
  fullName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  jobs?: Maybe<Array<Maybe<ContactJobDto>>>;
  managedFunds?: Maybe<Array<Maybe<ManagedFundDto>>>;
  mobile?: Maybe<Scalars["String"]>;
  nickname?: Maybe<Scalars["String"]>;
  phoneExtension?: Maybe<Scalars["String"]>;
  salutation?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  strategy?: Maybe<Array<Maybe<ContactStrategyDto>>>;
  suffixProf?: Maybe<Scalars["String"]>;
};

export type DesktopContactDtoContactHoldingCurrentArgs = {
  securityId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  source?: InputMaybe<Scalars["String"]>;
};

export type DesktopContactEntity = {
  directPhone?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  jobs?: InputMaybe<Array<InputMaybe<DesktopContactJobInput>>>;
  lastName?: InputMaybe<Scalars["String"]>;
  mobile?: InputMaybe<Scalars["String"]>;
  nickname?: InputMaybe<Scalars["String"]>;
};

export type DesktopContactJobInput = {
  address1?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  countryName?: InputMaybe<Scalars["String"]>;
  directPhone?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  entityId?: InputMaybe<Scalars["String"]>;
  institutionName?: InputMaybe<Scalars["String"]>;
  institutionType?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  postalCode?: InputMaybe<Scalars["String"]>;
  stateProvince?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type DesktopContactResult = {
  __typename?: "DesktopContactResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopContactDto>>>;
};

export type DesktopCorporateParticipantDto = {
  __typename?: "DesktopCorporateParticipantDTO";
  firstName?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  jobs?: Maybe<Array<Maybe<DesktopCorporateParticipantJob>>>;
  lastName?: Maybe<Scalars["String"]>;
  mobile?: Maybe<Scalars["String"]>;
  nickname?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
};

export type DesktopCorporateParticipantJob = {
  __typename?: "DesktopCorporateParticipantJob";
  active?: Maybe<Scalars["Boolean"]>;
  address1?: Maybe<Scalars["String"]>;
  address2?: Maybe<Scalars["String"]>;
  address3?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  cityStateZip?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  countryName?: Maybe<Scalars["String"]>;
  directPhone?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  fax?: Maybe<Scalars["String"]>;
  functions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  stateProvince?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type DesktopCorporateParticipantResult = {
  __typename?: "DesktopCorporateParticipantResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopCorporateParticipantDto>>>;
};

export type DesktopCreateActivityId = {
  __typename?: "DesktopCreateActivityId";
  id?: Maybe<Scalars["String"]>;
};

export type DesktopCreateActivityResult = {
  __typename?: "DesktopCreateActivityResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopCreateActivityId>>>;
};

export type DesktopCreateContactId = {
  __typename?: "DesktopCreateContactId";
  id?: Maybe<Scalars["String"]>;
};

export type DesktopCreateContactResult = {
  __typename?: "DesktopCreateContactResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopCreateContactId>>>;
};

export type DesktopCreateFavoriteId = {
  __typename?: "DesktopCreateFavoriteId";
  id?: Maybe<Scalars["String"]>;
};

export type DesktopCreateFavoriteResult = {
  __typename?: "DesktopCreateFavoriteResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopCreateFavoriteId>>>;
};

export type DesktopCreateTagResult = {
  __typename?: "DesktopCreateTagResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopTagDto>>>;
};

export type DesktopDeleteActivityResult = {
  __typename?: "DesktopDeleteActivityResult";
  count?: Maybe<Scalars["Int"]>;
};

export type DesktopDeleteFavoriteResult = {
  __typename?: "DesktopDeleteFavoriteResult";
  count?: Maybe<Scalars["Int"]>;
};

export type DesktopDeleteTagResult = {
  __typename?: "DesktopDeleteTagResult";
  count?: Maybe<Scalars["Int"]>;
};

export type DesktopFundDto = {
  __typename?: "DesktopFundDTO";
  active?: Maybe<Scalars["Boolean"]>;
  countryCode?: Maybe<Scalars["String"]>;
  countryName?: Maybe<Scalars["String"]>;
  equityAUM?: Maybe<Scalars["Float"]>;
  fundName?: Maybe<Scalars["String"]>;
  fundType?: Maybe<Scalars["String"]>;
  fundTypeDesc?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  institutionId?: Maybe<Scalars["String"]>;
  institutionName?: Maybe<Scalars["String"]>;
  metro?: Maybe<Scalars["String"]>;
  portfolioValue?: Maybe<Scalars["Float"]>;
  qualityRating?: Maybe<Scalars["Float"]>;
  region?: Maybe<Scalars["String"]>;
  style?: Maybe<Scalars["String"]>;
  turnover?: Maybe<Scalars["String"]>;
};

export type DesktopFundHoldingCurrentDto = {
  __typename?: "DesktopFundHoldingCurrentDTO";
  change?: Maybe<Scalars["Float"]>;
  changePercent?: Maybe<Scalars["Float"]>;
  current?: Maybe<Scalars["Float"]>;
  currentQtrDate?: Maybe<Scalars["String"]>;
  filingType?: Maybe<Scalars["String"]>;
  fundCountryCode?: Maybe<Scalars["String"]>;
  fundCountryName?: Maybe<Scalars["String"]>;
  fundEquityAUM?: Maybe<Scalars["Float"]>;
  fundId?: Maybe<Scalars["String"]>;
  fundName?: Maybe<Scalars["String"]>;
  fundPortfolioValue?: Maybe<Scalars["Float"]>;
  fundQualityRating?: Maybe<Scalars["Int"]>;
  fundRegion?: Maybe<Scalars["String"]>;
  fundStyle?: Maybe<Scalars["String"]>;
  fundTurnover?: Maybe<Scalars["String"]>;
  fundType?: Maybe<Scalars["String"]>;
  holderType?: Maybe<Scalars["String"]>;
  institutionId?: Maybe<Scalars["String"]>;
  marketValue?: Maybe<Scalars["Float"]>;
  marketValueChange?: Maybe<Scalars["Float"]>;
  marketValueChangePercent?: Maybe<Scalars["Float"]>;
  marketValueChangeQtrPercent?: Maybe<Scalars["Float"]>;
  marketValueQtrChange?: Maybe<Scalars["Float"]>;
  percentPortfolio?: Maybe<Scalars["Float"]>;
  percentTSO?: Maybe<Scalars["Float"]>;
  prevQtrDate?: Maybe<Scalars["String"]>;
  prevReportDate?: Maybe<Scalars["String"]>;
  previousQtrPosition?: Maybe<Scalars["Float"]>;
  qtrChange?: Maybe<Scalars["Float"]>;
  qtrChangePercent?: Maybe<Scalars["Float"]>;
  reportDate?: Maybe<Scalars["String"]>;
  securityCapGroup?: Maybe<Scalars["String"]>;
  securityCountryCode?: Maybe<Scalars["String"]>;
  securityCountryName?: Maybe<Scalars["String"]>;
  securityId?: Maybe<Scalars["String"]>;
  securityIndustry?: Maybe<Scalars["String"]>;
  securityName?: Maybe<Scalars["String"]>;
  securityRegion?: Maybe<Scalars["String"]>;
  securitySector?: Maybe<Scalars["String"]>;
  securityTypeName?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  tickerId?: Maybe<Scalars["String"]>;
};

export type DesktopFundHoldingCurrentResult = {
  __typename?: "DesktopFundHoldingCurrentResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopFundHoldingCurrentDto>>>;
  sum?: Maybe<Scalars["Float"]>;
};

export type DesktopFundHoldingCurrentResultSumArgs = {
  field?: InputMaybe<Scalars["String"]>;
};

export type DesktopFundHoldingHistoricalDto = {
  __typename?: "DesktopFundHoldingHistoricalDTO";
  fundId?: Maybe<Scalars["String"]>;
  fundName?: Maybe<Scalars["String"]>;
  fundStyle?: Maybe<Scalars["String"]>;
  fundTurnover?: Maybe<Scalars["String"]>;
  holderType?: Maybe<Scalars["String"]>;
  q1Change?: Maybe<Scalars["Float"]>;
  q1Value?: Maybe<Scalars["Float"]>;
  q2Change?: Maybe<Scalars["Float"]>;
  q2Value?: Maybe<Scalars["Float"]>;
  q3Change?: Maybe<Scalars["Float"]>;
  q3Value?: Maybe<Scalars["Float"]>;
  q4Change?: Maybe<Scalars["Float"]>;
  q4Value?: Maybe<Scalars["Float"]>;
  q5Change?: Maybe<Scalars["Float"]>;
  q5Value?: Maybe<Scalars["Float"]>;
  q6Change?: Maybe<Scalars["Float"]>;
  q6Value?: Maybe<Scalars["Float"]>;
  q7Change?: Maybe<Scalars["Float"]>;
  q7Value?: Maybe<Scalars["Float"]>;
  q8Change?: Maybe<Scalars["Float"]>;
  q8Value?: Maybe<Scalars["Float"]>;
  q9Change?: Maybe<Scalars["Float"]>;
  q9Value?: Maybe<Scalars["Float"]>;
  q10Change?: Maybe<Scalars["Float"]>;
  q10Value?: Maybe<Scalars["Float"]>;
  q11Change?: Maybe<Scalars["Float"]>;
  q11Value?: Maybe<Scalars["Float"]>;
  q12Change?: Maybe<Scalars["Float"]>;
  q12Value?: Maybe<Scalars["Float"]>;
  q13Change?: Maybe<Scalars["Float"]>;
  q13Value?: Maybe<Scalars["Float"]>;
  q14Change?: Maybe<Scalars["Float"]>;
  q14Value?: Maybe<Scalars["Float"]>;
  q15Change?: Maybe<Scalars["Float"]>;
  q15Value?: Maybe<Scalars["Float"]>;
  q16Change?: Maybe<Scalars["Float"]>;
  q16Value?: Maybe<Scalars["Float"]>;
  q17Change?: Maybe<Scalars["Float"]>;
  q17Value?: Maybe<Scalars["Float"]>;
  q18Change?: Maybe<Scalars["Float"]>;
  q18Value?: Maybe<Scalars["Float"]>;
  q19Change?: Maybe<Scalars["Float"]>;
  q19Value?: Maybe<Scalars["Float"]>;
  q20Change?: Maybe<Scalars["Float"]>;
  q20Value?: Maybe<Scalars["Float"]>;
  securityId?: Maybe<Scalars["String"]>;
  securityName?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  tickerId?: Maybe<Scalars["String"]>;
};

export type DesktopFundHoldingHistoricalResult = {
  __typename?: "DesktopFundHoldingHistoricalResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopFundHoldingHistoricalDto>>>;
};

export type DesktopFundResult = {
  __typename?: "DesktopFundResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopFundDto>>>;
};

export type DesktopInstHoldingCurrentDto = {
  __typename?: "DesktopInstHoldingCurrentDTO";
  activist?: Maybe<Scalars["Boolean"]>;
  change?: Maybe<Scalars["Float"]>;
  current?: Maybe<Scalars["Float"]>;
  currentQtrDate?: Maybe<Scalars["String"]>;
  filingOrigin?: Maybe<Scalars["String"]>;
  filingSource?: Maybe<Scalars["String"]>;
  filingType?: Maybe<Scalars["String"]>;
  holderType?: Maybe<Scalars["String"]>;
  holdingType?: Maybe<Scalars["String"]>;
  institutionCountryName?: Maybe<Scalars["String"]>;
  institutionEquityAUM?: Maybe<Scalars["Float"]>;
  institutionId?: Maybe<Scalars["String"]>;
  institutionName?: Maybe<Scalars["String"]>;
  institutionQualityRating?: Maybe<Scalars["Int"]>;
  institutionRegion?: Maybe<Scalars["String"]>;
  institutionStyle?: Maybe<Scalars["String"]>;
  institutionTotalAUM?: Maybe<Scalars["Float"]>;
  institutionTurnover?: Maybe<Scalars["String"]>;
  institutionType?: Maybe<Scalars["String"]>;
  marketValue?: Maybe<Scalars["Float"]>;
  marketValueChange?: Maybe<Scalars["Float"]>;
  marketValueQtrChange?: Maybe<Scalars["Float"]>;
  percentPortfolio?: Maybe<Scalars["Float"]>;
  percentTSO?: Maybe<Scalars["Float"]>;
  prevReportDate?: Maybe<Scalars["String"]>;
  previousQtrPosition?: Maybe<Scalars["Float"]>;
  qtrChange?: Maybe<Scalars["Float"]>;
  reportDate?: Maybe<Scalars["String"]>;
  securityActive?: Maybe<Scalars["Boolean"]>;
  securityCapGroup?: Maybe<Scalars["String"]>;
  securityCountryCode?: Maybe<Scalars["String"]>;
  securityCountryName?: Maybe<Scalars["String"]>;
  securityId?: Maybe<Scalars["String"]>;
  securityIndustry?: Maybe<Scalars["String"]>;
  securityName?: Maybe<Scalars["String"]>;
  securityRegion?: Maybe<Scalars["String"]>;
  securitySector?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  tickerId?: Maybe<Scalars["String"]>;
};

export type DesktopInstHoldingCurrentResult = {
  __typename?: "DesktopInstHoldingCurrentResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopInstHoldingCurrentDto>>>;
  sum?: Maybe<Scalars["Float"]>;
};

export type DesktopInstHoldingCurrentResultSumArgs = {
  field?: InputMaybe<Scalars["String"]>;
};

export type DesktopInstHoldingHistoricalDto = {
  __typename?: "DesktopInstHoldingHistoricalDTO";
  holderType?: Maybe<Scalars["String"]>;
  holdingType?: Maybe<Scalars["String"]>;
  institutionId?: Maybe<Scalars["String"]>;
  institutionName?: Maybe<Scalars["String"]>;
  institutionRegion?: Maybe<Scalars["String"]>;
  institutionStyle?: Maybe<Scalars["String"]>;
  institutionTurnover?: Maybe<Scalars["String"]>;
  institutionType?: Maybe<Scalars["String"]>;
  percentTSO?: Maybe<Scalars["Float"]>;
  q1Change?: Maybe<Scalars["Float"]>;
  q1Value?: Maybe<Scalars["Float"]>;
  q2Change?: Maybe<Scalars["Float"]>;
  q2Value?: Maybe<Scalars["Float"]>;
  q3Change?: Maybe<Scalars["Float"]>;
  q3Value?: Maybe<Scalars["Float"]>;
  q4Change?: Maybe<Scalars["Float"]>;
  q4Value?: Maybe<Scalars["Float"]>;
  q5Change?: Maybe<Scalars["Float"]>;
  q5Value?: Maybe<Scalars["Float"]>;
  q6Change?: Maybe<Scalars["Float"]>;
  q6Value?: Maybe<Scalars["Float"]>;
  q7Change?: Maybe<Scalars["Float"]>;
  q7Value?: Maybe<Scalars["Float"]>;
  q8Change?: Maybe<Scalars["Float"]>;
  q8Value?: Maybe<Scalars["Float"]>;
  q9Change?: Maybe<Scalars["Float"]>;
  q9Value?: Maybe<Scalars["Float"]>;
  q10Change?: Maybe<Scalars["Float"]>;
  q10Value?: Maybe<Scalars["Float"]>;
  q11Change?: Maybe<Scalars["Float"]>;
  q11Value?: Maybe<Scalars["Float"]>;
  q12Change?: Maybe<Scalars["Float"]>;
  q12Value?: Maybe<Scalars["Float"]>;
  q13Change?: Maybe<Scalars["Float"]>;
  q13Value?: Maybe<Scalars["Float"]>;
  q14Change?: Maybe<Scalars["Float"]>;
  q14Value?: Maybe<Scalars["Float"]>;
  q15Change?: Maybe<Scalars["Float"]>;
  q15Value?: Maybe<Scalars["Float"]>;
  q16Change?: Maybe<Scalars["Float"]>;
  q16Value?: Maybe<Scalars["Float"]>;
  q17Change?: Maybe<Scalars["Float"]>;
  q17Value?: Maybe<Scalars["Float"]>;
  q18Change?: Maybe<Scalars["Float"]>;
  q18Value?: Maybe<Scalars["Float"]>;
  q19Change?: Maybe<Scalars["Float"]>;
  q19Value?: Maybe<Scalars["Float"]>;
  q20Change?: Maybe<Scalars["Float"]>;
  q20Value?: Maybe<Scalars["Float"]>;
  securityId?: Maybe<Scalars["String"]>;
  securityName?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  tickerId?: Maybe<Scalars["String"]>;
};

export type DesktopInstHoldingHistoricalResult = {
  __typename?: "DesktopInstHoldingHistoricalResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopInstHoldingHistoricalDto>>>;
};

export type DesktopInstitutionDto = {
  __typename?: "DesktopInstitutionDTO";
  active?: Maybe<Scalars["Boolean"]>;
  activist?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<InstitutionAddress>;
  equityAUM?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["String"]>;
  institutionName?: Maybe<Scalars["String"]>;
  institutionType?: Maybe<Scalars["String"]>;
  investmentApproach?: Maybe<Scalars["String"]>;
  profile?: Maybe<Scalars["String"]>;
  qualityRating?: Maybe<Scalars["Int"]>;
  style?: Maybe<Scalars["String"]>;
  totalAUM?: Maybe<Scalars["Int"]>;
  turnover?: Maybe<Scalars["String"]>;
};

export type DesktopInstitutionResult = {
  __typename?: "DesktopInstitutionResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopInstitutionDto>>>;
};

export type DesktopMe = {
  __typename?: "DesktopMe";
  client?: Maybe<Client>;
  demo?: Maybe<Scalars["Boolean"]>;
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  organization?: Maybe<DesktopOrganization>;
  organizationId?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  products?: Maybe<Array<Maybe<Scalars["String"]>>>;
  region?: Maybe<Scalars["String"]>;
  services?: Maybe<Array<Maybe<Service>>>;
  terms?: Maybe<Terms>;
  title?: Maybe<Scalars["String"]>;
  trial?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Type>;
  user?: Maybe<Scalars["String"]>;
};

export type DesktopMoverDto = {
  __typename?: "DesktopMoverDTO";
  change?: Maybe<Scalars["Float"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
  marketValue?: Maybe<Scalars["Float"]>;
  marketValueChange?: Maybe<Scalars["Float"]>;
  percentPortfolio?: Maybe<Scalars["Float"]>;
  qtrChange?: Maybe<Scalars["Float"]>;
  securityId?: Maybe<Scalars["String"]>;
  securityName?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  tickerId?: Maybe<Scalars["String"]>;
};

export type DesktopMoverResult = {
  __typename?: "DesktopMoverResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopMoverDto>>>;
  sum?: Maybe<Scalars["Float"]>;
};

export type DesktopMoverResultSumArgs = {
  field?: InputMaybe<Scalars["String"]>;
};

export type DesktopOrganization = {
  __typename?: "DesktopOrganization";
  address?: Maybe<Scalars["String"]>;
  entitlements?: Maybe<Array<Maybe<Entitlement>>>;
  exchange?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  sector?: Maybe<Scalars["String"]>;
  suspended?: Maybe<Scalars["Boolean"]>;
  symbol?: Maybe<Scalars["String"]>;
  tickers?: Maybe<Array<Maybe<Ticker>>>;
};

export type DesktopQuickSearchDto = {
  __typename?: "DesktopQuickSearchDTO";
  _id?: Maybe<Scalars["String"]>;
  address?: Maybe<Array<Maybe<Scalars["String"]>>>;
  country?: Maybe<Array<Maybe<Scalars["String"]>>>;
  countryCode?: Maybe<Array<Maybe<Scalars["String"]>>>;
  countryName?: Maybe<Array<Maybe<Scalars["String"]>>>;
  email?: Maybe<Array<Maybe<Scalars["String"]>>>;
  entityId?: Maybe<Scalars["String"]>;
  exchange?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  institution?: Maybe<Array<Maybe<Scalars["String"]>>>;
  locationCity?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name?: Maybe<Scalars["String"]>;
  phone?: Maybe<Array<Maybe<Scalars["String"]>>>;
  q4EntityId?: Maybe<Scalars["String"]>;
  regionName?: Maybe<Array<Maybe<Scalars["String"]>>>;
  score?: Maybe<Scalars["Float"]>;
  source?: Maybe<Scalars["String"]>;
  sourceId?: Maybe<Scalars["String"]>;
  stateProvinceCode?: Maybe<Scalars["String"]>;
  stateProvinceName?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  title?: Maybe<Array<Maybe<Scalars["String"]>>>;
  type?: Maybe<Scalars["String"]>;
};

export type DesktopQuickSearchResult = {
  __typename?: "DesktopQuickSearchResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopQuickSearchDto>>>;
};

export type DesktopTagDto = {
  __typename?: "DesktopTagDTO";
  created?: Maybe<Scalars["String"]>;
  entity?: Maybe<TagReferenceDto>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  organizationId?: Maybe<Scalars["String"]>;
  profileId?: Maybe<Scalars["String"]>;
};

export type DesktopTagEntity = {
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Scalars["String"]>;
};

export type DesktopTagResult = {
  __typename?: "DesktopTagResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DesktopTagDto>>>;
};

export type DesktopUpdateActivityResult = {
  __typename?: "DesktopUpdateActivityResult";
  count?: Maybe<Scalars["Int"]>;
};

export type DisconnectEmailUserResponse = {
  __typename?: "DisconnectEmailUserResponse";
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type DownloadMetricsDailyDto = {
  __typename?: "DownloadMetricsDailyDTO";
  date?: Maybe<Scalars["Date"]>;
  downloads?: Maybe<Scalars["Int"]>;
  topDownloadedFileName?: Maybe<Scalars["String"]>;
  uniqueDownloads?: Maybe<Scalars["Int"]>;
};

export type DownloadMetricsDailyResult = {
  __typename?: "DownloadMetricsDailyResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<DownloadMetricsDailyDto>>>;
};

export enum Engagement_Dimension {
  MARKET_CAP = "MARKET_CAP",
  SECTOR = "SECTOR",
}

export enum Engagement_Metric {
  EMAIL_ALERT_OPENS = "EMAIL_ALERT_OPENS",
  EVENTS_ATTENDEES = "EVENTS_ATTENDEES",
  WEBSITE_VISITS = "WEBSITE_VISITS",
}

export enum Engagement_Type {
  EMAILS = "EMAILS",
  EVENTS = "EVENTS",
  WEBSITE = "WEBSITE",
}

export enum Entity_Type {
  fund = "fund",
  institution = "institution",
}

export type EpEventCreateDataInput = {
  additionalContacts?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  additionalDetails?: InputMaybe<Scalars["String"]>;
  eventDate: Scalars["String"];
  eventDuration: Scalars["Float"];
  eventPlan?: InputMaybe<EpEventPlan>;
  eventPressReleaseDate?: InputMaybe<Scalars["String"]>;
  eventTime: Scalars["String"];
  eventTimezone: Scalars["String"];
  eventType: EpEventTypeEnum;
  nonEarnings?: InputMaybe<Scalars["KeyValue"]>;
  requestedService: EpRequestedServiceEnum;
  status: EpJobStatusEnum;
  title: Scalars["String"];
};

export type EpEventUpdateDataInput = {
  additionalContacts?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  additionalDetails?: InputMaybe<Scalars["String"]>;
  eventDate: Scalars["String"];
  eventDuration: Scalars["Float"];
  eventManager?: InputMaybe<EpEventManager>;
  eventPlan?: InputMaybe<EpEventPlan>;
  eventPressReleaseDate?: InputMaybe<Scalars["String"]>;
  eventTime: Scalars["String"];
  eventTimezone: Scalars["String"];
  eventType: EpEventTypeEnum;
  externalDetails?: InputMaybe<Scalars["String"]>;
  internalDetails?: InputMaybe<Scalars["String"]>;
  nonEarnings?: InputMaybe<Scalars["KeyValue"]>;
  postEventDetails?: InputMaybe<Scalars["String"]>;
  postEventLink?: InputMaybe<Scalars["String"]>;
  requestedService: EpRequestedServiceEnum;
  status: EpJobStatusEnum;
  title: Scalars["String"];
  webcastLink?: InputMaybe<Scalars["String"]>;
};

export type EarningsMessage = {
  __typename?: "EarningsMessage";
  createdAt: Scalars["DateToInteger"];
  createdBy: EarningsMessageUser;
  earningsPlanId: Scalars["String"];
  id?: Maybe<Scalars["String"]>;
  itemId?: Maybe<Scalars["String"]>;
  itemTitle?: Maybe<Scalars["String"]>;
  message: Scalars["String"];
  messageType: EarningsMessageType;
  stageId?: Maybe<Scalars["String"]>;
};

export type EarningsMessageCreationDto = {
  earningsPlanId: Scalars["String"];
  id?: InputMaybe<Scalars["String"]>;
  itemId?: InputMaybe<Scalars["String"]>;
  itemTitle?: InputMaybe<Scalars["String"]>;
  message: Scalars["String"];
  messageType: EarningsMessageType;
  stageId?: InputMaybe<Scalars["String"]>;
};

export type EarningsMessageCreationResult = {
  __typename?: "EarningsMessageCreationResult";
  data?: Maybe<EarningsMessage>;
  success: Scalars["Boolean"];
};

export type EarningsMessageListRequestDto = {
  earningsPlanId: Scalars["String"];
  itemId?: InputMaybe<Scalars["String"]>;
  messageTypes?: InputMaybe<Array<InputMaybe<EarningsMessageType>>>;
  paginationCheckpoint?: InputMaybe<EarningsMessagePaginationCheckpointInput>;
  stageId?: InputMaybe<Scalars["String"]>;
};

export type EarningsMessageListResult = {
  __typename?: "EarningsMessageListResult";
  data?: Maybe<EarningsMessageResult>;
  success: Scalars["Boolean"];
};

export type EarningsMessagePaginationCheckpoint = {
  __typename?: "EarningsMessagePaginationCheckpoint";
  createdAt: Scalars["DateToInteger"];
  earningsPlanId: Scalars["String"];
};

export type EarningsMessagePaginationCheckpointInput = {
  createdAt: Scalars["DateToInteger"];
  earningsPlanId: Scalars["String"];
};

export type EarningsMessageResult = {
  __typename?: "EarningsMessageResult";
  items?: Maybe<Array<Maybe<EarningsMessage>>>;
  paginationCheckpoint?: Maybe<EarningsMessagePaginationCheckpoint>;
};

export enum EarningsMessageType {
  clientEarningsPlanFeedback = "clientEarningsPlanFeedback",
  clientItemFeedback = "clientItemFeedback",
  internalUserMessage = "internalUserMessage",
}

export type EarningsMessageUser = {
  __typename?: "EarningsMessageUser";
  email: Scalars["String"];
  id: Scalars["String"];
  name: Scalars["String"];
};

export type EarningsPlan = {
  __typename?: "EarningsPlan";
  createdAt: Scalars["DateToInteger"];
  createdBy: EarningsPlanUser;
  date: Scalars["DateToInteger"];
  emails?: Maybe<Array<Maybe<AccountUser>>>;
  history?: Maybe<Array<Maybe<EarningsPlanLog>>>;
  id: Scalars["String"];
  lastUpdatedAt: Scalars["DateToInteger"];
  lastUpdatedBy: EarningsPlanUser;
  organizationId: Scalars["String"];
  quarter: Scalars["Int"];
  sfAccountId?: Maybe<Scalars["String"]>;
  sfCaseId?: Maybe<Scalars["String"]>;
  stages?: Maybe<Array<Maybe<EarningsPlanStage>>>;
  status?: Maybe<EarningsPlanStatus>;
  studioBucketId?: Maybe<Scalars["Int"]>;
  studioSiteId?: Maybe<Scalars["String"]>;
  timezone?: Maybe<EarningsPlanTimezone>;
  title?: Maybe<Scalars["String"]>;
  year: Scalars["Int"];
};

export type EarningsPlanCreationDto = {
  date: Scalars["DateToInteger"];
  emails?: InputMaybe<Array<InputMaybe<AccountUserDto>>>;
  quarter: Scalars["Int"];
  sfAccountId?: InputMaybe<Scalars["String"]>;
  sfCaseId?: InputMaybe<Scalars["String"]>;
  stages?: InputMaybe<Array<InputMaybe<EarningsPlanStageCreationDto>>>;
  status?: InputMaybe<EarningsPlanStatus>;
  studioBucketId?: InputMaybe<Scalars["Int"]>;
  studioSiteId?: InputMaybe<Scalars["String"]>;
  timezone?: InputMaybe<EarningsPlanTimezoneDto>;
  year: Scalars["Int"];
};

export type EarningsPlanCreationResult = {
  __typename?: "EarningsPlanCreationResult";
  data: EarningsPlan;
};

export type EarningsPlanItem = {
  __typename?: "EarningsPlanItem";
  approvedAt?: Maybe<Scalars["DateToInteger"]>;
  approvedBy?: Maybe<EarningsPlanUser>;
  createdAt: Scalars["DateToInteger"];
  createdBy: EarningsPlanUser;
  description?: Maybe<Scalars["String"]>;
  documentCategory?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  fileS3Id?: Maybe<Scalars["String"]>;
  fileType?: Maybe<FileType>;
  id: Scalars["String"];
  intendedCrossingDate?: Maybe<Scalars["DateToInteger"]>;
  intendedCrossingTime?: Maybe<Scalars["String"]>;
  lastEditedAt?: Maybe<Scalars["DateToInteger"]>;
  lastEditedBy?: Maybe<EarningsPlanUser>;
  lastUpdatedAt: Scalars["DateToInteger"];
  lastUpdatedBy: EarningsPlanUser;
  order: Scalars["Float"];
  pressReleaseHeadline?: Maybe<Scalars["String"]>;
  status: EarningsPlanItemStatus;
  studioFilePath?: Maybe<Scalars["String"]>;
  submittedContentChange?: Maybe<Scalars["String"]>;
  submittedFileName?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type: EarningsPlanItemType;
  uploadedAt?: Maybe<Scalars["DateToInteger"]>;
  uploadedBy?: Maybe<EarningsPlanUser>;
};

export type EarningsPlanItemCreationDto = {
  description?: InputMaybe<Scalars["String"]>;
  documentCategory?: InputMaybe<Scalars["String"]>;
  fileName?: InputMaybe<Scalars["String"]>;
  fileType?: InputMaybe<FileType>;
  intendedCrossingDate?: InputMaybe<Scalars["DateToInteger"]>;
  intendedCrossingTime?: InputMaybe<Scalars["String"]>;
  order: Scalars["Float"];
  pressReleaseHeadline?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<EarningsPlanItemStatus>;
  studioFilePath?: InputMaybe<Scalars["String"]>;
  submittedContentChange?: InputMaybe<Scalars["String"]>;
  submittedFileName?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  type: EarningsPlanItemType;
};

export type EarningsPlanItemResult = {
  __typename?: "EarningsPlanItemResult";
  data: EarningsPlanItem;
};

export enum EarningsPlanItemStatus {
  approved = "approved",
  complete = "complete",
  inProgress = "inProgress",
  open = "open",
  published = "published",
  readyForApproval = "readyForApproval",
}

export enum EarningsPlanItemType {
  content = "content",
  document = "document",
  pressRelease = "pressRelease",
}

export type EarningsPlanItemUpdateByClientDto = {
  description?: InputMaybe<Scalars["String"]>;
  documentCategory?: InputMaybe<Scalars["String"]>;
  fileName?: InputMaybe<Scalars["String"]>;
  fileS3Id?: InputMaybe<Scalars["String"]>;
  fileType?: InputMaybe<FileType>;
  id: Scalars["String"];
  intendedCrossingDate?: InputMaybe<Scalars["DateToInteger"]>;
  intendedCrossingTime?: InputMaybe<Scalars["String"]>;
  order?: InputMaybe<Scalars["Int"]>;
  pressReleaseHeadline?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<EarningsPlanItemStatus>;
  studioFilePath?: InputMaybe<Scalars["String"]>;
  submittedContentChange?: InputMaybe<Scalars["String"]>;
  submittedFileName?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  type: EarningsPlanItemType;
};

export type EarningsPlanItemUpdateDto = {
  description?: InputMaybe<Scalars["String"]>;
  documentCategory?: InputMaybe<Scalars["String"]>;
  fileName?: InputMaybe<Scalars["String"]>;
  fileType?: InputMaybe<FileType>;
  id?: InputMaybe<Scalars["String"]>;
  intendedCrossingDate?: InputMaybe<Scalars["DateToInteger"]>;
  intendedCrossingTime?: InputMaybe<Scalars["String"]>;
  order: Scalars["Float"];
  pressReleaseHeadline?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<EarningsPlanItemStatus>;
  studioFilePath?: InputMaybe<Scalars["String"]>;
  submittedContentChange?: InputMaybe<Scalars["String"]>;
  submittedFileName?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  type: EarningsPlanItemType;
};

export type EarningsPlanLog = {
  __typename?: "EarningsPlanLog";
  createdAt: Scalars["DateToInteger"];
  createdBy: EarningsPlanUser;
  log: Scalars["String"];
};

export type EarningsPlanResult = {
  __typename?: "EarningsPlanResult";
  data: EarningsPlan;
};

export type EarningsPlanStage = {
  __typename?: "EarningsPlanStage";
  autoPublishStatus?: Maybe<StageAutoPublishStatus>;
  date?: Maybe<Scalars["DateToInteger"]>;
  id: Scalars["String"];
  items?: Maybe<Array<Maybe<EarningsPlanItem>>>;
  manualPublishRequired?: Maybe<Scalars["Int"]>;
  numberOfActionsRequired?: Maybe<Scalars["Int"]>;
  order: Scalars["Float"];
  publishedAt?: Maybe<Scalars["DateToInteger"]>;
  publishedBy?: Maybe<EarningsPlanUser>;
  stageType?: Maybe<EarningsPlanStageType>;
  status: EarningsPlanStageStatus;
  studioGroupId?: Maybe<Scalars["Int"]>;
  time?: Maybe<Scalars["Int"]>;
  timezone?: Maybe<EarningsPlanTimezone>;
};

export type EarningsPlanStageCreationDto = {
  autoPublishStatus?: InputMaybe<StageAutoPublishStatus>;
  date?: InputMaybe<Scalars["DateToInteger"]>;
  items?: InputMaybe<Array<InputMaybe<EarningsPlanItemCreationDto>>>;
  order: Scalars["Float"];
  stageType?: InputMaybe<EarningsPlanStageTypeDto>;
  status?: InputMaybe<EarningsPlanStageStatus>;
  studioGroupId?: InputMaybe<Scalars["Int"]>;
  time?: InputMaybe<Scalars["Int"]>;
  timezone?: InputMaybe<EarningsPlanTimezoneDto>;
};

export enum EarningsPlanStageStatus {
  open = "open",
  published = "published",
  publishingInProgress = "publishingInProgress",
}

export type EarningsPlanStageStatusResult = {
  __typename?: "EarningsPlanStageStatusResult";
  data: EarningsPlanStatus;
};

export type EarningsPlanStageType = {
  __typename?: "EarningsPlanStageType";
  label?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type EarningsPlanStageTypeDto = {
  label?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<StageTypeEnum>;
};

export type EarningsPlanStageUpdateDto = {
  autoPublishStatus?: InputMaybe<StageAutoPublishStatus>;
  date?: InputMaybe<Scalars["DateToInteger"]>;
  id?: InputMaybe<Scalars["String"]>;
  items?: InputMaybe<Array<InputMaybe<EarningsPlanItemUpdateDto>>>;
  order: Scalars["Float"];
  stageType?: InputMaybe<EarningsPlanStageTypeDto>;
  status?: InputMaybe<EarningsPlanStageStatus>;
  studioGroupId?: InputMaybe<Scalars["Int"]>;
  time?: InputMaybe<Scalars["Int"]>;
  timezone?: InputMaybe<EarningsPlanTimezoneDto>;
};

export enum EarningsPlanStatus {
  complete = "complete",
  delete = "delete",
  new = "new",
  open = "open",
  pendingReview = "pendingReview",
}

export type EarningsPlanStatusResult = {
  __typename?: "EarningsPlanStatusResult";
  data: EarningsPlanStatus;
};

export type EarningsPlanTimezone = {
  __typename?: "EarningsPlanTimezone";
  label: Scalars["String"];
  value: Scalars["String"];
};

export type EarningsPlanTimezoneDto = {
  label: Scalars["String"];
  value: Scalars["String"];
};

export type EarningsPlanUpdateDto = {
  date: Scalars["DateToInteger"];
  emails?: InputMaybe<Array<InputMaybe<AccountUserDto>>>;
  id: Scalars["String"];
  organizationId?: InputMaybe<Scalars["String"]>;
  quarter: Scalars["Int"];
  sfAccountId?: InputMaybe<Scalars["String"]>;
  sfCaseId?: InputMaybe<Scalars["String"]>;
  stages?: InputMaybe<Array<InputMaybe<EarningsPlanStageUpdateDto>>>;
  status?: InputMaybe<EarningsPlanStatus>;
  studioBucketId?: InputMaybe<Scalars["Int"]>;
  studioSiteId?: InputMaybe<Scalars["String"]>;
  timezone?: InputMaybe<EarningsPlanTimezoneDto>;
  year: Scalars["Int"];
};

export type EarningsPlanUpdateResult = {
  __typename?: "EarningsPlanUpdateResult";
  data: EarningsPlan;
};

export type EarningsPlanUser = {
  __typename?: "EarningsPlanUser";
  email: Scalars["String"];
  id: Scalars["String"];
  name: Scalars["String"];
};

export type EarningsPlansByOrganizationResultDto = {
  __typename?: "EarningsPlansByOrganizationResultDTO";
  count: Scalars["Int"];
  items: Array<Maybe<EarningsPlan>>;
};

export type EmailAttachment = {
  id: Scalars["String"];
  name: Scalars["String"];
};

export type EmailParticipant = {
  email: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type EmailRecipient = {
  contactId: Scalars["String"];
  email: Scalars["String"];
  firstName?: InputMaybe<Scalars["String"]>;
  fullName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  organizationName?: InputMaybe<Scalars["String"]>;
};

export type EngagementBenchmarkDto = {
  __typename?: "EngagementBenchmarkDTO";
  emailsOpened?: Maybe<Scalars["Float"]>;
  eventsAttended?: Maybe<Scalars["Float"]>;
  marketCap?: Maybe<Scalars["String"]>;
  marketCapAverage?: Maybe<Scalars["Float"]>;
  percentile?: Maybe<Scalars["Float"]>;
  periodType?: Maybe<Scalars["String"]>;
  sector?: Maybe<Scalars["String"]>;
  sectorAverage?: Maybe<Scalars["Float"]>;
  websiteVisits?: Maybe<Scalars["Int"]>;
};

export type EngagementBenchmarkResult = {
  __typename?: "EngagementBenchmarkResult";
  items?: Maybe<Array<Maybe<EngagementBenchmarkDto>>>;
};

export type EngagementDto = {
  __typename?: "EngagementDTO";
  activist?: Maybe<Scalars["Boolean"]>;
  activistType?: Maybe<Activist_Type>;
  avgTimeSpent?: Maybe<Scalars["Float"]>;
  currentPosition?: Maybe<Scalars["Int"]>;
  downloads?: Maybe<Scalars["Int"]>;
  downloadsPercentageChange?: Maybe<Scalars["Float"]>;
  eaMetricsId?: Maybe<Scalars["String"]>;
  emailOpens?: Maybe<Scalars["Int"]>;
  engagementChange?: Maybe<Scalars["Float"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Entity_Type>;
  eventViews?: Maybe<Scalars["Int"]>;
  eventViewsName?: Maybe<Scalars["String"]>;
  eventViewsUrl?: Maybe<Scalars["String"]>;
  lastFilingDate?: Maybe<Scalars["Date"]>;
  lastViewed?: Maybe<Scalars["Date"]>;
  monitorConnection?: Maybe<MonitorDto>;
  mostDownloadedFileName?: Maybe<Scalars["String"]>;
  mostDownloadedFileUrl?: Maybe<Scalars["String"]>;
  organizationId?: Maybe<Scalars["String"]>;
  pageViews?: Maybe<Scalars["Int"]>;
  percentageChange?: Maybe<Scalars["Float"]>;
  periodType?: Maybe<Scalars["String"]>;
  registrations?: Maybe<Scalars["Int"]>;
  registrationsName?: Maybe<Scalars["String"]>;
  registrationsUrl?: Maybe<Scalars["String"]>;
  topAvgTimeSpentTitle?: Maybe<Scalars["String"]>;
  topAvgTimeSpentUrl?: Maybe<Scalars["String"]>;
  topPageViewsTitle?: Maybe<Scalars["String"]>;
  topPageViewsUrl?: Maybe<Scalars["String"]>;
  topUniquePageViewsTitle?: Maybe<Scalars["String"]>;
  topUniquePageViewsUrl?: Maybe<Scalars["String"]>;
  total?: Maybe<Scalars["Int"]>;
  uniqueEventViews?: Maybe<Scalars["Int"]>;
  uniqueEventViewsName?: Maybe<Scalars["String"]>;
  uniqueEventViewsUrl?: Maybe<Scalars["String"]>;
  uniquePageViews?: Maybe<Scalars["Int"]>;
  uniqueRegistrations?: Maybe<Scalars["Int"]>;
  uniqueRegistrationsName?: Maybe<Scalars["String"]>;
  uniqueRegistrationsUrl?: Maybe<Scalars["String"]>;
};

export type EngagementEmailDailyDto = {
  __typename?: "EngagementEmailDailyDTO";
  date?: Maybe<Scalars["Date"]>;
  emailOpens?: Maybe<Scalars["Float"]>;
};

export type EngagementEmailDailyResult = {
  __typename?: "EngagementEmailDailyResult";
  hasDimensionData?: Maybe<Scalars["Boolean"]>;
  items?: Maybe<Array<Maybe<EngagementEmailDailyDto>>>;
};

export type EngagementEventDailyDto = {
  __typename?: "EngagementEventDailyDTO";
  date?: Maybe<Scalars["Date"]>;
  name?: Maybe<Scalars["String"]>;
};

export type EngagementEventDailyResult = {
  __typename?: "EngagementEventDailyResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<EngagementEventDailyDto>>>;
};

export type EngagementFilter = {
  activist?: InputMaybe<Scalars["Boolean"]>;
  engagementType?: InputMaybe<Array<InputMaybe<Engagement_Type>>>;
  includeUnengaged?: InputMaybe<Scalars["Boolean"]>;
  isMonitored?: InputMaybe<Scalars["Boolean"]>;
  ownsMe?: InputMaybe<Scalars["Boolean"]>;
  periodType?: InputMaybe<Period_Type>;
};

export type EngagementResult = {
  __typename?: "EngagementResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<EngagementDto>>>;
  sum?: Maybe<Scalars["Float"]>;
};

export type EngagementResultSumArgs = {
  field?: InputMaybe<Scalars["String"]>;
};

export type EngagementSimilarityDto = {
  __typename?: "EngagementSimilarityDTO";
  engagements?: Maybe<Scalars["Float"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  frequency?: Maybe<Scalars["Float"]>;
  monitorConnection?: Maybe<MonitorDto>;
  recency?: Maybe<Scalars["Float"]>;
  rfmScore?: Maybe<Scalars["Float"]>;
  sector?: Maybe<Scalars["String"]>;
};

export type EngagementSimilarityResult = {
  __typename?: "EngagementSimilarityResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<EngagementSimilarityDto>>>;
};

export type Entitlement = {
  __typename?: "Entitlement";
  enabled?: Maybe<Scalars["Boolean"]>;
  status?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Entity = {
  __typename?: "Entity";
  id?: Maybe<Scalars["String"]>;
  type?: Maybe<EntityType>;
};

export type EntityNote = {
  __typename?: "EntityNote";
  createdBy?: Maybe<Scalars["String"]>;
  createdDate?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  modifiedBy?: Maybe<Scalars["String"]>;
  modifiedDate?: Maybe<Scalars["String"]>;
  note?: Maybe<Scalars["String"]>;
  organizationId?: Maybe<Scalars["String"]>;
};

export type EntityNoteResponse = {
  __typename?: "EntityNoteResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<EntityNote>>>;
};

export type EntityReferenceDto = {
  __typename?: "EntityReferenceDTO";
  contactType?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  item?: Maybe<Scalars["String"]>;
  jobs?: Maybe<Array<Maybe<JobReferenceDto>>>;
  source?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type EntityResponse = {
  id?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<EntityType>;
};

export type EntitySearchDto = {
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<SearchEntityType>;
};

export type EntitySearchResult = {
  __typename?: "EntitySearchResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<EntitySearchDto>>>;
};

export enum EntityType {
  fund = "fund",
  institution = "institution",
}

export type EpEventConferenceExpectations = {
  participantLines?: InputMaybe<Scalars["Int"]>;
  speakerLines?: InputMaybe<Scalars["Int"]>;
  speakers?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EpEventConferenceExpectationsDto = {
  __typename?: "EpEventConferenceExpectationsDTO";
  participantLines?: Maybe<Scalars["Int"]>;
  speakerLines?: Maybe<Scalars["Int"]>;
  speakers?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type EpEventCreateDto = {
  __typename?: "EpEventCreateDTO";
  additionalContacts?: Maybe<Array<Maybe<Scalars["String"]>>>;
  additionalDetails?: Maybe<Scalars["String"]>;
  eventDate: Scalars["String"];
  eventDuration: Scalars["Float"];
  eventPlan: EpEventPlanDto;
  eventPressReleaseDate?: Maybe<Scalars["String"]>;
  eventTime: Scalars["String"];
  eventTimezone: Scalars["String"];
  eventType: EpEventTypeEnum;
  nonEarnings?: Maybe<Scalars["KeyValue"]>;
  requestedService: EpRequestedServiceEnum;
  status: EpJobStatusEnum;
  title: Scalars["String"];
};

export type EpEventManager = {
  email?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type EpEventManagerDto = {
  __typename?: "EpEventManagerDTO";
  email?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type EpEventPlan = {
  addons?: InputMaybe<Scalars["KeyValue"]>;
  expectations?: InputMaybe<EpEventPlanExpectations>;
  tier?: InputMaybe<EpEventPlanTier>;
};

export type EpEventPlanDto = {
  __typename?: "EpEventPlanDTO";
  addons?: Maybe<Scalars["KeyValue"]>;
  expectations?: Maybe<EpEventPlanExpectationsDto>;
  tier?: Maybe<EpEventPlanTier>;
};

export type EpEventPlanExpectations = {
  conference?: InputMaybe<EpEventConferenceExpectations>;
  webcast?: InputMaybe<EpEventWebcastExpectations>;
};

export type EpEventPlanExpectationsDto = {
  __typename?: "EpEventPlanExpectationsDTO";
  conference?: Maybe<EpEventConferenceExpectationsDto>;
  webcast?: Maybe<EpEventWebcastExpectationsDto>;
};

export enum EpEventPlanTier {
  base = "base",
  custom = "custom",
  plus = "plus",
  premium = "premium",
}

export enum EpEventTypeEnum {
  earnings = "earnings",
  non_earnings = "non_earnings",
}

export type EpEventUpdateDto = {
  __typename?: "EpEventUpdateDTO";
  additionalContacts?: Maybe<Array<Maybe<Scalars["String"]>>>;
  additionalDetails?: Maybe<Scalars["String"]>;
  eventDate: Scalars["String"];
  eventDuration: Scalars["Float"];
  eventManager?: Maybe<EpEventManagerDto>;
  eventPlan: EpEventPlanDto;
  eventPressReleaseDate?: Maybe<Scalars["String"]>;
  eventTime: Scalars["String"];
  eventTimezone: Scalars["String"];
  eventType: EpEventTypeEnum;
  externalDetails?: Maybe<Scalars["String"]>;
  internalDetails?: Maybe<Scalars["String"]>;
  nonEarnings?: Maybe<Scalars["KeyValue"]>;
  postEventDetails?: Maybe<Scalars["String"]>;
  postEventLink?: Maybe<Scalars["String"]>;
  requestedService: EpRequestedServiceEnum;
  status: EpJobStatusEnum;
  title: Scalars["String"];
  webcastLink?: Maybe<Scalars["String"]>;
};

export type EpEventWebcastExpectations = {
  participants?: InputMaybe<Scalars["Int"]>;
  questions?: InputMaybe<Scalars["String"]>;
};

export type EpEventWebcastExpectationsDto = {
  __typename?: "EpEventWebcastExpectationsDTO";
  participants?: Maybe<Scalars["Int"]>;
  questions?: Maybe<Scalars["String"]>;
};

export enum EpJobStatusEnum {
  approved = "approved",
  cancelled = "cancelled",
  changes_pending = "changes_pending",
  complete = "complete",
  pending = "pending",
}

export enum EpRequestedServiceEnum {
  conference_and_webcast = "conference_and_webcast",
  conference_call = "conference_call",
  webcast = "webcast",
}

export type EventAttachmentDto = {
  __typename?: "EventAttachmentDTO";
  documentType: Scalars["String"];
  path: Scalars["String"];
  size: Scalars["Int"];
  sortOrder: Scalars["Int"];
  title: Scalars["String"];
  type: Scalars["String"];
};

export type EventMetricsAggregateDto = {
  __typename?: "EventMetricsAggregateDTO";
  registrations?: Maybe<Scalars["Int"]>;
  registrationsPercentageChange?: Maybe<Scalars["Float"]>;
  topRegisteredEventName?: Maybe<Scalars["String"]>;
  topRegisteredEventUrl?: Maybe<Scalars["String"]>;
  topViewedEventName?: Maybe<Scalars["String"]>;
  topViewedEventUrl?: Maybe<Scalars["String"]>;
  views?: Maybe<Scalars["Int"]>;
  viewsPercentageChange?: Maybe<Scalars["Float"]>;
};

export type EventMetricsAggregateResult = {
  __typename?: "EventMetricsAggregateResult";
  items?: Maybe<Array<Maybe<EventMetricsAggregateDto>>>;
};

export type EventResult = {
  __typename?: "EventResult";
  count: Scalars["Int"];
  items: Array<StudioEventDto>;
};

export type EventSpeakerDto = {
  __typename?: "EventSpeakerDTO";
  eventId?: Maybe<Scalars["Int"]>;
  eventSpeakerId?: Maybe<Scalars["Int"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  speakerName?: Maybe<Scalars["String"]>;
  speakerPosition?: Maybe<Scalars["String"]>;
};

export type FaqResult = {
  __typename?: "FaqResult";
  count: Scalars["Int"];
  items: Array<StudioFaqDto>;
};

export type FavoriteDto = {
  __typename?: "FavoriteDTO";
  id?: Maybe<Scalars["String"]>;
  lists?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export enum FileType {
  GIF = "GIF",
  JPEG = "JPEG",
  JPG = "JPG",
  MP3 = "MP3",
  MP4 = "MP4",
  MPEG = "MPEG",
  MPG = "MPG",
  PDF = "PDF",
  PNG = "PNG",
  WAV = "WAV",
  XLS = "XLS",
  XLSX = "XLSX",
  ZIP = "ZIP",
}

export type FileUrlDto = {
  __typename?: "FileUrlDTO";
  fileS3Id?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export enum FilterContactsByEntityType {
  contact = "contact",
  fund = "fund",
  institution = "institution",
}

export type FundDto = {
  __typename?: "FundDTO";
  countryName?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  equityAum?: Maybe<Scalars["Float"]>;
  fundFamily?: Maybe<Scalars["String"]>;
  fundType?: Maybe<Scalars["String"]>;
  fundTypeDesc?: Maybe<Scalars["String"]>;
  parentInstitutionId?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  style?: Maybe<Scalars["String"]>;
  totalAum?: Maybe<Scalars["Float"]>;
  turnover?: Maybe<Scalars["String"]>;
};

export type FundEntityInput = {
  entityId: Scalars["String"];
  fundId: Scalars["String"];
};

export type FundHoldingCurrentFilter = {
  fundStyle?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  fundTurnover?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  fundType?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securityCapGroup?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securityIndustry?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securityRegion?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securitySector?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FundInput = {
  id: Scalars["String"];
  type: Scalars["String"];
};

export type FundResult = {
  __typename?: "FundResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<FundDto>>>;
};

export type FundSearchDto = EntitySearchDto & {
  __typename?: "FundSearchDTO";
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<SearchEntityType>;
};

export enum GeneralRequestCategory {
  accessLogin = "accessLogin",
  billingQuestions = "billingQuestions",
  brandingStyleChanges = "brandingStyleChanges",
  emailAdmin = "emailAdmin",
  layoutChanges = "layoutChanges",
  other = "other",
  otherContentChanges = "otherContentChanges",
  reportAnIssue = "reportAnIssue",
  textUpdates = "textUpdates",
  websiteSecurity = "websiteSecurity",
}

export type GeneralRequestDataDto = {
  __typename?: "GeneralRequestDataDTO";
  category?: Maybe<GeneralRequestCategory>;
  contentType?: Maybe<StudioOtherContentChangeEnum>;
  otherCategoryDescription?: Maybe<Scalars["String"]>;
};

export type GeneralRequestDataInput = {
  category: GeneralRequestCategory;
  contentType?: InputMaybe<StudioOtherContentChangeEnum>;
  otherCategoryDescription?: InputMaybe<Scalars["String"]>;
};

export type GenerateApiCallResult = {
  __typename?: "GenerateApiCallResult";
  mutation?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
};

export type GenerateCompletionResult = {
  __typename?: "GenerateCompletionResult";
  completion?: Maybe<Scalars["String"]>;
};

export type GenerateDataMapResult = {
  __typename?: "GenerateDataMapResult";
  schematics: Array<IDataMapSchematic>;
};

export type GetEmailUserResponse = {
  __typename?: "GetEmailUserResponse";
  authenticated: Scalars["Boolean"];
  emailAddress?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  userId: Scalars["String"];
  vendorAccountId: Scalars["String"];
};

export type GetSchedulerPageResponse = {
  __typename?: "GetSchedulerPageResponse";
  data?: Maybe<Array<Maybe<PageListItem>>>;
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type GetSchedulerResponse = {
  __typename?: "GetSchedulerResponse";
  data?: Maybe<Scheduler>;
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type GetUploadUrlResponse = {
  __typename?: "GetUploadUrlResponse";
  data?: Maybe<UploadAndReadUrlData>;
  success: Scalars["Boolean"];
};

export type GetUserLoginStatusResponse = {
  __typename?: "GetUserLoginStatusResponse";
  authenticated: Scalars["Boolean"];
  userId: Scalars["String"];
  vendorAccountId: Scalars["String"];
};

export type GroupBy = {
  by?: InputMaybe<Scalars["String"]>;
  operator?: InputMaybe<GroupByOperator>;
};

export enum GroupByOperator {
  avg = "avg",
  sum = "sum",
}

export type IDataMapSchematic = {
  __typename?: "IDataMapSchematic";
  confidence: Scalars["Float"];
  convert?: Maybe<Scalars["String"]>;
  destinationKey: Scalars["String"];
  sourceKey: Scalars["String"];
};

export type ImportInteractionPreviewResponse = {
  __typename?: "ImportInteractionPreviewResponse";
  id: Scalars["String"];
  meta?: Maybe<ImportInteractionsMeta>;
  preview?: Maybe<Array<Maybe<InteractionFlatPreview>>>;
};

export type ImportInteractionResponse = {
  __typename?: "ImportInteractionResponse";
  count?: Maybe<Scalars["Int"]>;
};

export type ImportInteractionsDateFormat = {
  __typename?: "ImportInteractionsDateFormat";
  dateFormat?: Maybe<Scalars["String"]>;
  timeFormat?: Maybe<Scalars["String"]>;
};

export type ImportInteractionsMeta = {
  __typename?: "ImportInteractionsMeta";
  dateFormat?: Maybe<ImportInteractionsDateFormat>;
  schemaMap?: Maybe<ImportInteractionsSchemaMap>;
  validation?: Maybe<ImportInteractionsMetaValidation>;
};

export type ImportInteractionsMetaValidation = {
  __typename?: "ImportInteractionsMetaValidation";
  count?: Maybe<ImportInteractionsMetaValidationCount>;
  invalidRecordsCsvUrl?: Maybe<Scalars["String"]>;
  invalidations?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type ImportInteractionsMetaValidationCount = {
  __typename?: "ImportInteractionsMetaValidationCount";
  invalid?: Maybe<Scalars["Int"]>;
  valid?: Maybe<Scalars["Int"]>;
};

export type ImportInteractionsSchemaMap = {
  __typename?: "ImportInteractionsSchemaMap";
  attendeeAddress?: Maybe<Scalars["String"]>;
  attendeeCity?: Maybe<Scalars["String"]>;
  attendeeCountry?: Maybe<Scalars["String"]>;
  attendeeEmail?: Maybe<Scalars["String"]>;
  attendeeFirstName?: Maybe<Scalars["String"]>;
  attendeeFund?: Maybe<Scalars["String"]>;
  attendeeInstitution?: Maybe<Scalars["String"]>;
  attendeeJobTitle?: Maybe<Scalars["String"]>;
  attendeeLastName?: Maybe<Scalars["String"]>;
  attendeeName?: Maybe<Scalars["String"]>;
  attendeePhoneNumber?: Maybe<Scalars["String"]>;
  attendeeType?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type InsiderEngagementDto = {
  __typename?: "InsiderEngagementDTO";
  city?: Maybe<Scalars["String"]>;
  contactId?: Maybe<Scalars["String"]>;
  current?: Maybe<Scalars["Float"]>;
  directPhone?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  emailOpens?: Maybe<Scalars["Int"]>;
  engagements?: Maybe<Scalars["Int"]>;
  equityAum?: Maybe<Scalars["Float"]>;
  eventsAttended?: Maybe<Scalars["Int"]>;
  mobile?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  qtrChange?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type InsiderEngagementResult = {
  __typename?: "InsiderEngagementResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<InsiderEngagementDto>>>;
};

export type InstHoldingCurrentAggregateDto = {
  __typename?: "InstHoldingCurrentAggregateDTO";
  aggrField?: Maybe<Scalars["String"]>;
  aggrValue?: Maybe<Scalars["String"]>;
  count?: Maybe<Scalars["Int"]>;
  current?: Maybe<Scalars["Float"]>;
  entityId?: Maybe<Scalars["String"]>;
  marketValue?: Maybe<Scalars["Float"]>;
};

export type InstHoldingCurrentAggregateResult = {
  __typename?: "InstHoldingCurrentAggregateResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<InstHoldingCurrentAggregateDto>>>;
};

export type InstHoldingCurrentDto = {
  __typename?: "InstHoldingCurrentDTO";
  currentPosition?: Maybe<Scalars["Int"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Entity_Type>;
  identifier?: Maybe<Scalars["String"]>;
  lastFilingDate?: Maybe<Scalars["String"]>;
  sector?: Maybe<Scalars["String"]>;
};

export type InstHoldingCurrentFilter = {
  activity?: InputMaybe<Scalars["Boolean"]>;
  holdingType?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  institutionStyle?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  institutionTurnover?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  institutionType?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  isActivist?: InputMaybe<Scalars["Boolean"]>;
  position?: InputMaybe<Scalars["String"]>;
  securityCapGroup?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securityIndustry?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securityRegion?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securitySector?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type InstHoldingCurrentResult = {
  __typename?: "InstHoldingCurrentResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<InstHoldingCurrentDto>>>;
};

export type InstHoldingDto = {
  __typename?: "InstHoldingDTO";
  currentPosition?: Maybe<Scalars["Int"]>;
  currentQtrDate?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Entity_Type>;
  previousReportDate?: Maybe<Scalars["String"]>;
  qtrChange?: Maybe<Scalars["Float"]>;
  reportDate?: Maybe<Scalars["String"]>;
  sector?: Maybe<Scalars["String"]>;
};

export type InstHoldingHistoricalFilter = {
  holdingType?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type InstHoldingResult = {
  __typename?: "InstHoldingResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<InstHoldingDto>>>;
};

export type Institution = {
  __typename?: "Institution";
  id?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type InstitutionAddress = {
  __typename?: "InstitutionAddress";
  addressLine1?: Maybe<Scalars["String"]>;
  addressLine2?: Maybe<Scalars["String"]>;
  addressLine3?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  countryCode?: Maybe<Scalars["String"]>;
  countryName?: Maybe<Scalars["String"]>;
  fax?: Maybe<Scalars["String"]>;
  hq?: Maybe<Scalars["String"]>;
  metro?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  stateProvinceCode?: Maybe<Scalars["String"]>;
  stateProvinceName?: Maybe<Scalars["String"]>;
};

export type InstitutionAddressDto = {
  __typename?: "InstitutionAddressDTO";
  addressLine1?: Maybe<Scalars["String"]>;
  addressLine2?: Maybe<Scalars["String"]>;
  addressLine3?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  countryCode?: Maybe<Scalars["String"]>;
  countryName?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  fax?: Maybe<Scalars["String"]>;
  hq?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["Int"]>;
  metro?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  stateProvinceCode?: Maybe<Scalars["String"]>;
  stateProvinceName?: Maybe<Scalars["String"]>;
};

export type InstitutionDto = {
  __typename?: "InstitutionDTO";
  active?: Maybe<Scalars["Boolean"]>;
  activist?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<Array<Maybe<InstitutionAddressDto>>>;
  addressId?: Maybe<Scalars["Int"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
  equityAum?: Maybe<Scalars["Float"]>;
  investmentApproach?: Maybe<Scalars["String"]>;
  managerStyle?: Maybe<Scalars["String"]>;
  profile?: Maybe<Scalars["String"]>;
  qualityRating?: Maybe<Scalars["Float"]>;
  style?: Maybe<Scalars["String"]>;
  totalAum?: Maybe<Scalars["Float"]>;
  turnover?: Maybe<Scalars["String"]>;
};

export type InstitutionInput = {
  id: Scalars["String"];
  type: Scalars["String"];
};

export type InstitutionReferenceDto = {
  __typename?: "InstitutionReferenceDTO";
  id?: Maybe<Scalars["String"]>;
  institutionName?: Maybe<Scalars["String"]>;
};

export type InstitutionResult = {
  __typename?: "InstitutionResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<InstitutionDto>>>;
};

export type InstitutionSearchDto = EntitySearchDto & {
  __typename?: "InstitutionSearchDTO";
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<SearchEntityType>;
};

export type Interaction = {
  __typename?: "Interaction";
  attendees?: Maybe<Array<Maybe<InteractionAttendees>>>;
  id?: Maybe<Scalars["String"]>;
  note?: Maybe<InteractionNote>;
  start?: Maybe<InteractionStart>;
  summary?: Maybe<InteractionSummary>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type InteractionAttendeeJob = {
  __typename?: "InteractionAttendeeJob";
  id?: Maybe<Scalars["String"]>;
  jobTitle?: Maybe<Scalars["String"]>;
};

export type InteractionAttendees = {
  __typename?: "InteractionAttendees";
  id?: Maybe<Scalars["String"]>;
  jobs?: Maybe<Array<Maybe<InteractionAttendeeJob>>>;
  type?: Maybe<AttendeeType>;
};

export type InteractionDateRange = {
  end?: InputMaybe<Scalars["Date"]>;
  start?: InputMaybe<Scalars["Date"]>;
};

export type InteractionFlatPreview = {
  __typename?: "InteractionFlatPreview";
  contactAddress?: Maybe<Scalars["String"]>;
  contactCity?: Maybe<Scalars["String"]>;
  contactCountry?: Maybe<Scalars["String"]>;
  contactEmail?: Maybe<Scalars["String"]>;
  contactFund?: Maybe<Scalars["String"]>;
  contactInstitution?: Maybe<Scalars["String"]>;
  contactJobTitle?: Maybe<Scalars["String"]>;
  contactName?: Maybe<Scalars["String"]>;
  contactPhoneNumber?: Maybe<Scalars["String"]>;
  interactionDate?: Maybe<Scalars["String"]>;
  interactionNotes?: Maybe<Scalars["String"]>;
  interactionTime?: Maybe<Scalars["String"]>;
  interactionTitle?: Maybe<Scalars["String"]>;
  interactionType?: Maybe<Scalars["String"]>;
};

export type InteractionNote = {
  __typename?: "InteractionNote";
  html?: Maybe<Scalars["String"]>;
  raw?: Maybe<Scalars["String"]>;
};

export type InteractionNoteInput = {
  html?: InputMaybe<Scalars["String"]>;
  raw?: InputMaybe<Scalars["String"]>;
};

export type InteractionResponse = {
  __typename?: "InteractionResponse";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<Interaction>>>;
};

export type InteractionStart = {
  __typename?: "InteractionStart";
  date?: Maybe<Scalars["Date"]>;
  timezone?: Maybe<Scalars["String"]>;
  utcOffset?: Maybe<Scalars["Int"]>;
};

export type InteractionSummary = {
  __typename?: "InteractionSummary";
  html?: Maybe<Scalars["String"]>;
  raw?: Maybe<Scalars["String"]>;
};

export type InteractionSummaryInput = {
  html?: InputMaybe<Scalars["String"]>;
  raw?: InputMaybe<Scalars["String"]>;
};

export type InteractionType = {
  __typename?: "InteractionType";
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type InteractionTypeResponse = {
  __typename?: "InteractionTypeResponse";
  items?: Maybe<Array<Maybe<InteractionType>>>;
};

export type JobDataInput = {
  accountSubmit?: InputMaybe<Scalars["null"]>;
  billingSubmit?: InputMaybe<Scalars["null"]>;
  epEventCreate?: InputMaybe<EpEventCreateDataInput>;
  epEventUpdate?: InputMaybe<EpEventUpdateDataInput>;
  studioAnalystCoverageCreate?: InputMaybe<Scalars["null"]>;
  studioAnalystCoverageRemove?: InputMaybe<Scalars["null"]>;
  studioAnalystCoverageUpdate?: InputMaybe<Scalars["null"]>;
  studioDividendsCreate?: InputMaybe<Scalars["null"]>;
  studioDividendsRemove?: InputMaybe<Scalars["null"]>;
  studioDividendsUpdate?: InputMaybe<Scalars["null"]>;
  studioEventAutoCreate?: InputMaybe<StudioEventAutoCreateDataInput>;
  studioEventAutoRemove?: InputMaybe<StudioEventAutoRemoveDataInput>;
  studioEventAutoUpdate?: InputMaybe<StudioEventAutoUpdateDataInput>;
  studioEventCreate?: InputMaybe<StudioEventCreateDataInput>;
  studioEventRemove?: InputMaybe<Scalars["null"]>;
  studioEventUpdate?: InputMaybe<Scalars["null"]>;
  studioFAQCreate?: InputMaybe<Scalars["null"]>;
  studioFAQRemove?: InputMaybe<Scalars["null"]>;
  studioFAQUpdate?: InputMaybe<Scalars["null"]>;
  studioFaqManage?: InputMaybe<StudioFaqManageDataInput>;
  studioGovernanceCreate?: InputMaybe<Scalars["null"]>;
  studioGovernanceRemove?: InputMaybe<Scalars["null"]>;
  studioGovernanceUpdate?: InputMaybe<Scalars["null"]>;
  studioJobPostingCreate?: InputMaybe<Scalars["null"]>;
  studioJobPostingRemove?: InputMaybe<Scalars["null"]>;
  studioJobPostingUpdate?: InputMaybe<Scalars["null"]>;
  studioNewsCreate?: InputMaybe<StudioNewsCreateDataInput>;
  studioNewsRemove?: InputMaybe<Scalars["null"]>;
  studioNewsUpdate?: InputMaybe<Scalars["null"]>;
  studioOtherSubmit?: InputMaybe<StudioOtherSubmitDataInput>;
  studioPersonCreate?: InputMaybe<StudioPersonCreateDataInput>;
  studioPersonManage?: InputMaybe<StudioPersonManageDataInput>;
  studioPersonRemove?: InputMaybe<StudioPersonRemoveDataInput>;
  studioPersonUpdate?: InputMaybe<StudioPersonUpdateDataInput>;
  studioPresentationAutoCreate?: InputMaybe<StudioPresentationAutoCreateDataInput>;
  studioPresentationAutoRemove?: InputMaybe<StudioPresentationAutoRemoveDataInput>;
  studioPresentationAutoUpdate?: InputMaybe<StudioPresentationAutoUpdateDataInput>;
  studioPresentationCreate?: InputMaybe<StudioPresentationCreateDataInput>;
  studioPresentationRemove?: InputMaybe<Scalars["null"]>;
  studioPresentationUpdate?: InputMaybe<Scalars["null"]>;
  studioPressReleaseAutoCreate?: InputMaybe<StudioPressReleaseAutoCreateDataInput>;
  studioPressReleaseAutoRemove?: InputMaybe<StudioPressReleaseAutoRemoveDataInput>;
  studioPressReleaseAutoUpdate?: InputMaybe<StudioPressReleaseAutoUpdateDataInput>;
  studioSecureFileUpload?: InputMaybe<Scalars["null"]>;
};

export type JobDataUnion =
  | EpEventCreateDto
  | EpEventUpdateDto
  | StudioAnalystCoverageCreateDto
  | StudioAnalystCoverageRemoveDto
  | StudioAnalystCoverageUpdateDto
  | StudioDividendsCreateDto
  | StudioDividendsRemoveDto
  | StudioDividendsUpdateDto
  | StudioEventAutoCreateDto
  | StudioEventAutoRemoveDto
  | StudioEventAutoUpdateDto
  | StudioEventCreateDto
  | StudioEventRemoveDto
  | StudioEventUpdateDto
  | StudioFaqCreateDto
  | StudioFaqRemoveDto
  | StudioFaqUpdateDto
  | StudioFaqManageDto
  | StudioGovernanceCreateDto
  | StudioGovernanceRemoveDto
  | StudioGovernanceUpdateDto
  | StudioJobPostingCreateDto
  | StudioJobPostingRemoveDto
  | StudioJobPostingUpdateDto
  | StudioNewsCreateDto
  | StudioNewsRemoveDto
  | StudioNewsUpdateDto
  | StudioOtherSubmitDto
  | StudioPersonCreateDto
  | StudioPersonManageDto
  | StudioPersonRemoveDto
  | StudioPersonUpdateDto
  | StudioPresentationAutoCreateDto
  | StudioPresentationAutoRemoveDto
  | StudioPresentationAutoUpdateDto
  | StudioPresentationCreateDto
  | StudioPresentationRemoveDto
  | StudioPresentationUpdateDto
  | StudioPressReleaseAutoCreateDto
  | StudioPressReleaseAutoRemoveDto
  | StudioPressReleaseAutoUpdateDto
  | StudioSecureFileUploadDto;

export type JobPublishInputSchema = {
  schedule?: InputMaybe<JobPublishScheduleInput>;
};

export type JobPublishScheduleInput = {
  date?: InputMaybe<Scalars["Date"]>;
  timezone?: InputMaybe<Scalars["String"]>;
};

export enum JobPublishingMethodEnum {
  automatic = "automatic",
  manual = "manual",
  none = "none",
}

export type JobReferenceDto = {
  __typename?: "JobReferenceDTO";
  address1?: Maybe<Scalars["String"]>;
  institution?: Maybe<Array<Maybe<InstitutionReferenceDto>>>;
  title?: Maybe<Scalars["String"]>;
};

export enum JobStatusEnum {
  approved = "approved",
  closed = "closed",
  inProgress = "inProgress",
  informationRequired = "informationRequired",
  mergedAsDuplicate = "mergedAsDuplicate",
  pendingApproval = "pendingApproval",
  processing = "processing",
  published = "published",
  queued = "queued",
  unknown = "unknown",
  vendorNotified = "vendorNotified",
}

export type JobsInput = {
  entityId: Scalars["String"];
  entityName: Scalars["String"];
  entityType: Scalars["String"];
  institutionType?: InputMaybe<Scalars["String"]>;
  jobFunction?: InputMaybe<Scalars["String"]>;
  jobTitle?: InputMaybe<Scalars["String"]>;
};

export type ManagedFundDto = {
  __typename?: "ManagedFundDTO";
  fundId?: Maybe<Scalars["String"]>;
};

export type ManagedFunds = {
  __typename?: "ManagedFunds";
  entityId?: Maybe<Scalars["String"]>;
  fundId?: Maybe<Scalars["String"]>;
};

export type ManualPublishEarningsStageResult = {
  __typename?: "ManualPublishEarningsStageResult";
  data: EarningsPlan;
};

export enum MeetingPageStatus {
  active = "active",
  inactive = "inactive",
}

export type MonitorDto = {
  __typename?: "MonitorDTO";
  dateCreated?: Maybe<Scalars["String"]>;
  engagementConnection?: Maybe<EngagementDto>;
  id?: Maybe<Scalars["String"]>;
  type?: Maybe<Entity_Type>;
};

export type MonitorDtoEngagementConnectionArgs = {
  periodType?: InputMaybe<Period_Type>;
};

export type MonitorResult = {
  __typename?: "MonitorResult";
  data?: Maybe<MonitorDto>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type MoverFilter = {
  securityIndustry?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createAccessGroup?: Maybe<AccessGroup>;
  createCompletion: CompletionResult;
  createContact?: Maybe<CreateContactResponse>;
  /** Create a new contact list */
  createContactList?: Maybe<CreateContactListResponse>;
  /** Creates a new Corporate Contact */
  createCorporateContact?: Maybe<CreateCorporateContactResponse>;
  /** Creates a new Contact */
  createCustomContact?: Maybe<CreateCustomContactResponse>;
  createEarningsMessage?: Maybe<EarningsMessageCreationResult>;
  createEarningsPlan?: Maybe<EarningsPlanCreationResult>;
  /** Creates a note/comment for a specified entity */
  createEntityNote?: Maybe<CreateEntityNoteResponse>;
  /** Creates a CRM Interaction */
  createInteraction?: Maybe<CreateInteractionResponse>;
  createOrganization?: Maybe<Organization>;
  /** Creates a new Scheduler page */
  createPage?: Maybe<CreatePageResponse>;
  /**
   * Create new instance of a workflow. The workflow version should always use the latest version of the workflow definition for a given type.
   * @meta permission workflow::create:workflow
   */
  createPlatformWorkflow?: Maybe<PlatformWorkflow>;
  createProductQualifiedLead?: Maybe<Scalars["Boolean"]>;
  createTrial?: Maybe<Trial>;
  createUploadUrl?: Maybe<FileUrlDto>;
  createUser?: Maybe<User>;
  deleteAccessGroup?: Maybe<Scalars["Boolean"]>;
  /** Delete a contact list */
  deleteContactList?: Maybe<DeleteContactListResponse>;
  /** Deletes a Corporate Contact */
  deleteCorporateContact?: Maybe<DeleteCorporateContactResponse>;
  /** Revokes vendor access token and remove user's account */
  deleteCrmMailUser?: Maybe<DisconnectEmailUserResponse>;
  /** Deletes a contact created by user */
  deleteCustomContact?: Maybe<DeleteCustomContactResponse>;
  /** Deletes a CRM Interaction */
  deleteInteraction?: Maybe<DeleteInteractionResponse>;
  /** Deletes a Scheduler page identified by its unique slug */
  deletePage?: Maybe<DeletePageResponse>;
  /**
   * TODO: Create `deleteUser` mutation that accepts only id as input in the future
   * when ECS Get API is ready (accepts only user id as input)
   */
  deleteUserWithOrganizationId?: Maybe<Scalars["Boolean"]>;
  desktopCreateActivity?: Maybe<DesktopCreateActivityResult>;
  desktopCreateCustomContact?: Maybe<DesktopCreateContactResult>;
  desktopCreateFavorite?: Maybe<DesktopCreateFavoriteResult>;
  desktopCreateTag?: Maybe<DesktopCreateTagResult>;
  desktopDeleteActivity?: Maybe<DesktopDeleteActivityResult>;
  desktopDeleteFavorite?: Maybe<DesktopDeleteFavoriteResult>;
  desktopDeleteTag?: Maybe<DesktopDeleteTagResult>;
  desktopUpdateActivity?: Maybe<DesktopUpdateActivityResult>;
  generateAPICall?: Maybe<GenerateApiCallResult>;
  generateCompletion?: Maybe<GenerateCompletionResult>;
  generateDataMap?: Maybe<GenerateDataMapResult>;
  /** Import interactions based on preview  */
  importInteraction?: Maybe<ImportInteractionResponse>;
  /** Preview import of interactions */
  importInteractionPreview?: Maybe<ImportInteractionPreviewResponse>;
  linkOrganizations?: Maybe<Array<Maybe<Organization>>>;
  manualPublishEarningsStage?: Maybe<ManualPublishEarningsStageResult>;
  /**
   * This mutation helps user to monitor an entity
   * @meta permission engagement-analytics::create:monitor
   */
  monitorEntity?: Maybe<MonitorResult>;
  /** This mutation is for managing Engagement Analytics notifications */
  notificationPreferences?: Maybe<SetNotificationPreferencesResult>;
  notificationToken?: Maybe<NotificationTokenResult>;
  /** Triggers the removal of attachment to the vendor */
  removeAttachment?: Maybe<RemoveAttachmentResponse>;
  requestCreate?: Maybe<RequestDto>;
  requestCreateCustomCase?: Maybe<Scalars["Boolean"]>;
  requestCreateUploadUrl?: Maybe<FileUrlDto>;
  requestDelete?: Maybe<Scalars["Boolean"]>;
  requestJobApprove?: Maybe<RequestDto>;
  requestJobPublish?: Maybe<RequestDto>;
  requestJobUpdate?: Maybe<RequestDto>;
  requestSendFeedback?: Maybe<RequestDto>;
  /** Sends a CRM Email to one or more recipients */
  sendCrmMail?: Maybe<SendEmailResponse>;
  /** Synchronizes the Scheduler page data and edit token with the vendor (Nylas) */
  syncPage?: Maybe<SyncPageStatusResponse>;
  unlinkOrganization?: Maybe<Organization>;
  /**
   * This mutation helps user to unmonitor an entity
   * @meta permission engagement-analytics::create:monitor
   */
  unmonitorEntity?: Maybe<UnmonitorResult>;
  updateAccessGroup?: Maybe<AccessGroup>;
  updateChatterFeed?: Maybe<UpdateChatterFeedResult>;
  updateChatterFiles?: Maybe<UpdateChatterFilesResult>;
  updateContact?: Maybe<UpdateContactResponse>;
  /** Update a contact list */
  updateContactList?: Maybe<UpdateContactListResponse>;
  /** Updates a Contact */
  updateCustomContact?: Maybe<UpdateCustomContactResponse>;
  updateEarningsPlan?: Maybe<EarningsPlanUpdateResult>;
  updateEarningsPlanStatus?: Maybe<EarningsPlanUpdateResult>;
  /** Updates a note attached to an Entity */
  updateEntityNote?: Maybe<UpdateEntityNoteResponse>;
  /** Updates a CRM Interaction */
  updateInteraction?: Maybe<UpdateInteractionResponse>;
  updateItemByClient?: Maybe<EarningsPlanItemResult>;
  updateItemStatus?: Maybe<EarningsPlanItemResult>;
  updateNotification?: Maybe<Scalars["Boolean"]>;
  updateOrganization?: Maybe<Organization>;
  /** Updates the status of a Scheduler page (active / inactive) identified by it's unique slug */
  updatePageStatus?: Maybe<UpdatePageStatusResponse>;
  /**
   * Update Workflow entity.
   * @meta permission workflow::create:workflow
   */
  updatePlatformWorkflow?: Maybe<PlatformWorkflow>;
  /**
   * Sets the state of an individual step
   * @meta permission workflow::create:workflow
   */
  updatePlatformWorkflowState?: Maybe<PlatformStateWorkflow>;
  updateUser?: Maybe<User>;
  /** Upload attachment to vendor by using the URL from getUploadUrl as the attachment */
  uploadAttachment?: Maybe<UploadAttachmentResponse>;
};

export type MutationCreateAccessGroupArgs = {
  managedOrganizationIds: Array<Scalars["String"]>;
  name: Scalars["String"];
  organizationId?: InputMaybe<Scalars["String"]>;
  userIds: Array<Scalars["String"]>;
};

export type MutationCreateCompletionArgs = {
  input: CompletionInput;
};

export type MutationCreateContactArgs = {
  contacts: Array<CreateContactInput>;
};

export type MutationCreateContactListArgs = {
  contactList: Array<ContactListInput>;
};

export type MutationCreateCorporateContactArgs = {
  email: Scalars["String"];
  jobTitle: Scalars["String"];
  name: Scalars["String"];
};

export type MutationCreateCustomContactArgs = {
  customContact: Array<CustomContactInput>;
};

export type MutationCreateEarningsMessageArgs = {
  earningsMessage: EarningsMessageCreationDto;
  username: Scalars["String"];
};

export type MutationCreateEarningsPlanArgs = {
  earningsPlan: EarningsPlanCreationDto;
  username: Scalars["String"];
};

export type MutationCreateEntityNoteArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Scalars["String"]>;
  note?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateInteractionArgs = {
  attendees?: InputMaybe<Array<InputMaybe<Attendees>>>;
  start: StartDate;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type MutationCreateOrganizationArgs = {
  active?: InputMaybe<Scalars["Boolean"]>;
  currency?: InputMaybe<Scalars["String"]>;
  entitlements?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  identifiers?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  isAdmin?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  q4SecurityId?: InputMaybe<Scalars["String"]>;
  region?: InputMaybe<Scalars["String"]>;
  studioSubdomain?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<OrganizationType>;
};

export type MutationCreatePageArgs = {
  page?: InputMaybe<PageInput>;
};

export type MutationCreatePlatformWorkflowArgs = {
  workflowType: PlatformWorkflowType;
};

export type MutationCreateProductQualifiedLeadArgs = {
  campaignId: Scalars["String"];
};

export type MutationCreateTrialArgs = {
  trialType: Scalars["String"];
};

export type MutationCreateUploadUrlArgs = {
  contentType: Scalars["String"];
};

export type MutationCreateUserArgs = {
  active?: InputMaybe<Scalars["Boolean"]>;
  email: Scalars["String"];
  emailApp?: InputMaybe<Scalars["String"]>;
  firstName: Scalars["String"];
  friendlyName?: InputMaybe<Scalars["String"]>;
  lastName: Scalars["String"];
  organizationId: Scalars["String"];
  roles?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteAccessGroupArgs = {
  id: Scalars["String"];
  organizationId?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteContactListArgs = {
  id?: InputMaybe<Array<Scalars["ID"]>>;
};

export type MutationDeleteCorporateContactArgs = {
  id: Array<InputMaybe<Scalars["String"]>>;
};

export type MutationDeleteCrmMailUserArgs = {
  userId: Scalars["String"];
};

export type MutationDeleteCustomContactArgs = {
  id?: InputMaybe<Array<Scalars["ID"]>>;
};

export type MutationDeleteInteractionArgs = {
  id: Array<InputMaybe<Scalars["String"]>>;
};

export type MutationDeletePageArgs = {
  slug?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteUserWithOrganizationIdArgs = {
  id: Scalars["String"];
  organizationId: Scalars["String"];
};

export type MutationDesktopCreateActivityArgs = {
  address?: InputMaybe<Array<InputMaybe<DesktopActivityAddress>>>;
  allDay?: InputMaybe<Scalars["Boolean"]>;
  body?: InputMaybe<Scalars["String"]>;
  category?: InputMaybe<Scalars["String"]>;
  date?: InputMaybe<Scalars["String"]>;
  end?: InputMaybe<DesktopActivityDate>;
  endTime?: InputMaybe<Scalars["String"]>;
  links?: InputMaybe<Array<InputMaybe<DesktopActivityLink>>>;
  participants?: InputMaybe<Array<InputMaybe<DesktopActivityParticipant>>>;
  start?: InputMaybe<DesktopActivityDate>;
  startTime?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  virtual?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationDesktopCreateCustomContactArgs = {
  entity?: InputMaybe<DesktopContactEntity>;
};

export type MutationDesktopCreateFavoriteArgs = {
  contactId?: InputMaybe<Scalars["String"]>;
  contactType?: InputMaybe<Scalars["String"]>;
};

export type MutationDesktopCreateTagArgs = {
  entity?: InputMaybe<DesktopTagEntity>;
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationDesktopDeleteActivityArgs = {
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MutationDesktopDeleteFavoriteArgs = {
  contactId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MutationDesktopDeleteTagArgs = {
  entityId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  entityType?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MutationDesktopUpdateActivityArgs = {
  address?: InputMaybe<Array<InputMaybe<DesktopActivityAddress>>>;
  addressBookLinks?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  allDay?: InputMaybe<Scalars["Boolean"]>;
  body?: InputMaybe<Scalars["String"]>;
  category?: InputMaybe<Scalars["String"]>;
  date?: InputMaybe<Scalars["String"]>;
  dateTime?: InputMaybe<Scalars["String"]>;
  end?: InputMaybe<DesktopActivityDate>;
  endTime?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  links?: InputMaybe<Array<InputMaybe<DesktopActivityLink>>>;
  participants?: InputMaybe<Array<InputMaybe<DesktopActivityParticipant>>>;
  start?: InputMaybe<DesktopActivityDate>;
  startTime?: InputMaybe<Scalars["String"]>;
  timezone?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  virtual?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationGenerateApiCallArgs = {
  prompt: Scalars["String"];
};

export type MutationGenerateCompletionArgs = {
  prompt: Scalars["String"];
};

export type MutationGenerateDataMapArgs = {
  sampleData: Scalars["String"];
};

export type MutationImportInteractionArgs = {
  id: Scalars["String"];
};

export type MutationImportInteractionPreviewArgs = {
  readUrl?: InputMaybe<Scalars["String"]>;
  userTimeZone?: InputMaybe<UserTimeZone>;
};

export type MutationLinkOrganizationsArgs = {
  id: Scalars["String"];
  managedOrganizationIds: Array<Scalars["String"]>;
};

export type MutationManualPublishEarningsStageArgs = {
  earningsPlanId: Scalars["String"];
  organizationId?: InputMaybe<Scalars["String"]>;
  stageId: Scalars["String"];
  username: Scalars["String"];
};

export type MutationMonitorEntityArgs = {
  entityId: Scalars["String"];
  entityType: Entity_Type;
};

export type MutationNotificationPreferencesArgs = {
  email?: InputMaybe<Scalars["Boolean"]>;
  inApp?: InputMaybe<Scalars["Boolean"]>;
  notificationType?: InputMaybe<Notification_Type>;
};

export type MutationRemoveAttachmentArgs = {
  fileId: Scalars["String"];
  userId: Scalars["String"];
};

export type MutationRequestCreateArgs = {
  request: RequestCreateInputSchema;
};

export type MutationRequestCreateCustomCaseArgs = {
  message: Scalars["String"];
  type: CustomCaseTypeEnum;
};

export type MutationRequestCreateUploadUrlArgs = {
  contentType: Scalars["String"];
};

export type MutationRequestJobApproveArgs = {
  id: Scalars["String"];
  jobIndex: Scalars["Int"];
};

export type MutationRequestJobPublishArgs = {
  id: Scalars["String"];
  jobIndex: Scalars["Int"];
  publishRequest: JobPublishInputSchema;
};

export type MutationRequestJobUpdateArgs = {
  id: Scalars["String"];
  jobIndex: Scalars["Int"];
  updateModel: RequestJobUpdateInputSchema;
};

export type MutationRequestSendFeedbackArgs = {
  feedback: Scalars["String"];
  id: Scalars["String"];
  jobIndex: Scalars["Int"];
};

export type MutationSendCrmMailArgs = {
  bcc?: InputMaybe<Array<InputMaybe<EmailParticipant>>>;
  body: Scalars["String"];
  cc?: InputMaybe<Array<InputMaybe<EmailParticipant>>>;
  desktopUserId?: InputMaybe<Scalars["String"]>;
  files?: InputMaybe<Array<InputMaybe<EmailAttachment>>>;
  from: Array<InputMaybe<EmailParticipant>>;
  organizationId: Scalars["String"];
  subject: Scalars["String"];
  to: Array<InputMaybe<EmailRecipient>>;
  userId: Scalars["String"];
};

export type MutationSyncPageArgs = {
  vendorPageId: Scalars["String"];
};

export type MutationUnlinkOrganizationArgs = {
  delegateOrganizationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type MutationUnmonitorEntityArgs = {
  entityId: Scalars["String"];
  entityType: Entity_Type;
};

export type MutationUpdateAccessGroupArgs = {
  id: Scalars["String"];
  managedOrgDeltas?: InputMaybe<AccessGroupUpdateDeltas>;
  managedOrganizationIds?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  organizationId?: InputMaybe<Scalars["String"]>;
  userDeltas?: InputMaybe<AccessGroupUpdateDeltas>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MutationUpdateChatterFeedArgs = {
  earningsMessage: UpdateChatterFeedDto;
  username: Scalars["String"];
};

export type MutationUpdateChatterFilesArgs = {
  earningsPlan: UpdateChatterFilesDto;
  username: Scalars["String"];
};

export type MutationUpdateContactArgs = {
  contacts?: InputMaybe<Array<ContactUpdateInput>>;
};

export type MutationUpdateContactListArgs = {
  contactList: Array<UpdateContactListInput>;
};

export type MutationUpdateCustomContactArgs = {
  customContact: Array<UpdateCustomContactInput>;
};

export type MutationUpdateEarningsPlanArgs = {
  earningsPlan: EarningsPlanUpdateDto;
  username: Scalars["String"];
};

export type MutationUpdateEarningsPlanStatusArgs = {
  earningsPlanId: Scalars["String"];
  earningsPlanStatus: EarningsPlanStatus;
  username: Scalars["String"];
};

export type MutationUpdateEntityNoteArgs = {
  id: Scalars["String"];
  note?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateInteractionArgs = {
  attendees?: InputMaybe<Array<InputMaybe<Attendees>>>;
  id: Scalars["String"];
  note?: InputMaybe<InteractionNoteInput>;
  start?: InputMaybe<StartDate>;
  summary?: InputMaybe<InteractionSummaryInput>;
  title?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateItemByClientArgs = {
  earningsPlanId: Scalars["String"];
  item: EarningsPlanItemUpdateByClientDto;
  username: Scalars["String"];
};

export type MutationUpdateItemStatusArgs = {
  earningsPlanId: Scalars["String"];
  itemId: Scalars["String"];
  newStatus: EarningsPlanItemStatus;
  stageId: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUpdateNotificationArgs = {
  markRead: Scalars["Boolean"];
  notificationId?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateOrganizationArgs = {
  active?: InputMaybe<Scalars["Boolean"]>;
  currency?: InputMaybe<Scalars["String"]>;
  entitlements?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  id: Scalars["String"];
  identifiers?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  isAdmin?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  q4SecurityId?: InputMaybe<Scalars["String"]>;
  region?: InputMaybe<Scalars["String"]>;
  studioSubdomain?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<OrganizationType>;
};

export type MutationUpdatePageStatusArgs = {
  slug: Scalars["String"];
  status?: InputMaybe<MeetingPageStatus>;
};

export type MutationUpdatePlatformWorkflowArgs = {
  completedDate?: InputMaybe<Scalars["DateTime"]>;
  status?: InputMaybe<PlatformWorkflowStatus>;
  workflowId: Scalars["String"];
};

export type MutationUpdatePlatformWorkflowStateArgs = {
  state: Scalars["String"];
  status?: InputMaybe<PlatformWorkflowStateStatus>;
  stepId: Scalars["String"];
  workflowId: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  active?: InputMaybe<Scalars["Boolean"]>;
  email: Scalars["String"];
  emailApp?: InputMaybe<Scalars["String"]>;
  firstName: Scalars["String"];
  friendlyName?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  lastName: Scalars["String"];
  organizationId: Scalars["String"];
  roles?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationUploadAttachmentArgs = {
  fileUrl: Scalars["String"];
  filename: Scalars["String"];
  userId: Scalars["String"];
};

export enum Notification_Type {
  DIGEST = "DIGEST",
}

export type Notification = {
  __typename?: "Notification";
  id: Scalars["String"];
  link: Scalars["String"];
  message: Scalars["String"];
  readAt?: Maybe<Scalars["String"]>;
  sentAt: Scalars["String"];
  source: Scalars["String"];
  title: Scalars["String"];
};

export type NotificationList = {
  __typename?: "NotificationList";
  data: Array<Maybe<Notification>>;
  items?: Maybe<Array<Maybe<Notification>>>;
  totalCount?: Maybe<Scalars["Int"]>;
  totalUnreadCount?: Maybe<Scalars["Int"]>;
};

export type NotificationPreferencesDto = {
  __typename?: "NotificationPreferencesDTO";
  createdAt?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["Boolean"]>;
  inApp?: Maybe<Scalars["Boolean"]>;
  notificationType?: Maybe<Notification_Type>;
  organizationId?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
};

export type NotificationPreferencesResult = {
  __typename?: "NotificationPreferencesResult";
  items?: Maybe<Array<Maybe<NotificationPreferencesDto>>>;
};

export type NotificationTokenResult = {
  __typename?: "NotificationTokenResult";
  token: Scalars["String"];
};

export type OffsetPaginatedUserList = {
  __typename?: "OffsetPaginatedUserList";
  currentPage?: Maybe<Scalars["Int"]>;
  records?: Maybe<Array<Maybe<User>>>;
  totalItems?: Maybe<Scalars["Int"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

export type OffsetPagination = {
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
};

export type Organization = {
  __typename?: "Organization";
  active: Scalars["Boolean"];
  currency?: Maybe<OrganizationCurrency>;
  delegateOrganizationIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  entitlements?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id: Scalars["String"];
  identifiers?: Maybe<Array<Maybe<Scalars["String"]>>>;
  isAdmin?: Maybe<Scalars["Boolean"]>;
  managedBy?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  q4SecurityId?: Maybe<Scalars["String"]>;
  region?: Maybe<OrganizationRegion>;
  studio?: Maybe<StudioDetails>;
  type?: Maybe<OrganizationType>;
};

export enum OrganizationCurrency {
  CHF = "CHF",
  DKK = "DKK",
  EUR = "EUR",
  GBP = "GBP",
  NOK = "NOK",
  SEK = "SEK",
  USD = "USD",
}

export type OrganizationEngagementDto = {
  __typename?: "OrganizationEngagementDTO";
  capGroup?: Maybe<Scalars["String"]>;
  marketCapFilterAvailable?: Maybe<Scalars["Boolean"]>;
  periodType?: Maybe<Scalars["String"]>;
  sector?: Maybe<Scalars["String"]>;
  sectorFilterAvailable?: Maybe<Scalars["Boolean"]>;
};

export type OrganizationEngagementResult = {
  __typename?: "OrganizationEngagementResult";
  items?: Maybe<Array<Maybe<OrganizationEngagementDto>>>;
};

export type OrganizationList = {
  __typename?: "OrganizationList";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<Organization>>>;
};

export enum OrganizationRegion {
  EUROPE = "EUROPE",
  NORTH_AMERICA = "NORTH_AMERICA",
}

export type OrganizationSiteDetailsDto = {
  __typename?: "OrganizationSiteDetailsDTO";
  siteName: Scalars["String"];
  subdomain: Scalars["String"];
};

export type OrganizationSiteDetailsResult = {
  __typename?: "OrganizationSiteDetailsResult";
  count: Scalars["Int"];
  items: Array<OrganizationSiteDetailsDto>;
};

export type OrganizationSiteFilterInput = {
  active?: InputMaybe<SiteFilterActive>;
  live?: InputMaybe<SiteFilterLive>;
  status?: InputMaybe<SiteFilterStatus>;
};

export enum OrganizationType {
  admin = "admin",
  agency = "agency",
  corporate = "corporate",
}

export enum Period_Type {
  LAST_4_WEEKS = "LAST_4_WEEKS",
  LAST_6_MONTHS = "LAST_6_MONTHS",
  LAST_7_DAYS = "LAST_7_DAYS",
  QUARTER_TO_DATE = "QUARTER_TO_DATE",
  YEAR_TO_DATE = "YEAR_TO_DATE",
}

export type Page = {
  __typename?: "Page";
  duration: Scalars["Int"];
  location: Scalars["String"];
  name: Scalars["String"];
  organizationName?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  status?: Maybe<MeetingPageStatus>;
  vendorEditToken?: Maybe<Scalars["String"]>;
  vendorPageId?: Maybe<Scalars["String"]>;
};

export type PageInput = {
  duration?: InputMaybe<Scalars["Int"]>;
  location?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  organizationName?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
};

export type PageListItem = {
  __typename?: "PageListItem";
  duration: Scalars["Int"];
  location: Scalars["String"];
  name: Scalars["String"];
  slug: Scalars["String"];
  status?: Maybe<MeetingPageStatus>;
  vendorEditToken: Scalars["String"];
  vendorPageId?: Maybe<Scalars["String"]>;
};

export type PersonDto = Workflow & {
  __typename?: "PersonDTO";
  active: Scalars["Boolean"];
  bucket?: Maybe<Scalars["String"]>;
  careerHighlight: Scalars["String"];
  departmentWorkflowId: Scalars["String"];
  description: Scalars["String"];
  effectiveDate?: Maybe<Scalars["DateTime"]>;
  firstName: Scalars["String"];
  highResolutionPhotoPath?: Maybe<Scalars["String"]>;
  isDeleted: Scalars["Boolean"];
  languageId: Scalars["Int"];
  lastName: Scalars["String"];
  lowResolutionPhotoPath?: Maybe<Scalars["String"]>;
  middleName: Scalars["String"];
  personId: Scalars["Int"];
  photoPath?: Maybe<Scalars["String"]>;
  publishedRevisionNumber: Scalars["Int"];
  quote: Scalars["String"];
  sortOrder: Scalars["Int"];
  status: WorkflowStatus;
  statusId: Scalars["Int"];
  suffix: Scalars["String"];
  tags: Array<Scalars["String"]>;
  thumbnailPath?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  workflowId: Scalars["String"];
  workingRevisionNumber: Scalars["Int"];
};

export type PersonResult = {
  __typename?: "PersonResult";
  count: Scalars["Int"];
  items: Array<PersonDto>;
};

export type PhoneInput = {
  countryCode: Scalars["String"];
  number: Scalars["String"];
  type: Scalars["String"];
};

export type PlatformStateWorkflow = {
  __typename?: "PlatformStateWorkflow";
  lastModified: Scalars["DateTime"];
  organizationId: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
  status: PlatformWorkflowStateStatus;
  stepId: Scalars["String"];
  workflowId: Scalars["String"];
};

export type PlatformStepActionLabels = {
  __typename?: "PlatformStepActionLabels";
  next: Scalars["String"];
};

export type PlatformStepUserAction = {
  __typename?: "PlatformStepUserAction";
  action: Scalars["String"];
  label: Scalars["String"];
};

export type PlatformWorkflow = {
  __typename?: "PlatformWorkflow";
  completedDate?: Maybe<Scalars["DateTime"]>;
  createDate: Scalars["DateTime"];
  organizationId: Scalars["String"];
  status: PlatformWorkflowStatus;
  type: PlatformWorkflowType;
  version: Scalars["String"];
  workflowId: Scalars["String"];
};

export type PlatformWorkflowDefinition = {
  __typename?: "PlatformWorkflowDefinition";
  steps: Array<Maybe<PlatformWorkflowStep>>;
  title: Scalars["String"];
  type: PlatformWorkflowType;
  version: Scalars["String"];
};

export type PlatformWorkflowDefinitionResult = {
  __typename?: "PlatformWorkflowDefinitionResult";
  count?: Maybe<Scalars["Int"]>;
  items: Array<Maybe<PlatformWorkflowDefinition>>;
};

export type PlatformWorkflowResult = {
  __typename?: "PlatformWorkflowResult";
  count?: Maybe<Scalars["Int"]>;
  items: Array<Maybe<PlatformWorkflow>>;
};

export type PlatformWorkflowStateResult = {
  __typename?: "PlatformWorkflowStateResult";
  count?: Maybe<Scalars["Int"]>;
  items: Array<Maybe<PlatformStateWorkflow>>;
};

export enum PlatformWorkflowStateStatus {
  completed = "completed",
  error = "error",
  inProgress = "inProgress",
  notStarted = "notStarted",
}

export enum PlatformWorkflowStatus {
  completed = "completed",
  inProgress = "inProgress",
}

export type PlatformWorkflowStep = {
  __typename?: "PlatformWorkflowStep";
  actionLabels?: Maybe<PlatformStepActionLabels>;
  requiresStepId?: Maybe<Array<Maybe<Scalars["String"]>>>;
  step?: Maybe<Scalars["Int"]>;
  stepId: Scalars["String"];
  stepType: Scalars["String"];
  steps?: Maybe<Array<Maybe<PlatformWorkflowStep>>>;
  title: Scalars["String"];
  userActions?: Maybe<Array<Maybe<PlatformStepUserAction>>>;
};

export enum PlatformWorkflowStepType {
  gateStep = "gateStep",
  step = "step",
}

export enum PlatformWorkflowType {
  earnings = "earnings",
}

export type PresentationResult = {
  __typename?: "PresentationResult";
  count: Scalars["Int"];
  items: Array<StudioPresentationDto>;
};

export type PresentationSpeakerDto = {
  __typename?: "PresentationSpeakerDTO";
  eventSpeakerId?: Maybe<Scalars["Int"]>;
  flagDeleted?: Maybe<Scalars["Boolean"]>;
  presentationId?: Maybe<Scalars["Int"]>;
  presentationSpeakerId?: Maybe<Scalars["Int"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  speakerName?: Maybe<Scalars["String"]>;
  speakerPosition?: Maybe<Scalars["String"]>;
};

export type PresentationTagsDto = {
  __typename?: "PresentationTagsDTO";
  tagId?: Maybe<Scalars["Int"]>;
  tagName?: Maybe<Scalars["String"]>;
};

export type PressReleaseResult = {
  __typename?: "PressReleaseResult";
  count: Scalars["Int"];
  items: Array<StudioPressReleaseDto>;
};

export type PurchasingPowerDto = {
  __typename?: "PurchasingPowerDTO";
  entityId?: Maybe<Scalars["String"]>;
  purchasingPower?: Maybe<Scalars["Float"]>;
  securityId?: Maybe<Scalars["String"]>;
};

export type PurchasingPowerResult = {
  __typename?: "PurchasingPowerResult";
  items?: Maybe<Array<Maybe<PurchasingPowerDto>>>;
};

export type Query = {
  __typename?: "Query";
  accessGroup?: Maybe<AccessGroup>;
  accessGroups?: Maybe<AccessGroupList>;
  /**
   * This node is responsible for returning daily event data based on market cap or sector
   * @meta permission engagement-analytics::view:engagement
   */
  benchmarkEventDaily?: Maybe<BenchmarkEventDailyResult>;
  capitalConnectUsers?: Maybe<UsersListResult>;
  contact?: Maybe<ContactResult>;
  /** Returns a list of one or more user contact lists */
  contactList?: Maybe<ContactListResponse>;
  /** Returns a list of one or more Corporate Contacts who work at the client's company. These contacts may attend interactions such as meetings with institutions. */
  corporateContact?: Maybe<CorporateContactResponse>;
  /** Returns a list of one or more user generated contacts */
  customContact?: Maybe<CustomContactResponse>;
  departments?: Maybe<DepartmentResult>;
  desktopActivity?: Maybe<DesktopActivityResult>;
  desktopAddressBook?: Maybe<DesktopAddressBookResult>;
  desktopContact?: Maybe<DesktopContactResult>;
  desktopCorporateParticipant?: Maybe<DesktopCorporateParticipantResult>;
  desktopFund?: Maybe<DesktopFundResult>;
  desktopFundHoldingCurrent?: Maybe<DesktopFundHoldingCurrentResult>;
  desktopFundHoldingHistorical?: Maybe<DesktopFundHoldingHistoricalResult>;
  desktopInstHoldingCurrent?: Maybe<DesktopInstHoldingCurrentResult>;
  desktopInstHoldingHistorical?: Maybe<DesktopInstHoldingHistoricalResult>;
  desktopInstitution?: Maybe<DesktopInstitutionResult>;
  desktopMe?: Maybe<DesktopMe>;
  desktopMover?: Maybe<DesktopMoverResult>;
  desktopQuickSearch?: Maybe<DesktopQuickSearchResult>;
  desktopTag?: Maybe<DesktopTagResult>;
  /**
   * This node is responsible for returning daily download engagement data (eg. use in the chart)
   * @meta permission engagement-analytics::view:engagement
   */
  downloadMetricsDaily?: Maybe<DownloadMetricsDailyResult>;
  earningsPlan?: Maybe<EarningsPlanResult>;
  earningsPlanStageStatus?: Maybe<EarningsPlanStageStatusResult>;
  earningsPlanStatus?: Maybe<EarningsPlanStatusResult>;
  earningsPlansByOrganization?: Maybe<EarningsPlansByOrganizationResultDto>;
  /**
   * This node is responsible for returning general engagement data including page view, download, event and email. Avoid using this if possible, since the huge data table size can affect the performance.
   * @meta permission engagement-analytics::view:engagement
   */
  engagement?: Maybe<EngagementResult>;
  /**
   * This node is responsible for returning engagement benchmark score data by sector or market cap.
   * @meta permission engagement-analytics::view:engagement
   */
  engagementBenchmark?: Maybe<EngagementBenchmarkResult>;
  /**
   * This node is responsible for returning daily email data for organization or institution based on the given time range (eg. use in the chart)
   * @meta permission engagement-analytics::view:engagement
   */
  engagementEmailDaily?: Maybe<EngagementEmailDailyResult>;
  /**
   * This node is responsible for returning all the events that happened in the organization within the given time range.
   * @meta permission engagement-analytics::view:engagement
   */
  engagementEventDaily?: Maybe<EngagementEventDailyResult>;
  /**
   * This node is responsible for returning list of similar institutions based on engagement activities
   * @meta permission engagement-analytics::view:engagement
   */
  engagementSimilarity?: Maybe<EngagementSimilarityResult>;
  /**
   * This node is responsible for getting the tracked sites of an organization
   * @meta permission engagement-analytics::view:engagement
   */
  engagementTrackedSite?: Maybe<TrackedSitesResult>;
  /** This node sends the weekly digest email to a certain user. Used for testing purposes and for any possible failures in the scheduled job */
  engagementWeeklyEmail?: Maybe<SentEmailResult>;
  /** Returns a list of one or more Notes created by users for a given entity.  */
  entityNote?: Maybe<EntityNoteResponse>;
  entitySearch?: Maybe<EntitySearchResult>;
  event?: Maybe<EventResult>;
  eventById?: Maybe<StudioEventDto>;
  /**
   * This node is responsible for returning a summary of event engagement data (attendees and registrations) based on the given period.
   * @meta permission engagement-analytics::view:engagement
   */
  eventMetricsAggregate?: Maybe<EventMetricsAggregateResult>;
  faq?: Maybe<FaqResult>;
  faqById?: Maybe<StudioFaqDto>;
  fund?: Maybe<FundResult>;
  /** Returns user connection to the vendor's email API and account info used to connect */
  getEmailUser?: Maybe<GetEmailUserResponse>;
  /** Returns data for a specific Scheduler page identified by its unique slug */
  getScheduler?: Maybe<GetSchedulerResponse>;
  /** Returns a list of all Scheduler pages belonging to a particular user. */
  getSchedulerPages?: Maybe<GetSchedulerPageResponse>;
  /** Returns the upload and fetch URL from File ECS */
  getUploadUrl?: Maybe<GetUploadUrlResponse>;
  /** Check if user has valid access token for email vendor */
  getUserLoginStatus?: Maybe<GetUserLoginStatusResponse>;
  hello: Scalars["String"];
  /**
   * This node is responsible for returning a list of contacts in the institution with ownership and engagement data.
   * @meta permission engagement-analytics::view:engagement
   */
  insiderEngagement?: Maybe<InsiderEngagementResult>;
  instHolding?: Maybe<InstHoldingResult>;
  instHoldingCurrent?: Maybe<InstHoldingCurrentResult>;
  instHoldingCurrentAggregate?: Maybe<InstHoldingCurrentAggregateResult>;
  institution?: Maybe<InstitutionResult>;
  /** Returns a list of one or more Interactions with an Institution or Contact */
  interaction?: Maybe<InteractionResponse>;
  /** Returns a list Interaction types */
  interactionType?: Maybe<InteractionTypeResponse>;
  listEarningsMessage?: Maybe<EarningsMessageListResult>;
  me?: Maybe<User>;
  notificationList?: Maybe<NotificationList>;
  /** This node is for getting (query) and setting (mutation) the user's notification preferences */
  notificationPreferences?: Maybe<NotificationPreferencesResult>;
  organization?: Maybe<Organization>;
  /**
   * This node is responsible for returning engagement data (page view, event, and email) at organization level.
   * @meta permission engagement-analytics::view:engagement
   */
  organizationEngagement?: Maybe<OrganizationEngagementResult>;
  organizationSites?: Maybe<OrganizationSiteDetailsResult>;
  organizationTrials?: Maybe<Array<Maybe<Trial>>>;
  organizations?: Maybe<OrganizationList>;
  organizationsManagedByUser?: Maybe<OrganizationList>;
  people?: Maybe<PersonResult>;
  /**
   * Returns a list of Workflow entities
   * @meta permission workflow::create:workflow
   */
  platformWorkflow?: Maybe<PlatformWorkflowResult>;
  platformWorkflowDefinition?: Maybe<PlatformWorkflowDefinitionResult>;
  /**
   * State management to keep track of an organization’s progression throughout the workflow
   * @meta permission workflow::create:workflow
   */
  platformWorkflowState?: Maybe<PlatformWorkflowStateResult>;
  presentationById?: Maybe<StudioPresentationDto>;
  presentations?: Maybe<PresentationResult>;
  pressReleaseById?: Maybe<StudioPressReleaseDto>;
  pressReleases?: Maybe<PressReleaseResult>;
  purchasingPower?: Maybe<PurchasingPowerResult>;
  request?: Maybe<RequestResult>;
  requestGetChangeSummary?: Maybe<ChangeSummary>;
  siteCapabilitiesContentAutomation?: Maybe<SiteCapabilitiesContentAutomationDto>;
  siteCapabilitiesFieldConfiguration?: Maybe<SiteCapabilitiesFieldConfigurationDto>;
  siteDetails?: Maybe<SiteDetailsDto>;
  stock?: Maybe<StockResult>;
  tagTemplates?: Maybe<TagTemplateCollectionDto>;
  timezones?: Maybe<TimezoneResult>;
  /**
   * This node is responsible for returning list of top download files data for Organization or institution in given time period.
   * @meta permission engagement-analytics::view:engagement
   */
  topDownload?: Maybe<TopDownloadResult>;
  /**
   * This node is responsible for returning list of top events data for Organization or institution in given time period.
   * @meta permission engagement-analytics::view:engagement
   */
  topEvents?: Maybe<TopEventsResult>;
  /**
   * This node is responsible for returning list of top attendees by total engaged time for institution in given time period.
   * @meta permission engagement-analytics::view:engagement
   */
  topEventsAttendees?: Maybe<TopEventsAttendeesResult>;
  /**
   * This node is responsible for returning list of top visited page data for institution in given time period.
   * @meta permission engagement-analytics::view:engagement
   */
  topPage?: Maybe<TopPageResult>;
  user?: Maybe<User>;
  userSearch?: Maybe<User>;
  users?: Maybe<UserList>;
  usersByOrganization?: Maybe<OffsetPaginatedUserList>;
  /**
   * This node is responsible for getting web downloads by file
   * @meta permission engagement-analytics::view:engagement
   */
  webDownloads?: Maybe<WebDownloadsResult>;
  /**
   * This node is responsible for getting the list of institutions that downloaded content from my organization sorted by recency
   * @meta permission engagement-analytics::view:engagement
   */
  webDownloadsActivity?: Maybe<WebDownloadsActivityResult>;
  /**
   * This node is responsible for getting web downloads performance data (largest % increase/decrease) by file
   * @meta permission engagement-analytics::view:engagement
   */
  webDownloadsPerformanceByFile?: Maybe<WebDownloadsPerformanceResult>;
  /**
   * This node is responsible for getting web downloads performance by region
   * @meta permission engagement-analytics::view:engagement
   */
  webDownloadsPerformanceByRegion?: Maybe<WebDownloadsPerformanceByRegionResult>;
  /**
   * This node is responsible for returning a summary of page view and download data for organization or institution based on the given period.
   * @meta permission engagement-analytics::view:engagement
   */
  webMetricsAggregate?: Maybe<WebMetricsAggregateResult>;
  /**
   * This node is responsible for returning daily page view data for organization or institution based on the given time range (eg. use in the chart)
   * @meta permission engagement-analytics::view:engagement
   */
  webMetricsDaily?: Maybe<WebMetricsDailyResult>;
  /**
   * This node is responsible for getting page views data aggregated by URL
   * @meta permission engagement-analytics::view:engagement
   */
  webPageViews?: Maybe<WebPageViewsResult>;
  /**
   * This node is for getting organization's most and least viewed web page
   * @meta permission engagement-analytics::view:engagement
   */
  webPageViewsPerformance?: Maybe<WebPageViewsPerformanceResult>;
  /**
   * This node is responsible for getting data for web page views performance by region
   * @meta permission engagement-analytics::view:engagement
   */
  webPageViewsPerformanceByRegion?: Maybe<WebPageViewsPerformanceByRegionResult>;
};

export type QueryAccessGroupArgs = {
  id: Scalars["String"];
  organizationId?: InputMaybe<Scalars["String"]>;
};

export type QueryAccessGroupsArgs = {
  organizationId?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  pageSize?: InputMaybe<Scalars["Int"]>;
};

export type QueryBenchmarkEventDailyArgs = {
  aggregateFunction?: InputMaybe<Aggregate_Function>;
  dimension?: InputMaybe<Array<Engagement_Dimension>>;
  endDate?: InputMaybe<Scalars["String"]>;
  entityId?: InputMaybe<Scalars["String"]>;
  startDate: Scalars["String"];
};

export type QueryCapitalConnectUsersArgs = {
  organizationId: Scalars["String"];
};

export type QueryContactArgs = {
  entityType?: InputMaybe<FilterContactsByEntityType>;
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  includeCustomContacts?: InputMaybe<Scalars["Boolean"]>;
  includeOverrideContacts?: InputMaybe<Scalars["Boolean"]>;
  includeQ4Contacts?: InputMaybe<Scalars["Boolean"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<ContactSearch>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
};

export type QueryContactListArgs = {
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<SortInput>;
};

export type QueryCorporateContactArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
};

export type QueryCustomContactArgs = {
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  institution?: InputMaybe<InstitutionInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<SearchInput>;
  sort?: InputMaybe<SortInput>;
};

export type QueryDepartmentsArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  profile?: InputMaybe<DataProfile>;
  subdomain: Scalars["String"];
};

export type QueryDesktopActivityArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  filter?: InputMaybe<ActivityFilter>;
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
};

export type QueryDesktopAddressBookArgs = {
  contactId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  searchField?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
};

export type QueryDesktopContactArgs = {
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  securityId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDesktopCorporateParticipantArgs = {
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
};

export type QueryDesktopFundArgs = {
  id: Array<InputMaybe<Scalars["String"]>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryDesktopFundHoldingCurrentArgs = {
  field?: InputMaybe<Scalars["String"]>;
  filter?: InputMaybe<FundHoldingCurrentFilter>;
  fundId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  group?: InputMaybe<GroupBy>;
  institutionId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  searchField?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  tickerId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDesktopFundHoldingHistoricalArgs = {
  fundId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  quarterDate?: InputMaybe<Scalars["String"]>;
  quarters?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  searchField?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  tickerId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDesktopInstHoldingCurrentArgs = {
  filter?: InputMaybe<InstHoldingCurrentFilter>;
  group?: InputMaybe<GroupBy>;
  institutionId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  searchField?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  tickerId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDesktopInstHoldingHistoricalArgs = {
  filter?: InputMaybe<InstHoldingHistoricalFilter>;
  group?: InputMaybe<GroupBy>;
  institutionId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  metric?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  quarterDate?: InputMaybe<Scalars["String"]>;
  quarters?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  searchField?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  tickerId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDesktopInstitutionArgs = {
  id: Array<InputMaybe<Scalars["String"]>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryDesktopMoverArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Scalars["String"]>;
  filter?: InputMaybe<MoverFilter>;
  limit?: InputMaybe<Scalars["Int"]>;
  moverType?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  quarterDate?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
};

export type QueryDesktopQuickSearchArgs = {
  entity?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  query?: InputMaybe<Scalars["String"]>;
};

export type QueryDesktopTagArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
};

export type QueryDownloadMetricsDailyArgs = {
  endDate?: InputMaybe<Scalars["String"]>;
  entityId?: InputMaybe<Scalars["String"]>;
  startDate: Scalars["String"];
};

export type QueryEarningsPlanArgs = {
  id: Scalars["String"];
};

export type QueryEarningsPlanStageStatusArgs = {
  earningsPlanId: Scalars["String"];
  stageId: Scalars["String"];
};

export type QueryEarningsPlanStatusArgs = {
  id: Scalars["String"];
};

export type QueryEarningsPlansByOrganizationArgs = {
  organizationId?: InputMaybe<Scalars["String"]>;
};

export type QueryEngagementArgs = {
  entityId?: InputMaybe<Array<Scalars["String"]>>;
  filter?: InputMaybe<EngagementFilter>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  q4SecurityId?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Array<InputMaybe<SortRule>>>;
};

export type QueryEngagementBenchmarkArgs = {
  dimension: Array<Engagement_Dimension>;
  metric: Engagement_Metric;
  periodType: Period_Type;
};

export type QueryEngagementEmailDailyArgs = {
  aggregateFunction?: InputMaybe<Aggregate_Function>;
  dimension?: InputMaybe<Array<Engagement_Dimension>>;
  endDate?: InputMaybe<Scalars["String"]>;
  entityId?: InputMaybe<Scalars["String"]>;
  startDate: Scalars["String"];
};

export type QueryEngagementEventDailyArgs = {
  endDate?: InputMaybe<Scalars["String"]>;
  startDate: Scalars["String"];
};

export type QueryEngagementSimilarityArgs = {
  entityId: Scalars["String"];
  hasEngagement?: InputMaybe<Scalars["Boolean"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<SortRule>>>;
};

export type QueryEntityNoteArgs = {
  entityId?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEntitySearchArgs = {
  entityType: Array<SearchEntityType>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  query: Scalars["String"];
};

export type QueryEventArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  profile?: InputMaybe<DataProfile>;
  subdomain: Scalars["String"];
};

export type QueryEventByIdArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  subdomain: Scalars["String"];
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type QueryEventMetricsAggregateArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  periodType?: InputMaybe<Period_Type>;
};

export type QueryFaqArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  profile?: InputMaybe<DataProfile>;
  subdomain: Scalars["String"];
};

export type QueryFaqByIdArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  subdomain: Scalars["String"];
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type QueryFundArgs = {
  currencyCode?: InputMaybe<Scalars["String"]>;
  entityId?: InputMaybe<Array<Scalars["String"]>>;
  entityType?: InputMaybe<Entity_Type>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetEmailUserArgs = {
  userId?: InputMaybe<Scalars["String"]>;
};

export type QueryGetSchedulerArgs = {
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryGetSchedulerPagesArgs = {
  userId?: InputMaybe<Scalars["String"]>;
};

export type QueryGetUploadUrlArgs = {
  organizationId?: InputMaybe<Scalars["String"]>;
};

export type QueryGetUserLoginStatusArgs = {
  userId?: InputMaybe<Scalars["String"]>;
};

export type QueryInsiderEngagementArgs = {
  entityId: Scalars["String"];
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  periodType?: InputMaybe<Period_Type>;
  q4SecurityId?: InputMaybe<Scalars["String"]>;
};

export type QueryInstHoldingArgs = {
  entityId: Array<Scalars["String"]>;
  identifier?: InputMaybe<Array<Scalars["String"]>>;
  q4SecurityId?: InputMaybe<Scalars["String"]>;
};

export type QueryInstHoldingCurrentArgs = {
  entityId: Array<Scalars["String"]>;
  identifier?: InputMaybe<Array<Scalars["String"]>>;
  q4SecurityId?: InputMaybe<Scalars["String"]>;
};

export type QueryInstHoldingCurrentAggregateArgs = {
  aggrField?: InputMaybe<Aggr_Field>;
  entityId: Array<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<SortRule>>>;
};

export type QueryInstitutionArgs = {
  currencyCode?: InputMaybe<Scalars["String"]>;
  entityId: Array<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryInteractionArgs = {
  contactId?: InputMaybe<Scalars["String"]>;
  dateRange?: InputMaybe<InteractionDateRange>;
  id?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Scalars["String"]>;
};

export type QueryListEarningsMessageArgs = {
  options: EarningsMessageListRequestDto;
};

export type QueryNotificationListArgs = {
  notificationId?: InputMaybe<Scalars["String"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
};

export type QueryNotificationPreferencesArgs = {
  notificationType?: InputMaybe<Notification_Type>;
};

export type QueryOrganizationArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryOrganizationEngagementArgs = {
  periodType: Period_Type;
};

export type QueryOrganizationSitesArgs = {
  organizationId: Scalars["String"];
  siteFilter?: InputMaybe<OrganizationSiteFilterInput>;
};

export type QueryOrganizationTrialsArgs = {
  expired?: InputMaybe<Scalars["Boolean"]>;
  trialType?: InputMaybe<Scalars["String"]>;
};

export type QueryOrganizationsArgs = {
  active?: InputMaybe<Scalars["Boolean"]>;
  delegateOrganizationId?: InputMaybe<Scalars["String"]>;
  managedBy?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchTerm?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type QueryPeopleArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  profile?: InputMaybe<DataProfile>;
  subdomain: Scalars["String"];
};

export type QueryPlatformWorkflowArgs = {
  status?: InputMaybe<PlatformWorkflowStatus>;
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type QueryPlatformWorkflowDefinitionArgs = {
  version: Scalars["String"];
  workflowType: PlatformWorkflowType;
};

export type QueryPlatformWorkflowStateArgs = {
  stepId?: InputMaybe<Scalars["String"]>;
  workflowId: Scalars["String"];
};

export type QueryPresentationByIdArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  subdomain: Scalars["String"];
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type QueryPresentationsArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  profile?: InputMaybe<DataProfile>;
  subdomain: Scalars["String"];
};

export type QueryPressReleaseByIdArgs = {
  languageId?: InputMaybe<Scalars["Int"]>;
  subdomain: Scalars["String"];
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type QueryPressReleasesArgs = {
  categoryWorkflowId?: InputMaybe<Scalars["String"]>;
  languageId?: InputMaybe<Scalars["Int"]>;
  profile?: InputMaybe<DataProfile>;
  subdomain: Scalars["String"];
};

export type QueryPurchasingPowerArgs = {
  entityId: Array<Scalars["String"]>;
  entityType: Scalars["String"];
  securityId: Array<Scalars["String"]>;
};

export type QueryRequestArgs = {
  id?: InputMaybe<Scalars["String"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  product?: InputMaybe<RequestProductEnum>;
  startKey?: InputMaybe<Scalars["String"]>;
};

export type QueryRequestGetChangeSummaryArgs = {
  jobIndex: Scalars["Int"];
  request: RequestInput;
};

export type QuerySiteCapabilitiesContentAutomationArgs = {
  subdomain: Scalars["String"];
};

export type QuerySiteCapabilitiesFieldConfigurationArgs = {
  subdomain: Scalars["String"];
};

export type QuerySiteDetailsArgs = {
  subdomain: Scalars["String"];
};

export type QueryStockArgs = {
  endDate?: InputMaybe<Scalars["String"]>;
  identifiers?: InputMaybe<Array<Scalars["String"]>>;
  q4SecurityId?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["String"]>;
};

export type QueryTagTemplatesArgs = {
  filter?: InputMaybe<TagTemplateFilter>;
  subdomain: Scalars["String"];
};

export type QueryTimezonesArgs = {
  subdomain: Scalars["String"];
};

export type QueryTopDownloadArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Array<Entity_Type>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  periodType: Period_Type;
};

export type QueryTopEventsArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  periodType: Period_Type;
  sort?: InputMaybe<Array<InputMaybe<SortRule>>>;
};

export type QueryTopEventsAttendeesArgs = {
  entityId: Scalars["String"];
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  periodType: Period_Type;
};

export type QueryTopPageArgs = {
  entityId: Scalars["String"];
  entityType?: InputMaybe<Array<Entity_Type>>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  periodType: Period_Type;
};

export type QueryUserArgs = {
  id: Scalars["String"];
  userId: Scalars["String"];
};

export type QueryUserSearchArgs = {
  email: Scalars["String"];
};

export type QueryUsersArgs = {
  organizationId?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchTerm?: InputMaybe<Scalars["String"]>;
};

export type QueryUsersByOrganizationArgs = {
  organizationId: Scalars["String"];
  pagination: OffsetPagination;
  searchTerm?: InputMaybe<Scalars["String"]>;
};

export type QueryWebDownloadsArgs = {
  aggregateFunction?: InputMaybe<Aggregate_Function>;
  endDate?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  startDate: Scalars["String"];
};

export type QueryWebDownloadsActivityArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  periodType: Period_Type;
};

export type QueryWebDownloadsPerformanceByFileArgs = {
  periodType: Period_Type;
};

export type QueryWebDownloadsPerformanceByRegionArgs = {
  endDate?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  startDate: Scalars["String"];
};

export type QueryWebMetricsAggregateArgs = {
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Entity_Type>;
  periodType?: InputMaybe<Period_Type>;
};

export type QueryWebMetricsDailyArgs = {
  aggregateFunction?: InputMaybe<Aggregate_Function>;
  dimension?: InputMaybe<Array<Engagement_Dimension>>;
  endDate?: InputMaybe<Scalars["String"]>;
  entityId?: InputMaybe<Scalars["String"]>;
  entityType?: InputMaybe<Entity_Type>;
  startDate: Scalars["String"];
};

export type QueryWebPageViewsArgs = {
  aggregateFunction?: InputMaybe<Aggregate_Function>;
  endDate?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  startDate: Scalars["String"];
};

export type QueryWebPageViewsPerformanceArgs = {
  periodType: Period_Type;
};

export type QueryWebPageViewsPerformanceByRegionArgs = {
  endDate?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  startDate: Scalars["String"];
};

export type RemoveAttachmentResponse = {
  __typename?: "RemoveAttachmentResponse";
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type RequestCaseDetailDto = {
  __typename?: "RequestCaseDetailDTO";
  id?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["String"]>;
  publishingMethod?: Maybe<JobPublishingMethodEnum>;
  status: JobStatusEnum;
};

export type RequestCreateInputSchema = {
  data: StudioRequestDataInput;
  jobs: Array<CreateRequestJobInput>;
  product: RequestProductEnum;
};

export type RequestDto = {
  __typename?: "RequestDTO";
  caseId?: Maybe<Scalars["String"]>;
  caseNumber?: Maybe<Scalars["String"]>;
  createdAt: Scalars["Date"];
  createdBy: UserDto;
  data?: Maybe<RequestDataUnion>;
  id: Scalars["String"];
  jobs: Array<RequestJobDto>;
  lastUpdatedAt?: Maybe<Scalars["Date"]>;
  lastUpdatedBy?: Maybe<UserDto>;
  organizationId: Scalars["String"];
  product: RequestProductEnum;
  schemaVersion?: Maybe<Scalars["Int"]>;
  version?: Maybe<Scalars["Int"]>;
};

export type RequestDataUnion = StudioDto;

export type RequestFileAttachmentDto = {
  __typename?: "RequestFileAttachmentDTO";
  comment?: Maybe<Scalars["String"]>;
  documentType?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  s3Id?: Maybe<Scalars["String"]>;
};

export enum RequestFileDocumentTypeEnum {
  event = "event",
  financial = "financial",
  generic = "generic",
  governance = "governance",
  news = "news",
  presentation = "presentation",
}

export type RequestFileInput = {
  comment: Scalars["String"];
  documentType?: InputMaybe<RequestFileDocumentTypeEnum>;
  fileName: Scalars["String"];
  id: Scalars["String"];
  s3Id: Scalars["String"];
};

export type RequestInput = {
  data: StudioRequestDataInput;
  jobs: Array<RequestJobInput>;
  product: RequestProductEnum;
};

export type RequestJobDto = {
  __typename?: "RequestJobDTO";
  case?: Maybe<RequestCaseDetailDto>;
  data?: Maybe<JobDataUnion>;
  files: Array<RequestFileAttachmentDto>;
  id: Scalars["String"];
  instructions: Scalars["String"];
  schedule: RequestScheduleDto;
  type?: Maybe<RequestJobEnum>;
};

export enum RequestJobEnum {
  accountSubmit = "accountSubmit",
  billingSubmit = "billingSubmit",
  epEventCreate = "epEventCreate",
  epEventUpdate = "epEventUpdate",
  studioAnalystCoverageCreate = "studioAnalystCoverageCreate",
  studioAnalystCoverageRemove = "studioAnalystCoverageRemove",
  studioAnalystCoverageUpdate = "studioAnalystCoverageUpdate",
  studioDividendsCreate = "studioDividendsCreate",
  studioDividendsRemove = "studioDividendsRemove",
  studioDividendsUpdate = "studioDividendsUpdate",
  studioEventAutoCreate = "studioEventAutoCreate",
  studioEventAutoRemove = "studioEventAutoRemove",
  studioEventAutoUpdate = "studioEventAutoUpdate",
  studioEventCreate = "studioEventCreate",
  studioEventRemove = "studioEventRemove",
  studioEventUpdate = "studioEventUpdate",
  studioFAQCreate = "studioFAQCreate",
  studioFAQRemove = "studioFAQRemove",
  studioFAQUpdate = "studioFAQUpdate",
  studioFaqManage = "studioFaqManage",
  studioGovernanceCreate = "studioGovernanceCreate",
  studioGovernanceRemove = "studioGovernanceRemove",
  studioGovernanceUpdate = "studioGovernanceUpdate",
  studioJobPostingCreate = "studioJobPostingCreate",
  studioJobPostingRemove = "studioJobPostingRemove",
  studioJobPostingUpdate = "studioJobPostingUpdate",
  studioNewsCreate = "studioNewsCreate",
  studioNewsRemove = "studioNewsRemove",
  studioNewsUpdate = "studioNewsUpdate",
  studioOtherSubmit = "studioOtherSubmit",
  studioPersonCreate = "studioPersonCreate",
  studioPersonManage = "studioPersonManage",
  studioPersonRemove = "studioPersonRemove",
  studioPersonUpdate = "studioPersonUpdate",
  studioPresentationAutoCreate = "studioPresentationAutoCreate",
  studioPresentationAutoRemove = "studioPresentationAutoRemove",
  studioPresentationAutoUpdate = "studioPresentationAutoUpdate",
  studioPresentationCreate = "studioPresentationCreate",
  studioPresentationRemove = "studioPresentationRemove",
  studioPresentationUpdate = "studioPresentationUpdate",
  studioPressReleaseAutoCreate = "studioPressReleaseAutoCreate",
  studioPressReleaseAutoRemove = "studioPressReleaseAutoRemove",
  studioPressReleaseAutoUpdate = "studioPressReleaseAutoUpdate",
  studioSecureFileUpload = "studioSecureFileUpload",
}

export type RequestJobInput = {
  data: JobDataInput;
  files: Array<RequestFileInput>;
  id: Scalars["String"];
  instructions?: InputMaybe<Scalars["String"]>;
  schedule: RequestScheduleInput;
  type: RequestJobEnum;
};

export type RequestJobUpdateInputSchema = {
  data?: InputMaybe<JobDataInput>;
  files?: InputMaybe<Array<RequestFileInput>>;
  instructions?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<RequestScheduleInput>;
  type?: InputMaybe<RequestJobEnum>;
};

export enum RequestProductEnum {
  eventsPlatform = "eventsPlatform",
  studio = "studio",
}

export type RequestResult = {
  __typename?: "RequestResult";
  count: Scalars["Int"];
  items: Array<RequestDto>;
};

export type RequestScheduleDto = {
  __typename?: "RequestScheduleDTO";
  coordinateNews: Scalars["Boolean"];
  date?: Maybe<Scalars["Date"]>;
  instructions: Scalars["String"];
  timezone?: Maybe<Scalars["String"]>;
};

export type RequestScheduleInput = {
  coordinateNews: Scalars["Boolean"];
  date?: InputMaybe<Scalars["Date"]>;
  instructions: Scalars["String"];
  timezone?: InputMaybe<Scalars["String"]>;
};

export type RequestStudioPressReleaseAttachmentDto = {
  __typename?: "RequestStudioPressReleaseAttachmentDTO";
  documentType: StudioAttachmentDocumentTypeEnum;
  path: StudioFileDto;
  title: Scalars["String"];
  type: StudioAttachmentTypeEnum;
};

export type RequestStudioPressReleaseMediaFileDto = {
  __typename?: "RequestStudioPressReleaseMediaFileDTO";
  active?: Maybe<Scalars["Boolean"]>;
  height?: Maybe<Scalars["Int"]>;
  path: StudioFileDto;
  thumbnailPath?: Maybe<StudioFileDto>;
  title: Scalars["String"];
  type: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export enum Site_Type {
  EXTERNAL = "EXTERNAL",
  STUDIO = "STUDIO",
}

export enum Sort_Dir {
  asc = "asc",
  desc = "desc",
}

export type Scheduler = {
  __typename?: "Scheduler";
  slug: Scalars["String"];
};

export type Search = {
  __typename?: "Search";
  by?: Maybe<Array<Maybe<Scalars["String"]>>>;
  query?: Maybe<Scalars["String"]>;
};

export enum SearchEntityType {
  fund = "fund",
  institution = "institution",
  security = "security",
}

export type SearchInput = {
  by?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  query?: InputMaybe<Scalars["String"]>;
};

export type SecurityEntitySearchDto = EntitySearchDto & {
  __typename?: "SecurityEntitySearchDTO";
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
  entityType?: Maybe<SearchEntityType>;
  exchange?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
};

export type SendEmailResponse = {
  __typename?: "SendEmailResponse";
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type SentEmailResult = {
  __typename?: "SentEmailResult";
  reason?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Service = {
  __typename?: "Service";
  demo?: Maybe<Scalars["Boolean"]>;
  enabled?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
};

export type SetNotificationPreferencesResult = {
  __typename?: "SetNotificationPreferencesResult";
  data?: Maybe<NotificationPreferencesDto>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type SiteCapabilitiesContentAutomationDto = {
  __typename?: "SiteCapabilitiesContentAutomationDTO";
  eventsAutomationEnabled: Scalars["Boolean"];
  eventsExpressEnabled: Scalars["Boolean"];
  faqsAutomationEnabled: Scalars["Boolean"];
  faqsExpressEnabled: Scalars["Boolean"];
  lastUpdated?: Maybe<SiteCapabilitySettingAuditDto>;
  newsAutomationEnabled: Scalars["Boolean"];
  newsExpressEnabled: Scalars["Boolean"];
  peopleAutomationEnabled: Scalars["Boolean"];
  peopleExpressEnabled: Scalars["Boolean"];
  presentationsAutomationEnabled: Scalars["Boolean"];
  presentationsExpressEnabled: Scalars["Boolean"];
};

export type SiteCapabilitiesFieldConfigurationDto = {
  __typename?: "SiteCapabilitiesFieldConfigurationDTO";
  eventsAutomationEnabledFields?: Maybe<Scalars["String"]>;
  lastUpdated?: Maybe<SiteCapabilitySettingAuditDto>;
  personAutomationEnabledFields?: Maybe<Scalars["String"]>;
};

export type SiteCapabilitySettingAuditDto = {
  __typename?: "SiteCapabilitySettingAuditDTO";
  timeStamp?: Maybe<Scalars["DateTime"]>;
  userEmail?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["Int"]>;
};

export type SiteDetailsDto = {
  __typename?: "SiteDetailsDTO";
  defaultDomain: Scalars["String"];
  group?: Maybe<Scalars["String"]>;
  organizationId: Scalars["String"];
  protectionLevel: Scalars["String"];
  status: Scalars["String"];
};

export enum SiteFilterActive {
  active = "active",
  all = "all",
  inactive = "inactive",
}

export enum SiteFilterLive {
  all = "all",
  live = "live",
  notlive = "notlive",
}

export enum SiteFilterStatus {
  all = "all",
  implementations = "implementations",
  live = "live",
  old = "old",
}

export type Sort = {
  __typename?: "Sort";
  by?: Maybe<Scalars["String"]>;
  direction?: Maybe<Scalars["String"]>;
};

export type SortInput = {
  by?: InputMaybe<Scalars["String"]>;
  direction?: InputMaybe<Scalars["String"]>;
};

export enum StageAutoPublishStatus {
  lowMatch = "lowMatch",
  matched = "matched",
  noMatch = "noMatch",
  published = "published",
}

export enum StageTypeEnum {
  AUTO_PUBLISH_DATE_TIME = "AUTO_PUBLISH_DATE_TIME",
  AUTO_PUBLISH_PRESS_RELEASE = "AUTO_PUBLISH_PRESS_RELEASE",
  MANUEL_PUBLISH_STAGE = "MANUEL_PUBLISH_STAGE",
  MANUEL_PUBLISH_TRIGGER = "MANUEL_PUBLISH_TRIGGER",
}

export type StartDate = {
  date?: InputMaybe<Scalars["Date"]>;
  timezone?: InputMaybe<Scalars["String"]>;
  utcOffset?: InputMaybe<Scalars["Int"]>;
};

export type StockDto = {
  __typename?: "StockDTO";
  currency?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  high?: Maybe<Scalars["Float"]>;
  last?: Maybe<Scalars["Float"]>;
  lastClose?: Maybe<Scalars["Float"]>;
  lastCloseChange?: Maybe<Scalars["Float"]>;
  lastCloseChangePercent?: Maybe<Scalars["Float"]>;
  low?: Maybe<Scalars["Float"]>;
  open?: Maybe<Scalars["Float"]>;
  volume?: Maybe<Scalars["Float"]>;
};

export type StockResult = {
  __typename?: "StockResult";
  average?: Maybe<Scalars["Float"]>;
  items?: Maybe<Array<Maybe<StockDto>>>;
};

export type StudioAnalystCoverageCreateDto = {
  __typename?: "StudioAnalystCoverageCreateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioAnalystCoverageRemoveDto = {
  __typename?: "StudioAnalystCoverageRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioAnalystCoverageUpdateDto = {
  __typename?: "StudioAnalystCoverageUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export enum StudioAttachmentDocumentTypeEnum {
  file = "file",
  online = "online",
}

export enum StudioAttachmentOperationEnum {
  added = "added",
  modified = "modified",
  removed = "removed",
  renamed = "renamed",
  unchanged = "unchanged",
}

export enum StudioAttachmentTypeEnum {
  Audio = "Audio",
  Document = "Document",
  Presentation = "Presentation",
  Video = "Video",
}

export enum StudioChangeAreaEnum {
  allSections = "allSections",
  chosenSections = "chosenSections",
}

export type StudioDto = {
  __typename?: "StudioDTO";
  studioBucketId?: Maybe<Scalars["Int"]>;
  studioSiteId?: Maybe<Scalars["String"]>;
};

export type StudioDepartmentSortedDto = {
  __typename?: "StudioDepartmentSortedDTO";
  name?: Maybe<Scalars["String"]>;
  newOrder?: Maybe<Array<StudioPersonSummaryDto>>;
  oldOrder?: Maybe<Array<StudioPersonSummaryDto>>;
};

export type StudioDepartmentSortedInput = {
  name?: InputMaybe<Scalars["String"]>;
  newOrder?: InputMaybe<Array<StudioPersonInput>>;
  oldOrder?: InputMaybe<Array<StudioPersonInput>>;
};

export type StudioDetails = {
  __typename?: "StudioDetails";
  subdomain: Scalars["String"];
};

export type StudioDividendsCreateDto = {
  __typename?: "StudioDividendsCreateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioDividendsRemoveDto = {
  __typename?: "StudioDividendsRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioDividendsUpdateDto = {
  __typename?: "StudioDividendsUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioEventAttachmentDto = {
  __typename?: "StudioEventAttachmentDTO";
  documentType: Scalars["String"];
  path: StudioFileDto;
  sortOrder: Scalars["Int"];
  title: Scalars["String"];
  type: Scalars["String"];
};

export type StudioEventAttachmentInput = {
  documentType: StudioAttachmentDocumentTypeEnum;
  path: StudioFileInput;
  sortOrder: Scalars["Int"];
  title: Scalars["String"];
  type: StudioAttachmentTypeEnum;
};

export type StudioEventAutoCreateDto = {
  __typename?: "StudioEventAutoCreateDTO";
  attachments?: Maybe<Array<Maybe<StudioEventAttachmentDto>>>;
  body?: Maybe<Scalars["String"]>;
  eventLocation?: Maybe<Scalars["String"]>;
  isExpress?: Maybe<Scalars["Boolean"]>;
  linkToUrl?: Maybe<Scalars["String"]>;
  noSubscriberEmail: Scalars["Boolean"];
  startDateTime: Scalars["String"];
  studioGlobalTimezoneId?: Maybe<Scalars["Int"]>;
  studioGroupId?: Maybe<Scalars["Int"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  timezone: Scalars["String"];
  timezoneShort?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  webcastLink?: Maybe<Scalars["String"]>;
};

export type StudioEventAutoCreateDataInput = {
  attachments?: InputMaybe<Array<StudioEventAttachmentInput>>;
  body?: InputMaybe<Scalars["String"]>;
  eventLocation?: InputMaybe<Scalars["String"]>;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  linkToUrl?: InputMaybe<Scalars["String"]>;
  noSubscriberEmail: Scalars["Boolean"];
  startDateTime: Scalars["String"];
  studioGlobalTimezoneId?: InputMaybe<Scalars["Int"]>;
  tags?: InputMaybe<Array<Scalars["String"]>>;
  timezone: Scalars["String"];
  timezoneShort?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
  webcastLink?: InputMaybe<Scalars["String"]>;
};

export type StudioEventAutoRemoveChangeSummaryDto = {
  __typename?: "StudioEventAutoRemoveChangeSummaryDTO";
  eventToRemove: StudioEventWorkflowDto;
};

export type StudioEventAutoRemoveChangeSummaryInput = {
  eventToRemove: StudioEventWorkflowInput;
};

export type StudioEventAutoRemoveDto = {
  __typename?: "StudioEventAutoRemoveDTO";
  changeSummary: StudioEventAutoRemoveChangeSummaryDto;
  isExpress?: Maybe<Scalars["Boolean"]>;
  studioChangeArea: StudioChangeAreaEnum;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
};

export type StudioEventAutoRemoveDataInput = {
  changeSummary: StudioEventAutoRemoveChangeSummaryInput;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  studioChangeArea: StudioChangeAreaEnum;
  studioWorkflowId: Scalars["String"];
};

export type StudioEventAutoUpdateChangeSummaryDto = {
  __typename?: "StudioEventAutoUpdateChangeSummaryDTO";
  attachments?: Maybe<Array<StudioEventChangeSummaryAttachmentDto>>;
  body?: Maybe<Scalars["String"]>;
  eventLocation?: Maybe<Scalars["String"]>;
  eventToUpdate: StudioEventWorkflowDto;
  linkToUrl?: Maybe<Scalars["String"]>;
  startDateTime?: Maybe<Scalars["String"]>;
  studioGlobalTimezoneId?: Maybe<Scalars["Int"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  timezone?: Maybe<Scalars["String"]>;
  timezoneShort?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  webcastLink?: Maybe<Scalars["String"]>;
};

export type StudioEventAutoUpdateChangeSummaryInput = {
  attachments?: InputMaybe<Array<StudioEventChangeSummaryAttachmentInput>>;
  body?: InputMaybe<Scalars["String"]>;
  eventLocation?: InputMaybe<Scalars["String"]>;
  eventToUpdate: StudioEventWorkflowInput;
  linkToUrl?: InputMaybe<Scalars["String"]>;
  startDateTime?: InputMaybe<Scalars["String"]>;
  studioGlobalTimezoneId?: InputMaybe<Scalars["Int"]>;
  tags?: InputMaybe<Array<Scalars["String"]>>;
  timezone?: InputMaybe<Scalars["String"]>;
  timezoneShort?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  webcastLink?: InputMaybe<Scalars["String"]>;
};

export type StudioEventAutoUpdateDto = {
  __typename?: "StudioEventAutoUpdateDTO";
  attachments?: Maybe<Array<Maybe<StudioEventAttachmentDto>>>;
  body?: Maybe<Scalars["String"]>;
  changeSummary: StudioEventAutoUpdateChangeSummaryDto;
  eventLocation?: Maybe<Scalars["String"]>;
  isExpress?: Maybe<Scalars["Boolean"]>;
  linkToUrl?: Maybe<Scalars["String"]>;
  startDateTime?: Maybe<Scalars["String"]>;
  studioGlobalTimezoneId?: Maybe<Scalars["Int"]>;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
  tags?: Maybe<Array<Scalars["String"]>>;
  timezone?: Maybe<Scalars["String"]>;
  timezoneShort?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  webcastLink?: Maybe<Scalars["String"]>;
};

export type StudioEventAutoUpdateDataInput = {
  attachments?: InputMaybe<Array<StudioEventAttachmentInput>>;
  body?: InputMaybe<Scalars["String"]>;
  changeSummary: StudioEventAutoUpdateChangeSummaryInput;
  eventLocation?: InputMaybe<Scalars["String"]>;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  linkToUrl?: InputMaybe<Scalars["String"]>;
  startDateTime?: InputMaybe<Scalars["String"]>;
  studioGlobalTimezoneId?: InputMaybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
  tags?: InputMaybe<Array<Scalars["String"]>>;
  timezone?: InputMaybe<Scalars["String"]>;
  timezoneShort?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  webcastLink?: InputMaybe<Scalars["String"]>;
};

export type StudioEventChangeSummaryAttachmentDto = {
  __typename?: "StudioEventChangeSummaryAttachmentDTO";
  attachmentOperation: StudioAttachmentOperationEnum;
  fileName: Scalars["String"];
  title: Scalars["String"];
};

export type StudioEventChangeSummaryAttachmentInput = {
  attachmentOperation: StudioAttachmentOperationEnum;
  fileName: Scalars["String"];
  title: Scalars["String"];
};

export type StudioEventCreateDto = {
  __typename?: "StudioEventCreateDTO";
  noSubscriberEmail: Scalars["Boolean"];
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioEventCreateDataInput = {
  noSubscriberEmail: Scalars["Boolean"];
};

export type StudioEventDto = {
  __typename?: "StudioEventDTO";
  active: Scalars["Boolean"];
  attachments: Array<Maybe<EventAttachmentDto>>;
  body?: Maybe<Scalars["String"]>;
  bucket?: Maybe<Scalars["String"]>;
  documentPath?: Maybe<Scalars["String"]>;
  editUrl?: Maybe<Scalars["String"]>;
  effectiveDate?: Maybe<Scalars["String"]>;
  endDate: Scalars["String"];
  entityTypeId: Scalars["Int"];
  eventId: Scalars["Int"];
  excludeFromLatest: Scalars["String"];
  financialReport?: Maybe<Scalars["String"]>;
  globalTimeZoneId: Scalars["Int"];
  isDeleted: Scalars["Boolean"];
  isWebcast: Scalars["Boolean"];
  languageId: Scalars["Int"];
  lastModifiedBy: Scalars["String"];
  linkToDetailPage: Scalars["String"];
  linkToUrl?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  pressRelease?: Maybe<Scalars["String"]>;
  publishedRevisionNumber: Scalars["Int"];
  seoName: Scalars["String"];
  speakers: Array<Maybe<EventSpeakerDto>>;
  startDate: Scalars["String"];
  status: Scalars["String"];
  statusId: Scalars["Int"];
  tags: Array<Maybe<Scalars["String"]>>;
  timeZone?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  webCastLink?: Maybe<Scalars["String"]>;
  workflowId: Scalars["String"];
  workingRevisionNumber: Scalars["Int"];
};

export type StudioEventRemoveDto = {
  __typename?: "StudioEventRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioEventUpdateDto = {
  __typename?: "StudioEventUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioEventWorkflowDto = {
  __typename?: "StudioEventWorkflowDTO";
  startDate: Scalars["String"];
  title: Scalars["String"];
};

export type StudioEventWorkflowInput = {
  startDate: Scalars["String"];
  title: Scalars["String"];
};

export type StudioFaqCreateDto = {
  __typename?: "StudioFAQCreateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioFaqRemoveDto = {
  __typename?: "StudioFAQRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioFaqUpdateDto = {
  __typename?: "StudioFAQUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioFaqDto = {
  __typename?: "StudioFaqDTO";
  active: Scalars["Boolean"];
  bucket?: Maybe<Scalars["String"]>;
  effectiveDate?: Maybe<Scalars["String"]>;
  entityTypeId: Scalars["Int"];
  faqId: Scalars["Int"];
  isDeleted: Scalars["Boolean"];
  languageId: Scalars["Int"];
  lastModifiedBy?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  names: Array<StudioFaqNameDto>;
  publishedRevisionNumber: Scalars["Int"];
  questions: Array<StudioFaqQuestionDto>;
  status: Scalars["String"];
  statusId: Scalars["Int"];
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  workflowId: Scalars["String"];
  workingRevisionNumber: Scalars["Int"];
};

export type StudioFaqManageChangeSummaryDto = {
  __typename?: "StudioFaqManageChangeSummaryDTO";
  faqToUpdate: StudioFaqWorkflowDto;
  questionsAdded?: Maybe<Array<StudioFaqManageQuestionDto>>;
  questionsModified?: Maybe<Array<StudioFaqManageModifiedQuestionDto>>;
  questionsRemoved?: Maybe<Array<StudioFaqManageQuestionDto>>;
  sortOrder?: Maybe<StudioFaqManageSortOrderDto>;
};

export type StudioFaqManageChangeSummaryInput = {
  faqToUpdate: StudioFaqWorkflowInput;
  questionsAdded?: InputMaybe<Array<StudioFaqManageQuestionDataInput>>;
  questionsModified?: InputMaybe<Array<StudioFaqManageModifiedQuestionDataInput>>;
  questionsRemoved?: InputMaybe<Array<StudioFaqManageQuestionDataInput>>;
  sortOrder?: InputMaybe<StudioFaqManageSortOrderInput>;
};

export type StudioFaqManageDto = {
  __typename?: "StudioFaqManageDTO";
  changeSummary: StudioFaqManageChangeSummaryDto;
  isExpress?: Maybe<Scalars["Boolean"]>;
  languageId: Scalars["Int"];
  questions: Array<StudioFaqManageFullQuestionDto>;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
};

export type StudioFaqManageDataInput = {
  changeSummary: StudioFaqManageChangeSummaryInput;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  languageId: Scalars["Int"];
  questions?: InputMaybe<Array<StudioFaqManageFullQuestionDataInput>>;
  studioWorkflowId: Scalars["String"];
};

export type StudioFaqManageFullQuestionDto = {
  __typename?: "StudioFaqManageFullQuestionDTO";
  answer?: Maybe<Scalars["String"]>;
  question: Scalars["String"];
  sortOrder: Scalars["Int"];
  wasAnswerUploaded?: Maybe<Scalars["Boolean"]>;
};

export type StudioFaqManageFullQuestionDataInput = {
  answer?: InputMaybe<Scalars["String"]>;
  question: Scalars["String"];
  sortOrder: Scalars["Int"];
  wasAnswerUploaded?: InputMaybe<Scalars["Boolean"]>;
};

export type StudioFaqManageModifiedQuestionDto = {
  __typename?: "StudioFaqManageModifiedQuestionDTO";
  answer?: Maybe<Scalars["String"]>;
  question?: Maybe<Scalars["String"]>;
  questionToModify: Scalars["String"];
  wasAnswerUploaded?: Maybe<Scalars["Boolean"]>;
};

export type StudioFaqManageModifiedQuestionDataInput = {
  answer?: InputMaybe<Scalars["String"]>;
  question?: InputMaybe<Scalars["String"]>;
  questionToModify: Scalars["String"];
  wasAnswerUploaded?: InputMaybe<Scalars["Boolean"]>;
};

export type StudioFaqManageQuestionDto = {
  __typename?: "StudioFaqManageQuestionDTO";
  answer?: Maybe<Scalars["String"]>;
  question: Scalars["String"];
  wasAnswerUploaded?: Maybe<Scalars["Boolean"]>;
};

export type StudioFaqManageQuestionDataInput = {
  answer?: InputMaybe<Scalars["String"]>;
  question: Scalars["String"];
  wasAnswerUploaded?: InputMaybe<Scalars["Boolean"]>;
};

export type StudioFaqManageSortOrderDto = {
  __typename?: "StudioFaqManageSortOrderDTO";
  new: Array<Scalars["String"]>;
  old: Array<Scalars["String"]>;
};

export type StudioFaqManageSortOrderInput = {
  new: Array<Scalars["String"]>;
  old: Array<Scalars["String"]>;
};

export type StudioFaqNameDto = {
  __typename?: "StudioFaqNameDTO";
  faqId: Scalars["Int"];
  languageId: Scalars["Int"];
  name: Scalars["String"];
};

export type StudioFaqQuestionDto = {
  __typename?: "StudioFaqQuestionDTO";
  answer: Scalars["String"];
  faqId: Scalars["Int"];
  faqQuestionId: Scalars["Int"];
  languageId: Scalars["Int"];
  question: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type StudioFaqWorkflowDto = {
  __typename?: "StudioFaqWorkflowDTO";
  name?: Maybe<Scalars["String"]>;
};

export type StudioFaqWorkflowInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export type StudioFileDto = {
  __typename?: "StudioFileDTO";
  fileId?: Maybe<Scalars["String"]>;
  studioPath?: Maybe<Scalars["String"]>;
};

export type StudioFileInput = {
  fileId?: InputMaybe<Scalars["String"]>;
  studioPath?: InputMaybe<Scalars["String"]>;
};

export type StudioGovernanceCreateDto = {
  __typename?: "StudioGovernanceCreateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioGovernanceRemoveDto = {
  __typename?: "StudioGovernanceRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioGovernanceUpdateDto = {
  __typename?: "StudioGovernanceUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioJobPostingCreateDto = {
  __typename?: "StudioJobPostingCreateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioJobPostingRemoveDto = {
  __typename?: "StudioJobPostingRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioJobPostingUpdateDto = {
  __typename?: "StudioJobPostingUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioNewsCreateDto = {
  __typename?: "StudioNewsCreateDTO";
  noSubscriberEmail: Scalars["Boolean"];
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioNewsCreateDataInput = {
  noSubscriberEmail: Scalars["Boolean"];
};

export type StudioNewsRemoveDto = {
  __typename?: "StudioNewsRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioNewsUpdateDto = {
  __typename?: "StudioNewsUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export enum StudioOtherContentChangeEnum {
  events = "events",
  faq = "faq",
  filings = "filings",
  financialReports = "financialReports",
  governance = "governance",
  news = "news",
  people = "people",
  presentations = "presentations",
}

export type StudioOtherSubmitDto = {
  __typename?: "StudioOtherSubmitDTO";
  entityType: Scalars["String"];
  generalRequestData?: Maybe<GeneralRequestDataDto>;
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioOtherSubmitDataInput = {
  entityType: Scalars["String"];
  generalRequestData?: InputMaybe<GeneralRequestDataInput>;
};

export type StudioPersonAddDto = {
  __typename?: "StudioPersonAddDTO";
  careerHighlight?: Maybe<Scalars["String"]>;
  departmentWorkflowId: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  firstName: Scalars["String"];
  highResolutionPhotoPath?: Maybe<StudioFileDto>;
  lastName?: Maybe<Scalars["String"]>;
  lowResolutionPhotoPath?: Maybe<StudioFileDto>;
  middleName?: Maybe<Scalars["String"]>;
  photoPath?: Maybe<StudioFileDto>;
  quote?: Maybe<Scalars["String"]>;
  sortOrder: Scalars["Int"];
  suffix?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  thumbnailPath?: Maybe<StudioFileDto>;
  title?: Maybe<Scalars["String"]>;
  workflowId?: Maybe<Scalars["String"]>;
};

export type StudioPersonAddInput = {
  careerHighlight?: InputMaybe<Scalars["String"]>;
  departmentWorkflowId?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  highResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  lastName?: InputMaybe<Scalars["String"]>;
  lowResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  middleName?: InputMaybe<Scalars["String"]>;
  photoPath?: InputMaybe<StudioFileInput>;
  quote?: InputMaybe<Scalars["String"]>;
  sortOrder?: InputMaybe<Scalars["Int"]>;
  status?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<Scalars["String"]>>;
  thumbnailPath?: InputMaybe<StudioFileInput>;
  title?: InputMaybe<Scalars["String"]>;
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type StudioPersonAddedSummaryDto = {
  __typename?: "StudioPersonAddedSummaryDTO";
  active?: Maybe<Scalars["Boolean"]>;
  careerHighlight?: Maybe<Scalars["String"]>;
  departmentName?: Maybe<Scalars["String"]>;
  departmentWorkflowId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  effectiveDate?: Maybe<Scalars["Date"]>;
  firstName?: Maybe<Scalars["String"]>;
  highResolutionPhotoPath?: Maybe<StudioFileDto>;
  isDeleted?: Maybe<Scalars["Boolean"]>;
  lastName?: Maybe<Scalars["String"]>;
  lowResolutionPhotoPath?: Maybe<StudioFileDto>;
  middleName?: Maybe<Scalars["String"]>;
  photoPath?: Maybe<StudioFileDto>;
  publishedRevisionNumber?: Maybe<Scalars["Int"]>;
  quote?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  status?: Maybe<StudioWorkflowStatusEnum>;
  suffix?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailPath?: Maybe<StudioFileDto>;
  title?: Maybe<Scalars["String"]>;
  workflowId?: Maybe<Scalars["String"]>;
};

export type StudioPersonCreateDto = {
  __typename?: "StudioPersonCreateDTO";
  entityType: Scalars["String"];
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioPersonCreateDataInput = {
  entityType: Scalars["String"];
};

export type StudioPersonInput = {
  active?: InputMaybe<Scalars["Boolean"]>;
  careerHighlight?: InputMaybe<Scalars["String"]>;
  departmentName?: InputMaybe<Scalars["String"]>;
  departmentWorkflowId?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  effectiveDate?: InputMaybe<Scalars["Date"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  highResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  isDeleted?: InputMaybe<Scalars["Boolean"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  lowResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  middleName?: InputMaybe<Scalars["String"]>;
  photoPath?: InputMaybe<StudioFileInput>;
  quote?: InputMaybe<Scalars["String"]>;
  sortOrder?: InputMaybe<Scalars["Int"]>;
  suffix?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  thumbnailPath?: InputMaybe<StudioFileInput>;
  title?: InputMaybe<Scalars["String"]>;
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type StudioPersonManageChangeSummaryDto = {
  __typename?: "StudioPersonManageChangeSummaryDTO";
  changeCount: Scalars["Int"];
  departmentsSorted: Array<StudioDepartmentSortedDto>;
  peopleAdded: Array<StudioPersonAddedSummaryDto>;
  peopleModified: Array<StudioPersonModifiedSummaryDto>;
  peopleRemoved: Array<StudioPersonSummaryDto>;
  peopleReverted: Array<StudioPersonSummaryDto>;
};

export type StudioPersonManageChangeSummaryInput = {
  changeCount?: InputMaybe<Scalars["Int"]>;
  departmentsSorted?: InputMaybe<Array<StudioDepartmentSortedInput>>;
  peopleAdded?: InputMaybe<Array<StudioPersonInput>>;
  peopleModified?: InputMaybe<Array<StudioPersonModifiedSummaryInput>>;
  peopleRemoved?: InputMaybe<Array<StudioPersonInput>>;
  peopleReverted?: InputMaybe<Array<StudioPersonInput>>;
};

export type StudioPersonManageDto = {
  __typename?: "StudioPersonManageDTO";
  changeSummary?: Maybe<StudioPersonManageChangeSummaryDto>;
  isExpress?: Maybe<Scalars["Boolean"]>;
  peopleToAdd: Array<Maybe<StudioPersonAddDto>>;
  peopleToModify: Array<Maybe<StudioPersonUpdateType>>;
  peopleToRemove: Array<Maybe<Scalars["String"]>>;
  peopleToRevert: Array<Maybe<Scalars["String"]>>;
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioPersonManageDataInput = {
  changeSummary?: InputMaybe<StudioPersonManageChangeSummaryInput>;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  peopleToAdd: Array<StudioPersonAddInput>;
  peopleToModify: Array<StudioPersonUpdateInput>;
  peopleToRemove: Array<InputMaybe<Scalars["String"]>>;
  peopleToRevert: Array<InputMaybe<Scalars["String"]>>;
};

export type StudioPersonModifiedFieldsDto = {
  __typename?: "StudioPersonModifiedFieldsDTO";
  careerHighlight?: Maybe<Scalars["String"]>;
  departmentWorkflowId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  effectiveDate?: Maybe<Scalars["Date"]>;
  firstName?: Maybe<Scalars["String"]>;
  highResolutionPhotoPath?: Maybe<StudioFileDto>;
  isDeleted?: Maybe<Scalars["Boolean"]>;
  lastName?: Maybe<Scalars["String"]>;
  lowResolutionPhotoPath?: Maybe<StudioFileDto>;
  middleName?: Maybe<Scalars["String"]>;
  photoPath?: Maybe<StudioFileDto>;
  quote?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  suffix?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailPath?: Maybe<StudioFileDto>;
  title?: Maybe<Scalars["String"]>;
};

export type StudioPersonModifiedSummaryDto = {
  __typename?: "StudioPersonModifiedSummaryDTO";
  departmentName: Scalars["String"];
  firstName: Scalars["String"];
  lastName?: Maybe<Scalars["String"]>;
  modifiedFields?: Maybe<StudioPersonModifiedFieldsDto>;
  workflowId: Scalars["String"];
};

export type StudioPersonModifiedSummaryInput = {
  departmentName?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  modifiedFields?: InputMaybe<StudioPersonInput>;
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type StudioPersonRemoveDto = {
  __typename?: "StudioPersonRemoveDTO";
  entityType: Scalars["String"];
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioPersonRemoveDataInput = {
  entityType: Scalars["String"];
};

export type StudioPersonSummaryDto = {
  __typename?: "StudioPersonSummaryDTO";
  active?: Maybe<Scalars["Boolean"]>;
  careerHighlight?: Maybe<Scalars["String"]>;
  departmentName?: Maybe<Scalars["String"]>;
  departmentWorkflowId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  effectiveDate?: Maybe<Scalars["Date"]>;
  firstName?: Maybe<Scalars["String"]>;
  highResolutionPhotoPath?: Maybe<StudioFileDto>;
  isDeleted?: Maybe<Scalars["Boolean"]>;
  lastName?: Maybe<Scalars["String"]>;
  lowResolutionPhotoPath?: Maybe<StudioFileDto>;
  middleName?: Maybe<Scalars["String"]>;
  photoPath?: Maybe<StudioFileDto>;
  quote?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  status?: Maybe<StudioWorkflowStatusEnum>;
  suffix?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailPath?: Maybe<StudioFileDto>;
  title?: Maybe<Scalars["String"]>;
  workflowId?: Maybe<Scalars["String"]>;
};

export type StudioPersonSummaryInput = {
  active?: InputMaybe<Scalars["Boolean"]>;
  careerHighlight?: InputMaybe<Scalars["String"]>;
  departmentWorkflowId?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  effectiveDate?: InputMaybe<Scalars["Date"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  highResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  lastName?: InputMaybe<Scalars["String"]>;
  lowResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  middleName?: InputMaybe<Scalars["String"]>;
  photoPath?: InputMaybe<StudioFileInput>;
  quote?: InputMaybe<Scalars["String"]>;
  sortOrder?: InputMaybe<Scalars["Int"]>;
  suffix?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  thumbnailPath?: InputMaybe<StudioFileInput>;
};

export type StudioPersonUpdateDto = {
  __typename?: "StudioPersonUpdateDTO";
  entityType: Scalars["String"];
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioPersonUpdateDataInput = {
  entityType: Scalars["String"];
};

export type StudioPersonUpdateInput = {
  careerHighlight?: InputMaybe<Scalars["String"]>;
  departmentWorkflowId?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  highResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  lastName?: InputMaybe<Scalars["String"]>;
  lowResolutionPhotoPath?: InputMaybe<StudioFileInput>;
  middleName?: InputMaybe<Scalars["String"]>;
  photoPath?: InputMaybe<StudioFileInput>;
  quote?: InputMaybe<Scalars["String"]>;
  sortOrder?: InputMaybe<Scalars["Int"]>;
  status?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<Scalars["String"]>>;
  thumbnailPath?: InputMaybe<StudioFileInput>;
  title?: InputMaybe<Scalars["String"]>;
  workflowId?: InputMaybe<Scalars["String"]>;
};

export type StudioPersonUpdateType = {
  __typename?: "StudioPersonUpdateType";
  careerHighlight?: Maybe<Scalars["String"]>;
  departmentWorkflowId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  highResolutionPhotoPath?: Maybe<StudioFileDto>;
  lastName?: Maybe<Scalars["String"]>;
  lowResolutionPhotoPath?: Maybe<StudioFileDto>;
  middleName?: Maybe<Scalars["String"]>;
  photoPath?: Maybe<StudioFileDto>;
  quote?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  suffix?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  thumbnailPath?: Maybe<StudioFileDto>;
  title?: Maybe<Scalars["String"]>;
  workflowId: Scalars["String"];
};

export type StudioPresentationAutoCreateDto = {
  __typename?: "StudioPresentationAutoCreateDTO";
  documentPath: StudioFileDto;
  isExpress?: Maybe<Scalars["Boolean"]>;
  noSubscriberEmail: Scalars["Boolean"];
  presentationDate: Scalars["String"];
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  title: Scalars["String"];
};

export type StudioPresentationAutoCreateDataInput = {
  documentPath: StudioFileInput;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  noSubscriberEmail: Scalars["Boolean"];
  presentationDate: Scalars["String"];
  studioWorkflowId?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<Scalars["String"]>>;
  title: Scalars["String"];
};

export type StudioPresentationAutoRemoveChangeSummaryDto = {
  __typename?: "StudioPresentationAutoRemoveChangeSummaryDTO";
  presentationToRemove: StudioPresentationWorkflowDto;
};

export type StudioPresentationAutoRemoveChangeSummaryInput = {
  presentationToRemove: StudioPresentationWorkflowInput;
};

export type StudioPresentationAutoRemoveDto = {
  __typename?: "StudioPresentationAutoRemoveDTO";
  changeSummary: StudioPresentationAutoRemoveChangeSummaryDto;
  isExpress?: Maybe<Scalars["Boolean"]>;
  studioChangeArea: StudioChangeAreaEnum;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
};

export type StudioPresentationAutoRemoveDataInput = {
  changeSummary: StudioPresentationAutoRemoveChangeSummaryInput;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  studioChangeArea: StudioChangeAreaEnum;
  studioWorkflowId: Scalars["String"];
};

export type StudioPresentationAutoUpdateChangeSummaryDto = {
  __typename?: "StudioPresentationAutoUpdateChangeSummaryDTO";
  documentPath?: Maybe<StudioFileDto>;
  presentationDate?: Maybe<Scalars["String"]>;
  presentationToUpdate: StudioPresentationWorkflowDto;
  tags?: Maybe<Array<Scalars["String"]>>;
  title?: Maybe<Scalars["String"]>;
};

export type StudioPresentationAutoUpdateChangeSummaryInput = {
  documentPath?: InputMaybe<StudioFileInput>;
  presentationDate?: InputMaybe<Scalars["String"]>;
  presentationToUpdate: StudioPresentationWorkflowInput;
  tags?: InputMaybe<Array<Scalars["String"]>>;
  title?: InputMaybe<Scalars["String"]>;
};

export type StudioPresentationAutoUpdateDto = {
  __typename?: "StudioPresentationAutoUpdateDTO";
  changeSummary: StudioPresentationAutoUpdateChangeSummaryDto;
  documentPath?: Maybe<StudioFileDto>;
  isExpress?: Maybe<Scalars["Boolean"]>;
  presentationDate?: Maybe<Scalars["String"]>;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
  tags?: Maybe<Array<Scalars["String"]>>;
  title?: Maybe<Scalars["String"]>;
};

export type StudioPresentationAutoUpdateDataInput = {
  changeSummary: StudioPresentationAutoUpdateChangeSummaryInput;
  documentPath?: InputMaybe<StudioFileInput>;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  presentationDate?: InputMaybe<Scalars["String"]>;
  studioWorkflowId: Scalars["String"];
  tags?: InputMaybe<Array<Scalars["String"]>>;
  thumbnailPath?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type StudioPresentationCreateDto = {
  __typename?: "StudioPresentationCreateDTO";
  noSubscriberEmail: Scalars["Boolean"];
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioPresentationCreateDataInput = {
  noSubscriberEmail: Scalars["Boolean"];
};

export type StudioPresentationDto = {
  __typename?: "StudioPresentationDTO";
  active: Scalars["Boolean"];
  audioFile?: Maybe<Scalars["String"]>;
  audioFileSize?: Maybe<Scalars["Int"]>;
  body?: Maybe<Scalars["String"]>;
  bucket?: Maybe<Scalars["String"]>;
  documentFileSize?: Maybe<Scalars["Int"]>;
  documentPath?: Maybe<Scalars["String"]>;
  editUrl?: Maybe<Scalars["String"]>;
  effectiveDate?: Maybe<Scalars["String"]>;
  entityTypeId?: Maybe<Scalars["Int"]>;
  excludeFromLatest?: Maybe<Scalars["Boolean"]>;
  isDeleted: Scalars["Boolean"];
  languageId: Scalars["Int"];
  lastModifiedBy?: Maybe<Scalars["String"]>;
  linkToDetailPage?: Maybe<Scalars["String"]>;
  linkToUrl?: Maybe<Scalars["String"]>;
  openInNewWindow?: Maybe<Scalars["Boolean"]>;
  presentationDate: Scalars["String"];
  presentationId?: Maybe<Scalars["Int"]>;
  publishedRevisionNumber: Scalars["Int"];
  relatedFile?: Maybe<Scalars["String"]>;
  relatedFileSize?: Maybe<Scalars["Int"]>;
  sendToSlideShare?: Maybe<Scalars["Boolean"]>;
  seoName: Scalars["String"];
  seoYear?: Maybe<Scalars["Int"]>;
  slideShowFileCreateDate?: Maybe<Scalars["DateTime"]>;
  slideShowFileSize?: Maybe<Scalars["Int"]>;
  slideShowId?: Maybe<Scalars["Int"]>;
  speakers?: Maybe<Array<Maybe<PresentationSpeakerDto>>>;
  startDate?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  statusId: Scalars["Int"];
  tags: Array<Maybe<PresentationTagsDto>>;
  thumbnailPath?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  videoFile?: Maybe<Scalars["String"]>;
  videoFileSize?: Maybe<Scalars["Int"]>;
  workflowId: Scalars["String"];
  workingRevisionNumber: Scalars["Int"];
};

export type StudioPresentationRemoveDto = {
  __typename?: "StudioPresentationRemoveDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioPresentationUpdateDto = {
  __typename?: "StudioPresentationUpdateDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export type StudioPresentationWorkflowDto = {
  __typename?: "StudioPresentationWorkflowDTO";
  presentationDate: Scalars["String"];
  title: Scalars["String"];
};

export type StudioPresentationWorkflowInput = {
  presentationDate: Scalars["String"];
  title: Scalars["String"];
};

export type StudioPressReleaseAttachmentDto = {
  __typename?: "StudioPressReleaseAttachmentDTO";
  documentFileType?: Maybe<Scalars["String"]>;
  documentType?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  pressReleaseAttachmentId?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Int"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type StudioPressReleaseAttachmentInput = {
  documentType: StudioAttachmentDocumentTypeEnum;
  path: StudioFileInput;
  title: Scalars["String"];
  type: StudioAttachmentTypeEnum;
};

export type StudioPressReleaseAutoCreateDto = {
  __typename?: "StudioPressReleaseAutoCreateDTO";
  attachments?: Maybe<Array<RequestStudioPressReleaseAttachmentDto>>;
  body?: Maybe<Scalars["String"]>;
  headline: Scalars["String"];
  isExpress?: Maybe<Scalars["Boolean"]>;
  linkToUrl?: Maybe<Scalars["String"]>;
  mediaFiles?: Maybe<Array<RequestStudioPressReleaseMediaFileDto>>;
  noSubscriberEmail: Scalars["Boolean"];
  pressReleaseDate: Scalars["String"];
  relatedDocument?: Maybe<StudioFileDto>;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId?: Maybe<Scalars["String"]>;
  wasBodyUploaded?: Maybe<Scalars["Boolean"]>;
};

export type StudioPressReleaseAutoCreateDataInput = {
  attachments?: InputMaybe<Array<StudioPressReleaseAttachmentInput>>;
  body?: InputMaybe<Scalars["String"]>;
  headline: Scalars["String"];
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  linkToUrl?: InputMaybe<Scalars["String"]>;
  mediaFiles?: InputMaybe<Array<StudioPressReleaseMediaFileInput>>;
  noSubscriberEmail: Scalars["Boolean"];
  pressReleaseDate: Scalars["String"];
  relatedDocument?: InputMaybe<StudioFileInput>;
  studioWorkflowId?: InputMaybe<Scalars["String"]>;
  wasBodyUploaded?: InputMaybe<Scalars["Boolean"]>;
};

export type StudioPressReleaseAutoRemoveChangeSummaryDto = {
  __typename?: "StudioPressReleaseAutoRemoveChangeSummaryDTO";
  pressReleaseToRemove: StudioPressReleaseWorkflowDto;
};

export type StudioPressReleaseAutoRemoveChangeSummaryInput = {
  pressReleaseToRemove: StudioPressReleaseWorkflowInput;
};

export type StudioPressReleaseAutoRemoveDto = {
  __typename?: "StudioPressReleaseAutoRemoveDTO";
  changeSummary: StudioPressReleaseAutoRemoveChangeSummaryDto;
  isExpress?: Maybe<Scalars["Boolean"]>;
  studioChangeArea: StudioChangeAreaEnum;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
};

export type StudioPressReleaseAutoRemoveDataInput = {
  changeSummary: StudioPressReleaseAutoRemoveChangeSummaryInput;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  studioChangeArea: StudioChangeAreaEnum;
  studioWorkflowId: Scalars["String"];
};

export type StudioPressReleaseAutoUpdateChangeSummaryDto = {
  __typename?: "StudioPressReleaseAutoUpdateChangeSummaryDTO";
  attachments?: Maybe<Array<StudioPressReleaseChangeSummaryAttachmentDto>>;
  body?: Maybe<Scalars["String"]>;
  headline?: Maybe<Scalars["String"]>;
  linkToUrl?: Maybe<Scalars["String"]>;
  mediaFiles?: Maybe<Array<StudioPressReleaseChangeSummaryAttachmentDto>>;
  pressReleaseDate?: Maybe<Scalars["String"]>;
  pressReleaseToUpdate: StudioPressReleaseWorkflowDto;
  relatedDocument?: Maybe<StudioFileDto>;
};

export type StudioPressReleaseAutoUpdateChangeSummaryInput = {
  attachments?: InputMaybe<Array<StudioPressReleaseChangeSummaryAttachmentInput>>;
  body?: InputMaybe<Scalars["String"]>;
  headline?: InputMaybe<Scalars["String"]>;
  linkToUrl?: InputMaybe<Scalars["String"]>;
  mediaFiles?: InputMaybe<Array<StudioPressReleaseChangeSummaryAttachmentInput>>;
  pressReleaseDate?: InputMaybe<Scalars["String"]>;
  pressReleaseToUpdate: StudioPressReleaseWorkflowInput;
  relatedDocument?: InputMaybe<StudioFileInput>;
};

export type StudioPressReleaseAutoUpdateDto = {
  __typename?: "StudioPressReleaseAutoUpdateDTO";
  attachments?: Maybe<Array<RequestStudioPressReleaseAttachmentDto>>;
  body?: Maybe<Scalars["String"]>;
  changeSummary: StudioPressReleaseAutoUpdateChangeSummaryDto;
  headline?: Maybe<Scalars["String"]>;
  isExpress?: Maybe<Scalars["Boolean"]>;
  linkToUrl?: Maybe<Scalars["String"]>;
  mediaFiles?: Maybe<Array<RequestStudioPressReleaseMediaFileDto>>;
  pressReleaseDate?: Maybe<Scalars["String"]>;
  relatedDocument?: Maybe<StudioFileDto>;
  studioGroupId?: Maybe<Scalars["Int"]>;
  studioWorkflowId: Scalars["String"];
  wasBodyUploaded?: Maybe<Scalars["Boolean"]>;
};

export type StudioPressReleaseAutoUpdateDataInput = {
  attachments?: InputMaybe<Array<StudioPressReleaseAttachmentInput>>;
  body?: InputMaybe<Scalars["String"]>;
  changeSummary: StudioPressReleaseAutoUpdateChangeSummaryInput;
  headline?: InputMaybe<Scalars["String"]>;
  isExpress?: InputMaybe<Scalars["Boolean"]>;
  linkToUrl?: InputMaybe<Scalars["String"]>;
  mediaFiles?: InputMaybe<Array<StudioPressReleaseMediaFileInput>>;
  pressReleaseDate?: InputMaybe<Scalars["String"]>;
  relatedDocument?: InputMaybe<StudioFileInput>;
  studioWorkflowId: Scalars["String"];
  thumbnailPath?: InputMaybe<Scalars["String"]>;
  wasBodyUploaded?: InputMaybe<Scalars["Boolean"]>;
};

export type StudioPressReleaseChangeSummaryAttachmentDto = {
  __typename?: "StudioPressReleaseChangeSummaryAttachmentDTO";
  attachmentOperation: StudioAttachmentOperationEnum;
  fileName: Scalars["String"];
  title: Scalars["String"];
};

export type StudioPressReleaseChangeSummaryAttachmentInput = {
  attachmentOperation: StudioAttachmentOperationEnum;
  fileName: Scalars["String"];
  title: Scalars["String"];
};

export type StudioPressReleaseDto = Workflow & {
  __typename?: "StudioPressReleaseDTO";
  active: Scalars["Boolean"];
  attachments?: Maybe<Array<Maybe<StudioPressReleaseAttachmentDto>>>;
  body?: Maybe<Scalars["String"]>;
  bucket?: Maybe<Scalars["String"]>;
  category: Scalars["String"];
  categoryWorkflowId: Scalars["String"];
  effectiveDate?: Maybe<Scalars["DateTime"]>;
  excludeFromLatest: Scalars["Boolean"];
  headline: Scalars["String"];
  isDeleted: Scalars["Boolean"];
  languageId: Scalars["Int"];
  linkToDetailPage?: Maybe<Scalars["String"]>;
  linkToPage?: Maybe<Scalars["String"]>;
  linkToUrl?: Maybe<Scalars["String"]>;
  mediaCollection?: Maybe<Array<Maybe<StudioPressReleaseMediaCollectionDto>>>;
  mediaFiles?: Maybe<Array<Maybe<StudioPressReleaseMediaFileDto>>>;
  metaData?: Maybe<Array<Maybe<StudioPressReleaseMetadataDto>>>;
  openInNewWindow: Scalars["Boolean"];
  pressReleaseDate: Scalars["String"];
  publishedRevisionNumber: Scalars["Int"];
  relatedDocument?: Maybe<Scalars["String"]>;
  seoName: Scalars["String"];
  shortBody?: Maybe<Scalars["String"]>;
  shortDescription?: Maybe<Scalars["String"]>;
  status: WorkflowStatus;
  statusId: Scalars["Int"];
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailPath?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  workflowId: Scalars["String"];
  workingRevisionNumber: Scalars["Int"];
};

export type StudioPressReleaseMediaCollectionDto = {
  __typename?: "StudioPressReleaseMediaCollectionDTO";
  alt?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Int"]>;
  sourceUrl?: Maybe<Scalars["String"]>;
  style?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type StudioPressReleaseMediaFileDto = {
  __typename?: "StudioPressReleaseMediaFileDTO";
  active?: Maybe<Scalars["Boolean"]>;
  height?: Maybe<Scalars["Int"]>;
  path?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Int"]>;
  sizes?: Maybe<Array<Maybe<StudioPressReleaseMediaFileSizeResourceDto>>>;
  sortOrder?: Maybe<Scalars["Int"]>;
  thumbnailPath?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type StudioPressReleaseMediaFileInput = {
  active?: InputMaybe<Scalars["Boolean"]>;
  height?: InputMaybe<Scalars["Int"]>;
  path: StudioFileInput;
  thumbnailPath?: InputMaybe<StudioFileInput>;
  title: Scalars["String"];
  type: Scalars["String"];
  width?: InputMaybe<Scalars["Int"]>;
};

export type StudioPressReleaseMediaFileSizeResourceDto = {
  __typename?: "StudioPressReleaseMediaFileSizeResourceDTO";
  height?: Maybe<Scalars["Int"]>;
  path?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Int"]>;
  type?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type StudioPressReleaseMetadataDto = {
  __typename?: "StudioPressReleaseMetadataDTO";
  content?: Maybe<Scalars["String"]>;
  dir?: Maybe<Scalars["String"]>;
  httpEquiv?: Maybe<Scalars["String"]>;
  lang?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  property?: Maybe<Scalars["String"]>;
  scheme?: Maybe<Scalars["String"]>;
};

export type StudioPressReleaseWorkflowDto = {
  __typename?: "StudioPressReleaseWorkflowDTO";
  headline: Scalars["String"];
  pressReleaseDate: Scalars["String"];
};

export type StudioPressReleaseWorkflowInput = {
  headline: Scalars["String"];
  pressReleaseDate: Scalars["String"];
};

export type StudioRequestDataInput = {
  studioBucketId?: InputMaybe<Scalars["Int"]>;
  studioSiteId?: InputMaybe<Scalars["String"]>;
};

export type StudioSecureFileUploadDto = {
  __typename?: "StudioSecureFileUploadDTO";
  studioGroupId?: Maybe<Scalars["Int"]>;
};

export enum StudioWorkflowStatusEnum {
  editing = "editing",
  forApproval = "forApproval",
  inProgress = "inProgress",
  live = "live",
  newItem = "newItem",
  reviewing = "reviewing",
  unknownState = "unknownState",
}

export type SyncPageStatusResponse = {
  __typename?: "SyncPageStatusResponse";
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type TagInput = {
  key: Scalars["String"];
  value: Scalars["String"];
};

export type TagReferenceDto = {
  __typename?: "TagReferenceDTO";
  entityId?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
};

export type TagTemplateCollectionDto = {
  __typename?: "TagTemplateCollectionDTO";
  lastUpdated?: Maybe<SiteCapabilitySettingAuditDto>;
  tags?: Maybe<Array<Maybe<TagTemplateDto>>>;
};

export type TagTemplateDto = {
  __typename?: "TagTemplateDTO";
  active: Scalars["Boolean"];
  description: Scalars["String"];
  enabledEntities: Scalars["String"];
  tagName: Scalars["String"];
  tagTemplateId: Scalars["Int"];
};

export enum TagTemplateFilter {
  active = "active",
  all = "all",
  inactive = "inactive",
}

export type Terms = {
  __typename?: "Terms";
  acknowledged?: Maybe<Scalars["Boolean"]>;
};

export type Ticker = {
  __typename?: "Ticker";
  entityId?: Maybe<Scalars["String"]>;
  exchange?: Maybe<Scalars["String"]>;
  legacySecurityId?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  primary?: Maybe<Scalars["Boolean"]>;
  symbol?: Maybe<Scalars["String"]>;
  tickerId?: Maybe<Scalars["String"]>;
};

export type TimezoneDto = {
  __typename?: "TimezoneDTO";
  daylightSavingsDisplayName?: Maybe<Scalars["String"]>;
  displayName: Scalars["String"];
  globalDisplayName: Scalars["String"];
  globalTimeZoneId: Scalars["Int"];
  hidden?: Maybe<Scalars["Boolean"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  timeZoneId: Scalars["Int"];
};

export type TimezoneResult = {
  __typename?: "TimezoneResult";
  count: Scalars["Int"];
  items: Array<TimezoneDto>;
};

export type TopDownloadDto = {
  __typename?: "TopDownloadDTO";
  downloads?: Maybe<Scalars["Int"]>;
  fileName?: Maybe<Scalars["String"]>;
  institutions?: Maybe<Scalars["Int"]>;
  lastDateDownloaded?: Maybe<Scalars["Date"]>;
  rankingDownloads?: Maybe<Scalars["Int"]>;
};

export type TopDownloadResult = {
  __typename?: "TopDownloadResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<TopDownloadDto>>>;
};

export type TopEventsAttendeesDto = {
  __typename?: "TopEventsAttendeesDTO";
  email?: Maybe<Scalars["String"]>;
  emailsOpened?: Maybe<Scalars["Int"]>;
  entityId?: Maybe<Scalars["String"]>;
  eventsAttended?: Maybe<Array<Maybe<AttendeeEventsDto>>>;
  fullName?: Maybe<Scalars["String"]>;
  jobTitle?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  periodType?: Maybe<Period_Type>;
  totalEngagedTime?: Maybe<Scalars["Float"]>;
};

export type TopEventsAttendeesResult = {
  __typename?: "TopEventsAttendeesResult";
  count?: Maybe<Scalars["Int"]>;
  eventsAttendedCount?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<TopEventsAttendeesDto>>>;
};

export type TopEventsDto = {
  __typename?: "TopEventsDTO";
  attendees?: Maybe<Scalars["Int"]>;
  avgDuration?: Maybe<Scalars["Float"]>;
  eventDate?: Maybe<Scalars["Date"]>;
  eventId?: Maybe<Scalars["String"]>;
  eventName?: Maybe<Scalars["String"]>;
  periodType?: Maybe<Period_Type>;
  registrations?: Maybe<Scalars["Int"]>;
  replays?: Maybe<Scalars["Int"]>;
  uniqueAttendees?: Maybe<Scalars["Int"]>;
  uniqueReplays?: Maybe<Scalars["Int"]>;
};

export type TopEventsResult = {
  __typename?: "TopEventsResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<TopEventsDto>>>;
};

export type TopPageDto = {
  __typename?: "TopPageDTO";
  pageView?: Maybe<Scalars["Int"]>;
  title?: Maybe<Scalars["String"]>;
  uniquePageView?: Maybe<Scalars["Int"]>;
  url?: Maybe<Scalars["String"]>;
};

export type TopPageResult = {
  __typename?: "TopPageResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<TopPageDto>>>;
};

export type TrackedSitesDto = {
  __typename?: "TrackedSitesDTO";
  domain?: Maybe<Scalars["String"]>;
  type?: Maybe<Site_Type>;
};

export type TrackedSitesResult = {
  __typename?: "TrackedSitesResult";
  items?: Maybe<Array<Maybe<TrackedSitesDto>>>;
};

export type Trial = {
  __typename?: "Trial";
  entitlement?: Maybe<Scalars["String"]>;
  expiryDate?: Maybe<Scalars["String"]>;
  product?: Maybe<Scalars["String"]>;
  trialName?: Maybe<Scalars["String"]>;
  trialType: Scalars["String"];
};

export type Type = {
  __typename?: "Type";
  expire?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type UnmonitorResult = {
  __typename?: "UnmonitorResult";
  data?: Maybe<MonitorDto>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateChatterFeedDto = {
  earningsPlanId: Scalars["String"];
  id: Scalars["String"];
};

export type UpdateChatterFeedResult = {
  __typename?: "UpdateChatterFeedResult";
  success: Scalars["Boolean"];
};

export type UpdateChatterFilesDto = {
  id: Scalars["String"];
};

export type UpdateChatterFilesResult = {
  __typename?: "UpdateChatterFilesResult";
  success: Scalars["Boolean"];
};

export type UpdateContactListInput = {
  contacts?: InputMaybe<Array<InputMaybe<ContactListContactInput>>>;
  id: Scalars["ID"];
  title?: InputMaybe<Scalars["String"]>;
};

export type UpdateContactListResponse = {
  __typename?: "UpdateContactListResponse";
  data?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateContactResponse = {
  __typename?: "UpdateContactResponse";
  count?: Maybe<Scalars["Int"]>;
  items: Array<ContactUpdateItemResponse>;
};

export type UpdateCustomContactInput = {
  deleted?: InputMaybe<Scalars["Boolean"]>;
  email?: InputMaybe<Scalars["String"]>;
  factsetId?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  fund?: InputMaybe<Array<InputMaybe<InstitutionInput>>>;
  id: Scalars["ID"];
  institution?: InputMaybe<InstitutionInput>;
  jobFunction?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  jobTitle?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  location?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  salutation?: InputMaybe<Scalars["String"]>;
};

export type UpdateCustomContactResponse = {
  __typename?: "UpdateCustomContactResponse";
  items?: Maybe<Array<Maybe<CustomContactItemResponse>>>;
};

export type UpdateEntityNoteResponse = {
  __typename?: "UpdateEntityNoteResponse";
  count?: Maybe<Scalars["Int"]>;
};

export type UpdateInteractionResponse = {
  __typename?: "UpdateInteractionResponse";
  count?: Maybe<Scalars["Int"]>;
};

export type UpdatePageStatusResponse = {
  __typename?: "UpdatePageStatusResponse";
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type UploadAndReadUrlData = {
  __typename?: "UploadAndReadUrlData";
  fileS3Id?: Maybe<Scalars["String"]>;
  readUrl?: Maybe<Scalars["String"]>;
  uploadUrl?: Maybe<Scalars["String"]>;
};

export type UploadAttachmentResponse = {
  __typename?: "UploadAttachmentResponse";
  fileId?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type User = {
  __typename?: "User";
  active: Scalars["Boolean"];
  createdAt?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  emailApp?: Maybe<Scalars["String"]>;
  firstName: Scalars["String"];
  friendlyName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  identityProviderId?: Maybe<Scalars["String"]>;
  lastName: Scalars["String"];
  organizationId: Scalars["String"];
  roles?: Maybe<Array<Maybe<Scalars["String"]>>>;
  search?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
};

export type UserDto = {
  __typename?: "UserDTO";
  email: Scalars["String"];
  id: Scalars["String"];
  name: Scalars["String"];
};

export type UserList = {
  __typename?: "UserList";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<User>>>;
};

export type UserTimeZone = {
  timezone?: InputMaybe<Scalars["String"]>;
  utcOffset?: InputMaybe<Scalars["Int"]>;
};

export type UsersListResult = {
  __typename?: "UsersListResult";
  count: Scalars["Int"];
  items: Array<Maybe<AccountUser>>;
};

export type VendorConfig = {
  azureVendorConfig?: InputMaybe<AzureVendorConfigInput>;
  bedrockVendorConfig?: InputMaybe<BedrockVendorConfigInput>;
};

export type VendorInput = {
  vendorConfig: VendorConfig;
  vendorName: Scalars["String"];
};

export type WebDownloadsActivityDto = {
  __typename?: "WebDownloadsActivityDTO";
  date?: Maybe<Scalars["Date"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityName?: Maybe<Scalars["String"]>;
};

export type WebDownloadsActivityResult = {
  __typename?: "WebDownloadsActivityResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<WebDownloadsActivityDto>>>;
};

export type WebDownloadsPerformanceByRegionDto = {
  __typename?: "WebDownloadsPerformanceByRegionDTO";
  countryName?: Maybe<Scalars["String"]>;
  downloads?: Maybe<Scalars["Int"]>;
  regionName?: Maybe<Scalars["String"]>;
};

export type WebDownloadsPerformanceByRegionResult = {
  __typename?: "WebDownloadsPerformanceByRegionResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<WebDownloadsPerformanceByRegionDto>>>;
};

export type WebDownloadsPerformanceDto = {
  __typename?: "WebDownloadsPerformanceDTO";
  largestDecreaseFileName?: Maybe<Scalars["String"]>;
  largestDecreaseFileUrl?: Maybe<Scalars["String"]>;
  largestDecreasePercentageChange?: Maybe<Scalars["Float"]>;
  largestIncreaseFileName?: Maybe<Scalars["String"]>;
  largestIncreaseFileUrl?: Maybe<Scalars["String"]>;
  largestIncreasePercentageChange?: Maybe<Scalars["Float"]>;
};

export type WebDownloadsPerformanceResult = {
  __typename?: "WebDownloadsPerformanceResult";
  items?: Maybe<Array<Maybe<WebDownloadsPerformanceDto>>>;
};

export type WebDownloadsResult = {
  __typename?: "WebDownloadsResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<WebDownloadsResultDto>>>;
};

export type WebDownloadsResultDto = {
  __typename?: "WebDownloadsResultDTO";
  downloads?: Maybe<Scalars["Float"]>;
  fileName?: Maybe<Scalars["String"]>;
  fileUrl?: Maybe<Scalars["String"]>;
  uniqueDownloads?: Maybe<Scalars["Float"]>;
};

export type WebMetricsAggregateDto = {
  __typename?: "WebMetricsAggregateDTO";
  avgPageViewPerSession?: Maybe<Scalars["Float"]>;
  avgPageViewPerSessionPercentageChange?: Maybe<Scalars["Float"]>;
  avgSessionDuration?: Maybe<Scalars["Float"]>;
  avgSessionDurationPercentageChange?: Maybe<Scalars["Float"]>;
  avgTimeSpent?: Maybe<Scalars["Float"]>;
  avgTimeSpentPercentageChange?: Maybe<Scalars["Float"]>;
  downloads?: Maybe<Scalars["Int"]>;
  downloadsPercentageChange?: Maybe<Scalars["Float"]>;
  entityId?: Maybe<Scalars["String"]>;
  mostDownloadedFileName?: Maybe<Scalars["String"]>;
  mostDownloadedFileUrl?: Maybe<Scalars["String"]>;
  pageViews?: Maybe<Scalars["Int"]>;
  pageViewsPercentageChange?: Maybe<Scalars["Float"]>;
  periodType?: Maybe<Scalars["String"]>;
  topAvgTimeSpentTitle?: Maybe<Scalars["String"]>;
  topAvgTimeSpentUrl?: Maybe<Scalars["String"]>;
  topPageViewsTitle?: Maybe<Scalars["String"]>;
  topPageViewsUrl?: Maybe<Scalars["String"]>;
  topUniquePageViewsTitle?: Maybe<Scalars["String"]>;
  topUniquePageViewsUrl?: Maybe<Scalars["String"]>;
  uniqueDownloads?: Maybe<Scalars["Int"]>;
  uniquePageViews?: Maybe<Scalars["Int"]>;
  uniquePageViewsPercentageChange?: Maybe<Scalars["Float"]>;
};

export type WebMetricsAggregateResult = {
  __typename?: "WebMetricsAggregateResult";
  items?: Maybe<Array<Maybe<WebMetricsAggregateDto>>>;
};

export type WebMetricsDailyDto = {
  __typename?: "WebMetricsDailyDTO";
  avgTimeSpent?: Maybe<Scalars["Float"]>;
  date?: Maybe<Scalars["Date"]>;
  entityId?: Maybe<Scalars["String"]>;
  pageViews?: Maybe<Scalars["Float"]>;
  uniquePageViews?: Maybe<Scalars["Float"]>;
};

export type WebMetricsDailyResult = {
  __typename?: "WebMetricsDailyResult";
  count?: Maybe<Scalars["Int"]>;
  hasDimensionData?: Maybe<Scalars["Boolean"]>;
  items?: Maybe<Array<Maybe<WebMetricsDailyDto>>>;
};

export type WebPageViewsDto = {
  __typename?: "WebPageViewsDTO";
  pageTitle?: Maybe<Scalars["String"]>;
  pageUrl?: Maybe<Scalars["String"]>;
  pageViews?: Maybe<Scalars["Float"]>;
  uniquePageViews?: Maybe<Scalars["Float"]>;
};

export type WebPageViewsPerformanceByRegionDto = {
  __typename?: "WebPageViewsPerformanceByRegionDTO";
  countryName?: Maybe<Scalars["String"]>;
  pageViews?: Maybe<Scalars["Int"]>;
  regionName?: Maybe<Scalars["String"]>;
};

export type WebPageViewsPerformanceByRegionResult = {
  __typename?: "WebPageViewsPerformanceByRegionResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<WebPageViewsPerformanceByRegionDto>>>;
};

export type WebPageViewsPerformanceDto = {
  __typename?: "WebPageViewsPerformanceDTO";
  largestDecreasePercentageChange?: Maybe<Scalars["Float"]>;
  largestDecreaseTitle?: Maybe<Scalars["String"]>;
  largestDecreaseUrl?: Maybe<Scalars["String"]>;
  largestIncreasePercentageChange?: Maybe<Scalars["Float"]>;
  largestIncreaseTitle?: Maybe<Scalars["String"]>;
  largestIncreaseUrl?: Maybe<Scalars["String"]>;
};

export type WebPageViewsPerformanceResult = {
  __typename?: "WebPageViewsPerformanceResult";
  items?: Maybe<Array<Maybe<WebPageViewsPerformanceDto>>>;
};

export type WebPageViewsResult = {
  __typename?: "WebPageViewsResult";
  count?: Maybe<Scalars["Int"]>;
  items?: Maybe<Array<Maybe<WebPageViewsDto>>>;
};

export type Workflow = {
  active: Scalars["Boolean"];
  bucket?: Maybe<Scalars["String"]>;
  effectiveDate?: Maybe<Scalars["DateTime"]>;
  isDeleted: Scalars["Boolean"];
  languageId: Scalars["Int"];
  publishedRevisionNumber: Scalars["Int"];
  status: WorkflowStatus;
  statusId: Scalars["Int"];
  title?: Maybe<Scalars["String"]>;
  workflowId: Scalars["String"];
  workingRevisionNumber: Scalars["Int"];
};

export enum WorkflowStatus {
  editing = "editing",
  forApproval = "forApproval",
  inProgress = "inProgress",
  live = "live",
  newItem = "newItem",
  reviewing = "reviewing",
  unknownState = "unknownState",
}

export type SortRule = {
  sortBy?: InputMaybe<Scalars["String"]>;
  sortDir?: InputMaybe<Sort_Dir>;
};

export type NotificationTokenMutationVariables = Exact<{ [key: string]: never }>;

export type NotificationTokenMutation = {
  __typename?: "Mutation";
  notificationToken?: { __typename?: "NotificationTokenResult"; token: string } | null;
};

export type NotificationListQueryVariables = Exact<{
  notificationId?: InputMaybe<Scalars["String"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
}>;

export type NotificationListQuery = {
  __typename?: "Query";
  notificationList?: {
    __typename?: "NotificationList";
    totalCount?: number | null;
    totalUnreadCount?: number | null;
    items?: Array<{
      __typename?: "Notification";
      id: string;
      title: string;
      message: string;
      link: string;
      source: string;
      sentAt: string;
      readAt?: string | null;
    } | null> | null;
  } | null;
};

export type UpdateNotificationMutationVariables = Exact<{
  markRead: Scalars["Boolean"];
  notificationId?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateNotificationMutation = { __typename?: "Mutation"; updateNotification?: boolean | null };

export type OrganizationQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type OrganizationQuery = {
  __typename?: "Query";
  organization?: {
    __typename?: "Organization";
    isAdmin?: boolean | null;
    managedBy?: string | null;
    id: string;
    name: string;
    active: boolean;
    identifiers?: Array<string | null> | null;
    entitlements?: Array<string | null> | null;
    type?: OrganizationType | null;
    region?: OrganizationRegion | null;
    currency?: OrganizationCurrency | null;
    studio?: { __typename?: "StudioDetails"; subdomain: string } | null;
  } | null;
};

export type OrganizationsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>>;
  type?: InputMaybe<Scalars["String"]>;
  searchTerm?: InputMaybe<Scalars["String"]>;
  managedBy?: InputMaybe<Scalars["String"]>;
  delegateOrganizationId?: InputMaybe<Scalars["String"]>;
  active?: InputMaybe<Scalars["Boolean"]>;
}>;

export type OrganizationsQuery = {
  __typename?: "Query";
  organizations?: {
    __typename?: "OrganizationList";
    items?: Array<{
      __typename?: "Organization";
      id: string;
      name: string;
      active: boolean;
      isAdmin?: boolean | null;
      identifiers?: Array<string | null> | null;
      entitlements?: Array<string | null> | null;
      type?: OrganizationType | null;
      region?: OrganizationRegion | null;
      currency?: OrganizationCurrency | null;
    } | null> | null;
  } | null;
};

export type OrganizationsManagedByUserQueryVariables = Exact<{ [key: string]: never }>;

export type OrganizationsManagedByUserQuery = {
  __typename?: "Query";
  organizationsManagedByUser?: {
    __typename?: "OrganizationList";
    items?: Array<{
      __typename?: "Organization";
      managedBy?: string | null;
      id: string;
      name: string;
      active: boolean;
      isAdmin?: boolean | null;
      identifiers?: Array<string | null> | null;
      entitlements?: Array<string | null> | null;
      type?: OrganizationType | null;
      region?: OrganizationRegion | null;
      currency?: OrganizationCurrency | null;
      studio?: { __typename?: "StudioDetails"; subdomain: string } | null;
    } | null> | null;
  } | null;
};

export type OrganizationFragmentFragment = {
  __typename?: "Organization";
  id: string;
  name: string;
  active: boolean;
  isAdmin?: boolean | null;
  identifiers?: Array<string | null> | null;
  entitlements?: Array<string | null> | null;
  type?: OrganizationType | null;
  region?: OrganizationRegion | null;
  currency?: OrganizationCurrency | null;
};

export type EntitySearchQueryVariables = Exact<{
  entityType: Array<SearchEntityType> | SearchEntityType;
  query: Scalars["String"];
  page?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type EntitySearchQuery = {
  __typename?: "Query";
  entitySearch?: {
    __typename?: "EntitySearchResult";
    count?: number | null;
    items?: Array<
      | {
          __typename?: "FundSearchDTO";
          entityId?: string | null;
          entityName?: string | null;
          entityType?: SearchEntityType | null;
        }
      | {
          __typename?: "InstitutionSearchDTO";
          entityId?: string | null;
          entityName?: string | null;
          entityType?: SearchEntityType | null;
        }
      | {
          __typename?: "SecurityEntitySearchDTO";
          symbol?: string | null;
          exchange?: string | null;
          entityId?: string | null;
          entityName?: string | null;
          entityType?: SearchEntityType | null;
        }
      | null
    > | null;
  } | null;
};

export type TeamsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>>;
  organizationId?: InputMaybe<Scalars["String"]>;
}>;

export type TeamsQuery = {
  __typename?: "Query";
  accessGroups?: {
    __typename?: "AccessGroupList";
    items?: Array<{
      __typename?: "AccessGroup";
      id: string;
      name: string;
      organizationId: string;
      managedOrganizationIds?: Array<string | null> | null;
      userIds?: Array<string | null> | null;
    } | null> | null;
  } | null;
};

export type AccessGroupFragmentFragment = {
  __typename?: "AccessGroup";
  id: string;
  name: string;
  organizationId: string;
  managedOrganizationIds?: Array<string | null> | null;
  userIds?: Array<string | null> | null;
};

export type UpdateTeamMutationMutationVariables = Exact<{
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  organizationId?: InputMaybe<Scalars["String"]>;
  managedOrganizationIds?: InputMaybe<Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>>;
  managedOrgDeltas?: InputMaybe<AccessGroupUpdateDeltas>;
  userDeltas?: InputMaybe<AccessGroupUpdateDeltas>;
}>;

export type UpdateTeamMutationMutation = {
  __typename?: "Mutation";
  updateAccessGroup?: {
    __typename?: "AccessGroup";
    id: string;
    name: string;
    organizationId: string;
    managedOrganizationIds?: Array<string | null> | null;
    userIds?: Array<string | null> | null;
  } | null;
};

export type OrganizationTrialsQueryVariables = Exact<{
  trialType?: InputMaybe<Scalars["String"]>;
  expired?: InputMaybe<Scalars["Boolean"]>;
}>;

export type OrganizationTrialsQuery = {
  __typename?: "Query";
  organizationTrials?: Array<{
    __typename?: "Trial";
    trialType: string;
    trialName?: string | null;
    entitlement?: string | null;
    product?: string | null;
    expiryDate?: string | null;
  } | null> | null;
};

export type CreateTrialMutationVariables = Exact<{
  trialType: Scalars["String"];
}>;

export type CreateTrialMutation = {
  __typename?: "Mutation";
  createTrial?: {
    __typename?: "Trial";
    entitlement?: string | null;
    expiryDate?: string | null;
    product?: string | null;
    trialName?: string | null;
    trialType: string;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    friendlyName?: string | null;
    email: string;
    title?: string | null;
    roles?: Array<string | null> | null;
    active: boolean;
  } | null;
};

export type UserQueryVariables = Exact<{
  id: Scalars["String"];
  userId: Scalars["String"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    friendlyName?: string | null;
    email: string;
    title?: string | null;
    roles?: Array<string | null> | null;
    active: boolean;
  } | null;
};

export type UsersQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars["String"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>>;
  searchTerm?: InputMaybe<Scalars["String"]>;
}>;

export type UsersQuery = {
  __typename?: "Query";
  users?: {
    __typename?: "UserList";
    items?: Array<{
      __typename?: "User";
      active: boolean;
      email: string;
      firstName: string;
      friendlyName?: string | null;
      id: string;
      lastName: string;
      organizationId: string;
      roles?: Array<string | null> | null;
      search?: string | null;
    } | null> | null;
  } | null;
};

export type UsersByOrgQueryVariables = Exact<{
  organizationId: Scalars["String"];
  pagination: OffsetPagination;
}>;

export type UsersByOrgQuery = {
  __typename?: "Query";
  usersByOrganization?: {
    __typename?: "OffsetPaginatedUserList";
    currentPage?: number | null;
    totalItems?: number | null;
    totalPages?: number | null;
    records?: Array<{
      __typename?: "User";
      id: string;
      organizationId: string;
      firstName: string;
      lastName: string;
      email: string;
      friendlyName?: string | null;
      active: boolean;
      roles?: Array<string | null> | null;
      title?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      identityProviderId?: string | null;
      search?: string | null;
      emailApp?: string | null;
    } | null> | null;
  } | null;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars["String"];
  organizationId: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  active?: InputMaybe<Scalars["Boolean"]>;
  friendlyName?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  roles?: InputMaybe<Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>>;
  emailApp?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser?: { __typename?: "User"; id: string; organizationId: string } | null;
};

export const OrganizationFragmentFragmentDoc = gql`
  fragment OrganizationFragment on Organization {
    id
    name
    active
    isAdmin
    identifiers
    entitlements
    type
    region
    currency
  }
`;
export const AccessGroupFragmentFragmentDoc = gql`
  fragment AccessGroupFragment on AccessGroup {
    id
    name
    organizationId
    managedOrganizationIds
    userIds
  }
`;
export const NotificationTokenDocument = gql`
  mutation NotificationToken {
    notificationToken {
      token
    }
  }
`;
export type NotificationTokenMutationFn = Apollo.MutationFunction<
  NotificationTokenMutation,
  NotificationTokenMutationVariables
>;

/**
 * __useNotificationTokenMutation__
 *
 * To run a mutation, you first call `useNotificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationTokenMutation, { data, loading, error }] = useNotificationTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useNotificationTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<NotificationTokenMutation, NotificationTokenMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<NotificationTokenMutation, NotificationTokenMutationVariables>(
    NotificationTokenDocument,
    options,
  );
}
export type NotificationTokenMutationHookResult = ReturnType<typeof useNotificationTokenMutation>;
export type NotificationTokenMutationResult = Apollo.MutationResult<NotificationTokenMutation>;
export type NotificationTokenMutationOptions = Apollo.BaseMutationOptions<
  NotificationTokenMutation,
  NotificationTokenMutationVariables
>;
export const NotificationListDocument = gql`
  query NotificationList($notificationId: String, $pageSize: Int) {
    notificationList(notificationId: $notificationId, pageSize: $pageSize) {
      items {
        id
        title
        message
        link
        source
        sentAt
        readAt
      }
      totalCount
      totalUnreadCount
    }
  }
`;

/**
 * __useNotificationListQuery__
 *
 * To run a query within a React component, call `useNotificationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationListQuery({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useNotificationListQuery(
  baseOptions?: Apollo.QueryHookOptions<NotificationListQuery, NotificationListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NotificationListQuery, NotificationListQueryVariables>(NotificationListDocument, options);
}
export function useNotificationListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NotificationListQuery, NotificationListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NotificationListQuery, NotificationListQueryVariables>(NotificationListDocument, options);
}
export type NotificationListQueryHookResult = ReturnType<typeof useNotificationListQuery>;
export type NotificationListLazyQueryHookResult = ReturnType<typeof useNotificationListLazyQuery>;
export type NotificationListQueryResult = Apollo.QueryResult<NotificationListQuery, NotificationListQueryVariables>;
export const UpdateNotificationDocument = gql`
  mutation UpdateNotification($markRead: Boolean!, $notificationId: String) {
    updateNotification(markRead: $markRead, notificationId: $notificationId)
  }
`;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables
>;

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      markRead: // value for 'markRead'
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useUpdateNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(
    UpdateNotificationDocument,
    options,
  );
}
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = Apollo.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables
>;
export const OrganizationDocument = gql`
  query Organization($id: String!) {
    organization(id: $id) {
      ...OrganizationFragment
      isAdmin
      studio {
        subdomain
      }
      managedBy
    }
  }
  ${OrganizationFragmentFragmentDoc}
`;

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationQuery(baseOptions: Apollo.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
}
export function useOrganizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
}
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>;
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>;
export type OrganizationQueryResult = Apollo.QueryResult<OrganizationQuery, OrganizationQueryVariables>;
export const OrganizationsDocument = gql`
  query Organizations(
    $pageSize: Int
    $page: [String]
    $type: String
    $searchTerm: String
    $managedBy: String
    $delegateOrganizationId: String
    $active: Boolean
  ) {
    organizations(
      pageSize: $pageSize
      page: $page
      type: $type
      searchTerm: $searchTerm
      managedBy: $managedBy
      delegateOrganizationId: $delegateOrganizationId
      active: $active
    ) {
      items {
        ...OrganizationFragment
      }
    }
  }
  ${OrganizationFragmentFragmentDoc}
`;

/**
 * __useOrganizationsQuery__
 *
 * To run a query within a React component, call `useOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      type: // value for 'type'
 *      searchTerm: // value for 'searchTerm'
 *      managedBy: // value for 'managedBy'
 *      delegateOrganizationId: // value for 'delegateOrganizationId'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useOrganizationsQuery(
  baseOptions?: Apollo.QueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
}
export function useOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
}
export type OrganizationsQueryHookResult = ReturnType<typeof useOrganizationsQuery>;
export type OrganizationsLazyQueryHookResult = ReturnType<typeof useOrganizationsLazyQuery>;
export type OrganizationsQueryResult = Apollo.QueryResult<OrganizationsQuery, OrganizationsQueryVariables>;
export const OrganizationsManagedByUserDocument = gql`
  query OrganizationsManagedByUser {
    organizationsManagedByUser {
      items {
        ...OrganizationFragment
        studio {
          subdomain
        }
        managedBy
      }
    }
  }
  ${OrganizationFragmentFragmentDoc}
`;

/**
 * __useOrganizationsManagedByUserQuery__
 *
 * To run a query within a React component, call `useOrganizationsManagedByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationsManagedByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationsManagedByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrganizationsManagedByUserQuery(
  baseOptions?: Apollo.QueryHookOptions<OrganizationsManagedByUserQuery, OrganizationsManagedByUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrganizationsManagedByUserQuery, OrganizationsManagedByUserQueryVariables>(
    OrganizationsManagedByUserDocument,
    options,
  );
}
export function useOrganizationsManagedByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrganizationsManagedByUserQuery, OrganizationsManagedByUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrganizationsManagedByUserQuery, OrganizationsManagedByUserQueryVariables>(
    OrganizationsManagedByUserDocument,
    options,
  );
}
export type OrganizationsManagedByUserQueryHookResult = ReturnType<typeof useOrganizationsManagedByUserQuery>;
export type OrganizationsManagedByUserLazyQueryHookResult = ReturnType<typeof useOrganizationsManagedByUserLazyQuery>;
export type OrganizationsManagedByUserQueryResult = Apollo.QueryResult<
  OrganizationsManagedByUserQuery,
  OrganizationsManagedByUserQueryVariables
>;
export const EntitySearchDocument = gql`
  query EntitySearch($entityType: [SearchEntityType!]!, $query: String!, $page: Int, $limit: Int) {
    entitySearch(entityType: $entityType, query: $query, page: $page, limit: $limit) {
      count
      items {
        entityId
        entityName
        entityType
        ... on SecurityEntitySearchDTO {
          symbol
          exchange
        }
      }
    }
  }
`;

/**
 * __useEntitySearchQuery__
 *
 * To run a query within a React component, call `useEntitySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntitySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntitySearchQuery({
 *   variables: {
 *      entityType: // value for 'entityType'
 *      query: // value for 'query'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useEntitySearchQuery(baseOptions: Apollo.QueryHookOptions<EntitySearchQuery, EntitySearchQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EntitySearchQuery, EntitySearchQueryVariables>(EntitySearchDocument, options);
}
export function useEntitySearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EntitySearchQuery, EntitySearchQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EntitySearchQuery, EntitySearchQueryVariables>(EntitySearchDocument, options);
}
export type EntitySearchQueryHookResult = ReturnType<typeof useEntitySearchQuery>;
export type EntitySearchLazyQueryHookResult = ReturnType<typeof useEntitySearchLazyQuery>;
export type EntitySearchQueryResult = Apollo.QueryResult<EntitySearchQuery, EntitySearchQueryVariables>;
export const TeamsDocument = gql`
  query Teams($pageSize: Int, $page: [String], $organizationId: String) {
    accessGroups(pageSize: $pageSize, page: $page, organizationId: $organizationId) {
      items {
        id
        name
        organizationId
        managedOrganizationIds
        userIds
      }
    }
  }
`;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
}
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
}
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const UpdateTeamMutationDocument = gql`
  mutation UpdateTeamMutation(
    $id: String!
    $name: String
    $organizationId: String
    $managedOrganizationIds: [String]
    $userIds: [String]
    $managedOrgDeltas: AccessGroupUpdateDeltas
    $userDeltas: AccessGroupUpdateDeltas
  ) {
    updateAccessGroup(
      id: $id
      name: $name
      organizationId: $organizationId
      managedOrganizationIds: $managedOrganizationIds
      userIds: $userIds
      managedOrgDeltas: $managedOrgDeltas
      userDeltas: $userDeltas
    ) {
      ...AccessGroupFragment
    }
  }
  ${AccessGroupFragmentFragmentDoc}
`;
export type UpdateTeamMutationMutationFn = Apollo.MutationFunction<
  UpdateTeamMutationMutation,
  UpdateTeamMutationMutationVariables
>;

/**
 * __useUpdateTeamMutationMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutationMutation, { data, loading, error }] = useUpdateTeamMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      organizationId: // value for 'organizationId'
 *      managedOrganizationIds: // value for 'managedOrganizationIds'
 *      userIds: // value for 'userIds'
 *      managedOrgDeltas: // value for 'managedOrgDeltas'
 *      userDeltas: // value for 'userDeltas'
 *   },
 * });
 */
export function useUpdateTeamMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutationMutation, UpdateTeamMutationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTeamMutationMutation, UpdateTeamMutationMutationVariables>(
    UpdateTeamMutationDocument,
    options,
  );
}
export type UpdateTeamMutationMutationHookResult = ReturnType<typeof useUpdateTeamMutationMutation>;
export type UpdateTeamMutationMutationResult = Apollo.MutationResult<UpdateTeamMutationMutation>;
export type UpdateTeamMutationMutationOptions = Apollo.BaseMutationOptions<
  UpdateTeamMutationMutation,
  UpdateTeamMutationMutationVariables
>;

export const OrganizationTrialsDocument = gql`
  query OrganizationTrials($trialType: String, $expired: Boolean) {
    organizationTrials(trialType: $trialType, expired: $expired) {
      trialType
      trialName
      entitlement
      product
      expiryDate
    }
  }
`;

/**
 * __useOrganizationTrialsQuery__
 *
 * To run a query within a React component, call `useOrganizationTrialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationTrialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationTrialsQuery({
 *   variables: {
 *      trialType: // value for 'trialType'
 *      expired: // value for 'expired'
 *   },
 * });
 */
export function useOrganizationTrialsQuery(
  baseOptions?: Apollo.QueryHookOptions<OrganizationTrialsQuery, OrganizationTrialsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrganizationTrialsQuery, OrganizationTrialsQueryVariables>(OrganizationTrialsDocument, options);
}
export function useOrganizationTrialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrganizationTrialsQuery, OrganizationTrialsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrganizationTrialsQuery, OrganizationTrialsQueryVariables>(OrganizationTrialsDocument, options);
}
export type OrganizationTrialsQueryHookResult = ReturnType<typeof useOrganizationTrialsQuery>;
export type OrganizationTrialsLazyQueryHookResult = ReturnType<typeof useOrganizationTrialsLazyQuery>;
export type OrganizationTrialsQueryResult = Apollo.QueryResult<OrganizationTrialsQuery, OrganizationTrialsQueryVariables>;
export const CreateTrialDocument = gql`
  mutation createTrial($trialType: String!) {
    createTrial(trialType: $trialType) {
      entitlement
      expiryDate
      product
      trialName
      trialType
    }
  }
`;

export type CreateTrialMutationFn = Apollo.MutationFunction<CreateTrialMutation, CreateTrialMutationVariables>;

/**
 * __useCreateTrialMutation__
 *
 * To run a mutation, you first call `useCreateTrialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrialMutation, { data, loading, error }] = useCreateTrialMutation({
 *   variables: {
 *      trialType: // value for 'trialType'
 *   },
 * });
 */
export function useCreateTrialMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTrialMutation, CreateTrialMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTrialMutation, CreateTrialMutationVariables>(CreateTrialDocument, options);
}
export type CreateTrialMutationHookResult = ReturnType<typeof useCreateTrialMutation>;
export type CreateTrialMutationResult = Apollo.MutationResult<CreateTrialMutation>;
export type CreateTrialMutationOptions = Apollo.BaseMutationOptions<CreateTrialMutation, CreateTrialMutationVariables>;
export const MeDocument = gql`
  query Me {
    me {
      id
      firstName
      lastName
      friendlyName
      email
      title
      roles
      active
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
  query User($id: String!, $userId: String!) {
    user(id: $id, userId: $userId) {
      id
      firstName
      lastName
      friendlyName
      email
      title
      roles
      active
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
  query Users($organizationId: String, $pageSize: Int, $page: [String], $searchTerm: String) {
    users(organizationId: $organizationId, pageSize: $pageSize, page: $page, searchTerm: $searchTerm) {
      items {
        active
        email
        firstName
        friendlyName
        id
        lastName
        organizationId
        roles
        search
      }
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersByOrgDocument = gql`
  query UsersByOrg($organizationId: String!, $pagination: OffsetPagination!) {
    usersByOrganization(organizationId: $organizationId, pagination: $pagination) {
      currentPage
      records {
        id
        organizationId
        firstName
        lastName
        email
        friendlyName
        active
        roles
        title
        createdAt
        updatedAt
        identityProviderId
        search
        emailApp
      }
      totalItems
      totalPages
    }
  }
`;

/**
 * __useUsersByOrgQuery__
 *
 * To run a query within a React component, call `useUsersByOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByOrgQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useUsersByOrgQuery(baseOptions: Apollo.QueryHookOptions<UsersByOrgQuery, UsersByOrgQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersByOrgQuery, UsersByOrgQueryVariables>(UsersByOrgDocument, options);
}
export function useUsersByOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersByOrgQuery, UsersByOrgQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersByOrgQuery, UsersByOrgQueryVariables>(UsersByOrgDocument, options);
}
export type UsersByOrgQueryHookResult = ReturnType<typeof useUsersByOrgQuery>;
export type UsersByOrgLazyQueryHookResult = ReturnType<typeof useUsersByOrgLazyQuery>;
export type UsersByOrgQueryResult = Apollo.QueryResult<UsersByOrgQuery, UsersByOrgQueryVariables>;
export const UpdateUserDocument = gql`
  mutation updateUser(
    $id: String!
    $organizationId: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $active: Boolean
    $friendlyName: String
    $title: String
    $roles: [String]
    $emailApp: String
  ) {
    updateUser(
      id: $id
      organizationId: $organizationId
      email: $email
      firstName: $firstName
      lastName: $lastName
      active: $active
      friendlyName: $friendlyName
      title: $title
      roles: $roles
      emailApp: $emailApp
    ) {
      id
      organizationId
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      active: // value for 'active'
 *      friendlyName: // value for 'friendlyName'
 *      title: // value for 'title'
 *      roles: // value for 'roles'
 *      emailApp: // value for 'emailApp'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
