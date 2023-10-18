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
  const record = useRecordContext(props);
  const threshold = props.threshold || 50000;

  const {
    data: job,
    isLoadingError: jobLoading,
    error: jobError,
  } = useGetOne("postjobs", { id: record.jobId });

  const {
    data: currency,
    isLoading,
    error,
  } = useGetOne("currencies", { id: job?.currencyId });

  //currency must be ADA, USD or Ada, usd
  const currencyName = error ? null : isLoading ? null : currency.name;

  if (
    !record ||
    !record.jobId ||
    !props.source ||
    jobLoading ||
    jobError ||
    isLoading ||
    error
  ) {
    return null;
  }
  return record[props.source] > threshold ? (
    <NumberField
      {...props}
      sx={{ color: "red" }}
      locales="us-US"
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
