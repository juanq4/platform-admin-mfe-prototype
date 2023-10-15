import { AsyncSelect, SelectPreset } from "@q4/nimbus-ui";
import { memo, useRef, useState } from "react";
import type { OrganizationStockOption } from "../../../../../definitions";
import type { SecurityEntitySearchDto } from "../../../../../schemas/generated/graphql";
import { SearchEntityType, useEntitySearchQuery } from "../../../../../schemas/generated/graphql";
import { OrganizationDetailsViewIdModel as ViewIdModel } from "../OrganizationDetails.definition";
import type { StockTickerProps } from "./StockTicker.definition";
import { SelectWrapper } from "./StockTicker.style";

function getQueryParameters(query: string) {
  return { entityType: [SearchEntityType.security], query, page: 1, limit: 20 };
}

function getOptionLabel(ticker?: string, exchange?: string) {
  return ticker && exchange ? `${ticker} | ${exchange}` : "";
}

const StockTickerBase = (props: StockTickerProps): JSX.Element => {
  const { onChange, initValue, disabled } = props;

  const [isLoading, setIsLoading] = useState(false);

  const inputValue = useRef({
    label: getOptionLabel(initValue.ticker, initValue.exchange),
    value: { q4SecurityId: initValue?.q4SecurityId, ticker: initValue?.ticker, exchange: initValue?.exchange },
  });

  const { refetch } = useEntitySearchQuery({
    variables: getQueryParameters(""),
  });

  const handleLoadEntities = (inputValue: string, callback: (options: OrganizationStockOption[]) => void): void => {
    if (!inputValue) {
      setIsLoading(false);
      return callback([]);
    }

    setTimeout(() => {
      refetch(getQueryParameters(inputValue)).then((res) => {
        const options = ((res?.data?.entitySearch?.items as SecurityEntitySearchDto[]) || []).map((item) => ({
          label: getOptionLabel(item.symbol, item.exchange),
          value: {
            q4SecurityId: item.entityId,
            ticker: item.symbol,
            exchange: item.exchange,
          },
        }));
        callback(options);
        setIsLoading(false);
      });
    }, 300);
  };

  const handleChange = (selectedOption: OrganizationStockOption) => {
    selectedOption?.value && onChange({ ...selectedOption.value });
    selectedOption?.value && (inputValue.current = { ...selectedOption });
  };

  const handleReset = () => {
    inputValue.current = {
      label: "",
      value: { q4SecurityId: "", ticker: "", exchange: "" },
    };
    onChange(inputValue.current.value);
  };

  return (
    <SelectWrapper>
      {!disabled && !isLoading && inputValue.current.label && (
        <div className="close" onClick={handleReset}>
          <i className="ni-close-4pt"></i>
        </div>
      )}
      <AsyncSelect
        id={ViewIdModel.symbol.id}
        placeholder="Search Organization"
        loadOptions={handleLoadEntities}
        loading={isLoading}
        preset={SelectPreset.Autocomplete}
        onChange={handleChange}
        value={inputValue.current}
        onInputChange={(val: string) => val && setIsLoading(true)}
        filterOption={() => true}
        onBlur={() => setIsLoading(false)}
        isClearable
        clearIndicatorIcon="ni-close-4pt"
        isDisabled={disabled}
      />
    </SelectWrapper>
  );
};

export const StockTicker = memo(StockTickerBase);
