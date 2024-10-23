import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import PostedJobs from "./submittedContracts";
import PostedJobsChart from "./submittedContractsChart";
import PieChart from "./pieChart";
import { useDataProvider } from "react-admin";
import { useTheme } from "@mui/material/styles";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const JobReports = () => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <PostedJobsChart />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}>
        <PostedJobsChart />
      </div>
      <div style={styles.singleCol}>
        <PieChart />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.singleCol}>
            <PostedJobsChart />
          </div>
          <div style={styles.singleCol}>
            <PieChart />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <PostedJobs />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobReports;
