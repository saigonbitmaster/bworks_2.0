import React from "react";
import SmartContractJob from "../components/smartContractJobMeshJs";
import { SelectChangeEvent } from "@mui/material/Select";
import { useGetList } from "react-admin";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { script, scriptAddr } from "./contract";
import moment from "moment";
import Typography from "@mui/material/Typography";
import {
  Transaction,
  Data,
  BlockfrostProvider,
  resolveDataHash,
  KoiosProvider,
} from "@meshsdk/core";

const SmartContracts = () => {
  const { wallet, connected, connecting } = useWallet();

  const initContract = {
    selected: "",
    contracts: [],
  };
  const [contract, setContract] = React.useState(initContract);

  const [notification, setNotification] = React.useState({
    error: false,
    message: "",
  });
  const { data, total, isLoading, error } = useGetList("contracts", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "createdDate", order: "DESC" },
  });

  const initJobBids = {
    selected: "0",
    jobBids: [],
  };
  const [jobBids, setJobBids] = React.useState(initJobBids);

  //{ data, total, isLoading, error } =  useGetList("jobbids",{})
  const jobBidReturn = useGetList("jobbids", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "createdDate", order: "DESC" },
    filter: { queryType: "employer" },
  });

  React.useEffect(() => {
    if (
      !jobBidReturn.isLoading &&
      !jobBidReturn.error &&
      jobBidReturn.data.length > 0
    ) {
      const selected = jobBidReturn.data[0].id;
      setJobBids({ selected, jobBids: jobBidReturn.data });
    }
  }, [jobBidReturn.data]);

  React.useEffect(() => {
    const amountToLock =
      jobBids.jobBids.find((item) => item.id === jobBids.selected)?.bidValue ||
      0;
    setLockAdaValues({
      ...lockAdaValues,
      amountToLock: amountToLock.toString(),
    });
  }, [jobBids.selected]);

  React.useEffect(() => {
    if (!isLoading && !error) {
      const selected = data[0].id;
      setContract({ selected, contracts: data });
    }
  }, [data]);

  const [lockAdaValues, setLockAdaValues] = React.useState({
    amountToLock: "",
    datumToLock: "",
  });

  const [redeemAdaValues, setRedeemAdaValues] = React.useState({
    amountToRedeem: "",
    datumToRedeem: "",
    transactionIdLocked: "",
    transactionIndxLocked: "",
    manualFee: "900000",
  });

  const redeemAdaFromPlutus = async () => {};

  const handleContractChange = (event: SelectChangeEvent) => {
    setContract({ ...contract, selected: event.target.value });
  };

  const handleJobBidChange = (event: SelectChangeEvent) => {
    setJobBids({ ...jobBids, selected: event.target.value });
  };

  const {
    data: _data,
    total: _total,
    isLoading: _isLoading,
    error: _error,
  } = useGetList("wallets", {
    pagination: { page: 1, perPage: 10 },
    filter: { userId: localStorage.getItem("username") },
  });

  //lockAda data
  const handleChangeLockAda =
    (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLockAdaValues({ ...lockAdaValues, [prop]: event.target.value });
    };

  //redeem data
  const handleChangRedeemAda =
    (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setRedeemAdaValues({ ...redeemAdaValues, [prop]: event.target.value });
    };

  let datum = {
    publicKeyHash: _data && _data[0].pKeyHash,
    deadline: new Date(),
  };

  const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs());

  const handleChangeDate = (newValue: any | null) => {
    setDateValue(newValue);
  };

  const sendAdaToPlutus = async () => {
    //validate datum: deadline must be minimum 1 week
    //public keyhash must be a valid bworks wallet address if unlock transaction signed by bworks.

    if (wallet) {
      const d: Data = {
        alternative: 0,
        fields: [
          "c8b46ea1f3716485b2cdc3b8b95a88e08bbd7c92e5ccc7399507757e",
          10,
        ],
      };

      const tx = new Transaction({ initiator: wallet });

      tx.sendLovelace(
        {
          address: scriptAddr,
          datum: {
            value: d,
          },
        },
        "3140000"
      );
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log(txHash);
    }
  };
  console.log(contract);
  return (
    <Box sx={{ m: 3, display: "flex", flex: 1, flexDirection: "column" }}>
      <Box sx={{ m: 3, display: "flex", flex: 1, flexDirection: "row" }}>
        <SmartContractJob
          handleContractChange={handleContractChange}
          handleJobBidChange={handleJobBidChange}
          contract={contract}
          jobBids={jobBids}
          sendAdaToPlutus={sendAdaToPlutus}
          redeemAdaFromPlutus={redeemAdaFromPlutus}
          handleChangeLockAda={handleChangeLockAda}
          handleChangRedeemAda={handleChangRedeemAda}
          lockAdaValues={lockAdaValues}
          datum={datum}
          dateValue={dateValue}
          handleChangeDate={handleChangeDate}
          redeemAdaValues={redeemAdaValues}
          notification={notification}
        ></SmartContractJob>
        <CardanoWallet />
      </Box>
    </Box>
  );
};

export default SmartContracts;
