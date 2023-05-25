import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";

import Payout from "./payout";
import SmartContractTxs from "./smartContractTXs";
import PostedJobsChart from "./postedJobsChart";
import PostedJobs from "./postedJobs";
import ActiveUsers from "./activeUsers";
import PaymentChart from "./paymentChart";
import { quizPostData, payoutData, monthlyRevenue, newQuiz } from "./data";

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
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <Payout value={monthlyRevenue} />
        <VerticalSpacer />
        <SmartContractTxs value={newQuiz} />
        <VerticalSpacer />
        <PostedJobsChart orders={quizPostData} />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}></div>
      <div style={styles.flex}>
        <Payout value={monthlyRevenue} />
        <Spacer />
        <SmartContractTxs value={newQuiz} />
      </div>
      <div style={styles.singleCol}>
        <PaymentChart orders={payoutData} />
      </div>
      <div style={styles.singleCol}>
        <PostedJobsChart orders={quizPostData} />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <Payout value={monthlyRevenue} />
            <Spacer />
            <ActiveUsers />
            
          </div>
          <div style={styles.singleCol}>
            <PaymentChart orders={payoutData} />
          </div>
          <div style={styles.singleCol}>
            <PostedJobsChart orders={quizPostData} />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <PostedJobs />
            <Spacer />
            <SmartContractTxs value={newQuiz} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
