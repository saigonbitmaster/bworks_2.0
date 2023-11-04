import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark",
    },
    dashboard: {
      postedJob: "Posted jobs",
      submittedUsers: "Submitted users",
      allUsers: "See all users",
      pending_orders: "Pending Orders",
      allPostedJobs: "See all Jobs",
      plutusTxs: "Plutus TXs",
      allPlutusTxs: "See all payment TXs",
    },
    menu: {
      postJobs: "Hiring",
      reports: "Reports",
      manageFund: "Payment",
      tools: "Tools",
      settings: "Settings",
      jobSeeker: "Job search",
    },
  },
  resources: {
    help: { name: "Help" },
    changePassword: {
      name: "Change password",
    },
    postJobsJsk: {
      name: "Available jobs",
    },
    jobBidsJsk: {
      name: "Your applications",
    },

    userSettings: {
      name: "User settings",
    },
    jobtasks: {
      name: "Tasks",
    },
    paymentReport: {
      name: "Payment",
    },
    paymentReportJsk: {
      name: "Receipt",
    },
    reports: {
      import: "Import excels",
    },
    smartContracts: {
      name: "Make payment |||| Make payments",
    },
    cardanos: {
      name: "Fetch cardano |||| Fetch cardano",
    },
    parseAddress: {
      name: "Parse address",
    },
    gits: {
      name: "Query Github",
    },
    proposals: {
      name: "Proposal |||| Proposals",
    },
    postJobs: {
      name: "Post Job |||| Post job",
    },
    jobBids: {
      name: "Attended application |||| Submitted applications",
    },
    contractedJobs: {
      name: "Payment Tx |||| Payment TXs",
    },
    wallets: {
      name: "Select wallet |||| Select wallet",
    },
    withdraws: {
      name: "Withdraw |||| Withdraws",
    },
    postJobReports: {
      name: "Hiring ||||Hiring",
    },
    postJobReportsJsk: {
      name: "Job search |||| Job search",
    },
    walletReports: {
      name: "Wallet UTXO |||| Wallet UTXOs",
    },
    smartContractReports: {
      name: "Smart contract |||| Smart contracts",
    },

    settings: {
      name: "Setting |||| Settings",
    },
  },
};

export default customEnglishMessages;
