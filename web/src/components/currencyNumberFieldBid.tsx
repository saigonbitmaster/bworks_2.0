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

const Currency = (props) => {
  const job = props.job || {};
  const color = props.color || null;

  const {
    data: currency,
    isLoading,
    error,
  } = useGetOne("currencies", { id: job.currencyId });

  return (
    <NumberField
      {...props}
      sx={{ color }}
      locales="us-US"
      options={
        currency?.name ? { style: "currency", currency: currency.name } : {}
      }
    />
  );
};

//use: <ColoredNumberField source="value" threshold={1000} />
const ColoredNumberField = (props: myProps) => {
  const record = useRecordContext(props);
  const threshold = props.threshold || 50000;

  const {
    data: job,
    isLoadingError: jobLoading,
    error: jobError,
  } = useGetOne("postjobs", { id: record.jobId });

  if (
    !record ||
    !record.jobId ||
    !props.source ||
    jobLoading ||
    jobError ||
    !job
  ) {
    return null;
  }
  return record[props.source] > threshold ? (
    <Currency {...props} color="red" job={job} />
  ) : (
    <Currency {...props} job={job} />
  );
};

ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
