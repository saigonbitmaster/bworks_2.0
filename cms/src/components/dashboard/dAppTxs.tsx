import * as React from "react";
import DollarIcon from "@mui/icons-material/AttachMoney";
import CardWithIcon from "./cardWithIcon";

interface Props {
  dAppTxs: number;
  totalAmount: number;
}

const dAppTxs = (props: Props) => {
  const { dAppTxs = 0, totalAmount = 0 } = props;
  return (
    <CardWithIcon
      to="/plutustxs"
      icon={DollarIcon}
      title="dApp TXs"
      subtitle={`${dAppTxs} TXs, ${totalAmount} Ada`}
    />
  );
};

export default dAppTxs;
