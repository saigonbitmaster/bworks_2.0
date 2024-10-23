import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import PostedJobs from "./publishedContract";
import ActiveUsers from "./activeUsers";
import SmartContractTxs from "./smartContractTXs";
import PaidByPlutus from "./dAppTxs";
import PostedJobsChart from "./publishedContractChart";
import PaymentChart from "./dAppTxChart";
import { useDataProvider } from "react-admin";
import UserStatistic from "./currentUserStatistic";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  const [dashBoardCardData, setDashBoardCardData] = React.useState({
    dAppTxs: {
      dAppTxs: 0,
      totalAmount: 0,
    },
    activeUsers: {
      contractDevs: 0,
      dAppDevs: 0,
    },
    publishedContracts: { publishedContracts: 0, approvedContracts: 0 },
    lockAndUnlockTxs: {
      lockTxs: 0,
      unlockTxs: 0,
    },
  });
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider
      .customMethod("customapis/dashboardcards", { filter: {} }, "GET")
      .then((result) => setDashBoardCardData(result.data))
      .catch((error) => console.error(error));
  }, []);

  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <PaidByPlutus
          dAppTxs={dashBoardCardData.dAppTxs.dAppTxs}
          totalAmount={dashBoardCardData.dAppTxs.totalAmount}
        />
        <VerticalSpacer />
        <SmartContractTxs
          lockTxs={dashBoardCardData.lockAndUnlockTxs.lockTxs}
          unlockTxs={dashBoardCardData.lockAndUnlockTxs.unlockTxs}
        />
        <VerticalSpacer />
        <PostedJobsChart />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}></div>
      <div style={styles.flex}>
        <PostedJobs
          postedJobs={dashBoardCardData.publishedContracts.publishedContracts}
          bids={dashBoardCardData.publishedContracts.approvedContracts}
        />
        <Spacer />
        <SmartContractTxs
          lockTxs={dashBoardCardData.lockAndUnlockTxs.lockTxs}
          unlockTxs={dashBoardCardData.lockAndUnlockTxs.unlockTxs}
        />
      </div>
      <div style={styles.singleCol}>
        <PostedJobsChart />
      </div>
      <div style={styles.singleCol}>
        <PaymentChart />
      </div>
      <div style={styles.singleCol}>
        <UserStatistic></UserStatistic>
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <PaidByPlutus
              dAppTxs={dashBoardCardData.dAppTxs.dAppTxs}
              totalAmount={dashBoardCardData.dAppTxs.totalAmount}
            />
            <Spacer />
            <ActiveUsers
              jobSeekers={dashBoardCardData.activeUsers.dAppDevs}
              employers={dashBoardCardData.activeUsers.contractDevs}
            />
          </div>

          <div style={styles.singleCol}>
            <PostedJobsChart />
          </div>
          <div style={styles.singleCol}>
            <PaymentChart />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <PostedJobs
              postedJobs={
                dashBoardCardData.publishedContracts.publishedContracts
              }
              bids={dashBoardCardData.publishedContracts.approvedContracts}
            />
            <Spacer />
            <SmartContractTxs
              lockTxs={dashBoardCardData.lockAndUnlockTxs.lockTxs}
              unlockTxs={dashBoardCardData.lockAndUnlockTxs.unlockTxs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
