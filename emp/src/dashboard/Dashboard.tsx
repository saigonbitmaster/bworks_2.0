import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import PostedJobs from "./postedJobs";
import ActiveUsers from "./activeUsers";
import SmartContractTxs from "./smartContractTXs";
import PaidByPlutus from "./paidByPlutus";
import PostedJobsChart from "./postedJobsChart";
import PaymentChart from "./paymentChart";
import { useDataProvider } from "react-admin";

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
    paidByPlutus: {
      numberOfJobs: 0,
      totalAmount: 0,
    },
    activeUsers: {
      jobSeekers: 0,
      employers: 0,
    },
    postedJobs: { postedJobs: 0, bids: 0 },
    plutusTxs: {
      lockTxs: 0,
      unlockTxs: 0,
    },
  });
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider
      .customMethod("public/dashboardcards", { filter: {} }, "GET")
      .then((result) => setDashBoardCardData(result.data))
      .catch((error) => console.error(error));
  }, []);

  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <PaidByPlutus
          numberOfJobs={dashBoardCardData.paidByPlutus.numberOfJobs}
          totalAmount={dashBoardCardData.paidByPlutus.totalAmount}
        />
        <VerticalSpacer />
        <SmartContractTxs
          lockTxs={dashBoardCardData.plutusTxs.lockTxs}
          unlockTxs={dashBoardCardData.plutusTxs.unlockTxs}
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
          postedJobs={dashBoardCardData.postedJobs.postedJobs}
          bids={dashBoardCardData.postedJobs.bids}
        />
        <Spacer />
        <SmartContractTxs
          lockTxs={dashBoardCardData.plutusTxs.lockTxs}
          unlockTxs={dashBoardCardData.plutusTxs.unlockTxs}
        />
      </div>
      <div style={styles.singleCol}>
        <PostedJobsChart />
      </div>
      <div style={styles.singleCol}>
        <PaymentChart />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <PaidByPlutus
              numberOfJobs={dashBoardCardData.paidByPlutus.numberOfJobs}
              totalAmount={dashBoardCardData.paidByPlutus.totalAmount}
            />
            <Spacer />
            <ActiveUsers
              jobSeekers={dashBoardCardData.activeUsers.jobSeekers}
              employers={dashBoardCardData.activeUsers.employers}
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
              postedJobs={dashBoardCardData.postedJobs.postedJobs}
              bids={dashBoardCardData.postedJobs.bids}
            />
            <Spacer />
            <SmartContractTxs
              lockTxs={dashBoardCardData.plutusTxs.lockTxs}
              unlockTxs={dashBoardCardData.plutusTxs.unlockTxs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
