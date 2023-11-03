import * as React from "react";
import {
  useRecordContext,
  NumberField,
  NumberFieldProps,
  useGetOne,
} from "react-admin";

interface myProps extends NumberFieldProps {
  threshold?: number;
}

//use: <ColoredNumberField source="value" threshold={1000} />
const ColoredNumberField = (props: myProps) => {
  const record = useRecordContext();
  const threshold = props.threshold || 50000;

  const {
    data: currency,
    isLoading,
    error,
  } = useGetOne("currencies", {
    id: record.currencyId,
  });

  if (!record || !props.source || isLoading || error) {
    return null;
  }

  //currency must be ADA, USD or Ada, usd
  const currencyName = error ? null : isLoading ? null : currency.name;

  return record[props.source] > threshold ? (
    <NumberField
      {...props}
      sx={{ color: "red" }}
      options={
        currencyName ? { style: "currency", currency: currencyName } : {}
      }
    />
  ) : (
    <NumberField
      {...props}
      options={
        currencyName ? { style: "currency", currency: currencyName } : {}
      }
    />
  );
};

ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
