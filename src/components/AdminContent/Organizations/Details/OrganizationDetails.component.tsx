/* eslint-disable sonarjs/cognitive-complexity */
import "./OrganizationDetails.scss";
import { useApolloClient } from "@apollo/client";
import {
  ButtonTheme,
  Collapsable,
  ErrorHandlerField,
  ErrorHandlerService,
  ErrorModel,
  Field,
  Grid,
  GridColumn,
  isNullOrWhiteSpace,
  Modal,
  Textbox,
  Toggle,
  useVisibility,
  isEmpty,
  SpinnerTheme,
  Select,
  RadioButton,
  CopyButton,
} from "@q4/nimbus-ui";
import { OrganizationType, Entitlement as EntitlementConstant, OrganizationRegion } from "@q4/platform-definitions";
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { generatePath, useHistory, useLocation, useParams } from "react-router-dom";
import { AdminRoutePath, RoutePathIdLabel } from "../../../../configurations/navigation.configuration";
import { AdminLoadingContext } from "../../../../contexts/loading/loading.context";
import type {
  OrganizationStockInfo,
  OrganizationTypeOption,
  OrganizationCurrencyOption,
} from "../../../../definitions/organization.definition";
import { Organization, OrganizationEditState } from "../../../../definitions/organization.definition";
import { useAdminEditContext } from "../../../../hooks/useAdminEditContext/useAdminEditContext.hook";
import { useClaims } from "../../../../hooks/useClaims/useClaims.hook";
import {
  OrganizationEditMessage,
  OrganizationCreateMessage,
} from "../../../../hooks/useOrganization/useOrganization.definition";
import {
  useOrganizationCreate,
  useOrganizationQuery,
  useOrganizationUpdate,
  useSitesByOrganizationsLazyQuery,
} from "../../../../hooks/useOrganization/useOrganization.hook";
import { useToastNotificationService } from "../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { OrganizationsDocument } from "../../../../schemas/generated/graphql";
import { checkIfEntitlementExists, filterEntitlement } from "../../../../utils/entitlement/entitlement.utils";
import { mapErrorsToKey } from "../../../../utils/error/error.utils";
import {
  getOrganizationDetailsMode,
  siteFilter,
  getOrganizationEditUserNewRoute,
  buildOrganizationTypeOptions,
  buildOrganizationCurrencyOptions,
  getOrganizationCreateTeamNewRoute,
} from "../../../../utils/organization/organization.utils";
import type { Entitlement } from "../../../Entitlements/Entitlements.definition";
import { OrganizationFeatureManagement } from "../../../FeatureManagement/FeatureManagement.component";
import { AdminLoadingSpinner } from "../../../LoadingSpinner/LoadingSpinner.component";
import {
  OrganizationDetailsClassName,
  OrganizationsEditErrorSelectTheme,
  OrganizationsEditErrorTextboxTheme,
  OrganizationDetailsLabel,
  OrganizationDetailsViewIdModel as ViewIdModel,
  OrganizationDetailsMode,
  OrganizationDetailsModeData,
  OrganizationRegionLabel,
} from "./OrganizationDetails.definition";
import type { OrganizationDetailsError, OrganizationsEditParam } from "./OrganizationDetails.definition";
import { StockTicker } from "./StockTicker/StockTicker.component";

const OrganizationDetailsBase = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const [globalLoading] = useContext(AdminLoadingContext);
  const params = useParams<OrganizationsEditParam>();
  const organizationId = useMemo(() => params.id, [params.id]);
  const claims = useClaims();
  const client = useApolloClient();

  const organizationDetailsMode = useRef(getOrganizationDetailsMode(claims.permissions, organizationId));
  const organizationDetailsModeData = useRef(OrganizationDetailsModeData[organizationDetailsMode.current]);

  const { entity: context, setEntity: setContext } = useAdminEditContext(Organization, organizationId);

  const [organization, setOrganization] = useState(new OrganizationEditState(context));

  const errorService = useRef(
    new ErrorHandlerService<number, OrganizationEditState>([
      new ErrorHandlerField("name", "Name is required."),
      new ErrorHandlerField("type", "Type is required."),
      new ErrorHandlerField("region", "Region is required."),
      new ErrorHandlerField("currency", "Currency is required."),
    ]),
  );
  const [errors, setErrors] = useState<OrganizationDetailsError>();

  const transitionToEdit = useRef(!isNullOrWhiteSpace(context?.id) && context.id === organizationId);

  const [hidden, handleCloseRequest] = useVisibility();

  const [{ fetching: loadingPost }, post] = useOrganizationCreate();
  const [{ fetching: loadingPut }, put] = useOrganizationUpdate();

  const [sitesByOrgResp, getSitesByOrgQuery] = useSitesByOrganizationsLazyQuery();

  const getSitesByOrg = useCallback(() => {
    if (!isNullOrWhiteSpace(organizationId)) {
      getSitesByOrgQuery({
        organizationId,
        siteFilter,
      });
    }
  }, [getSitesByOrgQuery, organizationId]);

  useEffect(getSitesByOrg, [getSitesByOrg]);

  const pauseQuery = useRef(transitionToEdit.current || isNullOrWhiteSpace(organizationId));
  const [{ data, fetching: loadingGet }] = useOrganizationQuery({
    variables: { id: organizationId },
    pause: pauseQuery.current,
  });

  const original = useMemo(() => data?.organization, [data?.organization]);

  const loading = useMemo(
    () => loadingGet || loadingPost || loadingPut || globalLoading,
    [loadingGet, loadingPost, loadingPut, globalLoading],
  );

  useEffect(() => {
    if (pauseQuery.current) return;

    const organizationObj = isNullOrWhiteSpace(original?.type) ? { ...original, type: OrganizationType.CORP } : original;

    setOrganization(new OrganizationEditState(organizationObj));
  }, [original]);

  const notifications = useToastNotificationService();

  function checkForErrors(): boolean {
    const errorId = 1;
    errorService.current.checkForErrors(errorId, organization);

    const currentErrors = errorService.current.getAll().reduce<OrganizationDetailsError>(mapErrorsToKey, {});
    const hasStockError = hasStockTickerError();
    currentErrors.stockTicker = new ErrorModel("A ticker and exchange is required.", hasStockError);

    setErrors(currentErrors);

    return errorService.current.hasErrors() || hasStockError;
  }

  const handleOrganizationChange = useCallback(function handleOrganizationChange<T>(
    key: keyof OrganizationEditState,
  ): (value: T) => void {
    return (value: T): void => {
      setOrganization((state) => ({
        ...state,
        [key]: value,
      }));
    };
  },
  []);

  const handleStockChange = useCallback(
    (value: OrganizationStockInfo) => {
      setOrganization((state) => ({
        ...state,
        ...value,
      }));
    },
    [setOrganization],
  );

  const handleOrgSubdomainChange = useCallback((subdomain: string) => {
    setOrganization((prevOrg) => ({
      ...prevOrg,
      studio: {
        ...prevOrg.studio,
        subdomain,
      },
    }));
  }, []);

  const handleOrganizationTypeChange = useCallback((option: OrganizationTypeOption) => {
    setOrganization((state) => ({ ...state, type: option.value }));
  }, []);

  const handleOrganizationRegionChange = useCallback((region: OrganizationRegion) => {
    setOrganization((state) => ({ ...state, region }));
  }, []);

  const handleOrganizationCurrencyChange = useCallback((option: OrganizationCurrencyOption) => {
    setOrganization((state) => ({ ...state, currency: option.value }));
  }, []);

  const setPrimarySiteOnEntitlementAdd = useCallback(
    (entitlement: Entitlement) => {
      const isIncomingEntitlementStudio = entitlement === EntitlementConstant.Studio;
      const isSubdomainEmpty = isEmpty(organization?.studio?.subdomain);
      const items = sitesByOrgResp?.data?.organizationSites?.items || [];
      const itemsHasLength = items.length > 0;

      if (isIncomingEntitlementStudio && isSubdomainEmpty && itemsHasLength) {
        handleOrgSubdomainChange(items[0].subdomain);
      }
    },
    [organization?.studio?.subdomain, sitesByOrgResp, handleOrgSubdomainChange],
  );

  const handleEntitlementAdd = useCallback(
    (entitlement: Entitlement) => {
      let entitlementAlreadyExists = false;

      setOrganization((state) => {
        const currentEntitlements = isEmpty(state?.entitlements) ? [] : state.entitlements;

        entitlementAlreadyExists = checkIfEntitlementExists(currentEntitlements, entitlement);

        if (entitlementAlreadyExists) {
          notifications.current.dismiss();
          notifications.current.error(OrganizationEditMessage.EntitlementAlreadyAdded);
          return state;
        }

        return {
          ...state,
          entitlements: [...currentEntitlements, entitlement],
        };
      });

      if (!entitlementAlreadyExists) {
        setPrimarySiteOnEntitlementAdd(entitlement);
      }
    },
    [notifications, setPrimarySiteOnEntitlementAdd],
  );

  function handleEntitlementRemove(entitlement: Entitlement): void {
    setOrganization((state) => ({
      ...state,
      entitlements: filterEntitlement(state?.entitlements, entitlement),
    }));

    // When removing the Studio Entitlement, we want to unset the organization's primary site.
    if (entitlement === EntitlementConstant.Studio) {
      handleOrgSubdomainChange(null);
    }
  }

  function hasStockTickerError(): boolean {
    return (
      (isNullOrWhiteSpace(organization.ticker) && !isNullOrWhiteSpace(organization.exchange)) ||
      (!isNullOrWhiteSpace(organization.ticker) && isNullOrWhiteSpace(organization.exchange))
    );
  }

  const isEditMode = organizationDetailsMode.current == OrganizationDetailsMode.Edit;
  const isCreateMode = organizationDetailsMode.current === OrganizationDetailsMode.Create;

  function handlePost(): void {
    if (checkForErrors()) {
      return;
    }

    const { id, ...base } = organization;

    const save = isEditMode
      ? () =>
          put({
            ...organization,
            // To clear out the Q4 Security ID, we need to set it to null instead of an empty string.
            q4SecurityId: organization.q4SecurityId || null,
          })
      : () => post(base);

    save().then((response) => {
      if (!response.success) {
        const errMsg = isEditMode ? OrganizationEditMessage.Failed : OrganizationCreateMessage.Failed;
        notifications.current.error(`${errMsg}: ${response.message}`);
        return;
      }

      const successMessage = isEditMode ? OrganizationEditMessage.Success : OrganizationCreateMessage.Success;
      notifications.current.success(successMessage);
      setContext(response.data);
      client.refetchQueries({
        include: [OrganizationsDocument],
      });
      if (isCreateMode) {
        organizationDetailsMode.current = OrganizationDetailsMode.Edit;
        organizationDetailsModeData.current = OrganizationDetailsModeData[organizationDetailsMode.current];
        setOrganization({ ...organization, id: response.data.id });
        window.history.replaceState(
          null,
          "",
          generatePath(AdminRoutePath.OrganizationsEdit, { [RoutePathIdLabel.Id]: response.data.id }),
        );
      } else {
        handleCloseRequest();
      }
    });
  }

  function handleExit(): void {
    history.push(AdminRoutePath.Organizations);
  }

  const handleCreateUser = useCallback(() => {
    history.push({
      pathname: getOrganizationEditUserNewRoute(organization.id),
      state: { background: location, show: "userCreateModal" },
    });
  }, [history, location, organization.id]);

  function getOrganizationTypeOption(org: Organization) {
    const options = buildOrganizationTypeOptions();
    return org?.type ? options.find((option) => option.value === org?.type) : null;
  }

  const currencyOptions = useMemo(() => buildOrganizationCurrencyOptions(), []);

  function getOrganizationCurrencyOption(organization: Organization) {
    return organization?.currency ? currencyOptions?.find((option) => option.value === organization?.currency) : null;
  }

  function hasErrorTheme(isError: boolean) {
    return isError ? OrganizationsEditErrorSelectTheme : null;
  }

  const handleAddTeam = useCallback(() => {
    history.push(getOrganizationCreateTeamNewRoute(organization.id));
  }, [history, organization.id]);

  return (
    <div id={ViewIdModel.id}>
      <Modal
        fullscreen
        scrollable
        id={ViewIdModel.modal.id}
        className={OrganizationDetailsClassName.Base}
        badgeIcon="q4i-suitcase-cog-2pt"
        title={organizationDetailsModeData.current.title}
        visible={!hidden}
        onCloseRequest={handleCloseRequest}
        ghostableProps={{ appear: !transitionToEdit.current, onExited: handleExit }}
        footerActions={[
          {
            disabled: loading,
            id: ViewIdModel.save.id,
            label: organizationDetailsModeData.current.buttonLabel,
            theme: ButtonTheme.Citrus,
            onClick: organizationDetailsMode.current == OrganizationDetailsMode.View ? handleExit : handlePost,
          },
        ]}
      >
        <AdminLoadingSpinner loading={loading} theme={SpinnerTheme.Citrus} fixed />
        <Grid className={OrganizationDetailsClassName.SectionAndSectionWithPaddingModifier}>
          <GridColumn width="1-of-3">
            <Field required id={ViewIdModel.nameField.id} label={OrganizationDetailsLabel.Name} error={errors?.name}>
              <Textbox
                disabled={loading || organizationDetailsMode.current == OrganizationDetailsMode.View}
                id={ViewIdModel.name.id}
                theme={!!errors?.name?.visible ? OrganizationsEditErrorTextboxTheme : null}
                value={organization.name}
                onChange={handleOrganizationChange("name")}
              />
            </Field>
          </GridColumn>
          <GridColumn width="1-of-3">
            <Field id={ViewIdModel.stockField.id} label={OrganizationDetailsLabel.StockTicker} error={errors?.stockTicker}>
              {((!isCreateMode && organization.id) || isCreateMode) && (
                <StockTicker
                  initValue={organization}
                  onChange={handleStockChange}
                  disabled={loading || organizationDetailsMode.current == OrganizationDetailsMode.View}
                />
              )}
            </Field>
            <div className={OrganizationDetailsClassName.FieldCaption}>
              For public companies, verify stock ticker matches accurately
            </div>
          </GridColumn>
          <GridColumn width="1-of-3">
            <Field className={OrganizationDetailsClassName.Status} label={OrganizationDetailsLabel.Status}>
              <Toggle
                id={`${ViewIdModel.featureManagement.userToggle.id}--status`}
                disabled={loading || organization.isAdmin || organizationDetailsMode.current == OrganizationDetailsMode.View}
                labelLeft="DEACTIVATED"
                labelRight="ACTIVE"
                on={organization.active}
                onChange={handleOrganizationChange("active")}
              />
            </Field>
          </GridColumn>
          <GridColumn width="1-of-3">
            <Field
              required={!isEditMode}
              id={ViewIdModel.typeField.id}
              className={OrganizationDetailsClassName.Type}
              label={OrganizationDetailsLabel.Type}
              error={errors?.type}
            >
              <Select
                id={ViewIdModel.type.id}
                theme={hasErrorTheme(!!errors?.type?.visible)}
                options={buildOrganizationTypeOptions(organizationDetailsMode.current)}
                labelKey="label"
                value={getOrganizationTypeOption(organization)}
                disabled={isEditMode || organizationDetailsMode.current == OrganizationDetailsMode.View}
                onChange={handleOrganizationTypeChange}
              />
            </Field>
          </GridColumn>
          <GridColumn width="1-of-3">
            <Field
              required
              id={ViewIdModel.regionField.id}
              className={OrganizationDetailsClassName.Region}
              label={OrganizationDetailsLabel.Region}
              error={errors?.region}
            >
              <RadioButton
                alignmentPadding={true}
                checked={organization.region === OrganizationRegion.NORTH_AMERICA}
                className={`${OrganizationDetailsClassName.Region}--left`}
                id={ViewIdModel.regionNorthAmericaRadioButton.id}
                label={OrganizationRegionLabel.NORTH_AMERICA}
                name={OrganizationRegionLabel.NORTH_AMERICA}
                onChange={() => handleOrganizationRegionChange(OrganizationRegion.NORTH_AMERICA)}
                value={OrganizationRegion.NORTH_AMERICA}
              />
              <RadioButton
                alignmentPadding={true}
                checked={organization.region === OrganizationRegion.EUROPE}
                className={`${OrganizationDetailsClassName.Region}--center`}
                id={ViewIdModel.regionEuropeRadioButton.id}
                label={OrganizationRegionLabel.EUROPE}
                name={OrganizationRegionLabel.EUROPE}
                onChange={() => handleOrganizationRegionChange(OrganizationRegion.EUROPE)}
                value={OrganizationRegion.EUROPE}
              />
            </Field>
          </GridColumn>
        </Grid>
        <Grid className={OrganizationDetailsClassName.SectionAndSectionWithPaddingModifier}>
          <GridColumn width="1-of-3">
            <Field
              required
              id={ViewIdModel.currencyField.id}
              className={OrganizationDetailsClassName.Currency}
              label={OrganizationDetailsLabel.Currency}
              error={errors?.currency}
            >
              <Select
                id={ViewIdModel.currency.id}
                theme={hasErrorTheme(!!errors?.type?.visible)}
                options={buildOrganizationCurrencyOptions()}
                labelKey="label"
                value={getOrganizationCurrencyOption(organization)}
                onChange={handleOrganizationCurrencyChange}
              />
            </Field>
          </GridColumn>
        </Grid>
        <Collapsable
          collapsed={organizationDetailsMode.current == OrganizationDetailsMode.Create}
          ghostableProps={{ appear: !transitionToEdit.current }}
        >
          <Grid className={OrganizationDetailsClassName.SectionAndSectionWithPaddingModifier}>
            <GridColumn width="1-of-3">
              <Field label={OrganizationDetailsLabel.Id}>
                <div className={OrganizationDetailsClassName.TextboxCopy}>
                  <Textbox id={ViewIdModel.organizationId.id} disabled value={organization.id} onChange={null} />
                  <CopyButton value={organization.id} label={OrganizationDetailsLabel.Id} />
                </div>
              </Field>
            </GridColumn>
          </Grid>
          <Grid>
            <GridColumn width="1-of-1">
              {organization.id && (
                <OrganizationFeatureManagement
                  id={ViewIdModel.featureManagement.id}
                  sectionClassName={OrganizationDetailsClassName.SectionAndSectionWithPaddingModifier}
                  organization={organization}
                  sitesByOrgResp={sitesByOrgResp}
                  getSitesByOrg={getSitesByOrg}
                  onOrgSubdomainChange={handleOrgSubdomainChange}
                  onEntitlementAdd={handleEntitlementAdd}
                  onEntitlementRemove={handleEntitlementRemove}
                  onCreateUser={handleCreateUser}
                  onCreateTeam={handleAddTeam}
                />
              )}
            </GridColumn>
          </Grid>
        </Collapsable>
      </Modal>
    </div>
  );
};

export const OrganizationDetails = memo(OrganizationDetailsBase);
