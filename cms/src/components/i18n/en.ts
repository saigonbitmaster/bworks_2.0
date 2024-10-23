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
      allSubmittedScripts: "See all submitted scripts",
      allSmartContract: "See all smart contracts",
      allPublishContracts: "See all published contracts",
      submittedSmartContracts: "Published smart contracts",
      plutusTxs: "Plutus TXs",
      allPlutusTxs: "See all dApp TXs",
      welcome: {
        title: "Welcome to PSM",
        subtitle: "subtitle.",
        ra_button: "PSM site",
        demo_button: "Source for this demo",
      },
    },
    menu: {
      smartContracts: "Smart contracts",
      reports: "Reports",
      manageFund: "Transactions",
      tools: "Tools",
      settings: "Settings",
    },
  },

  resources: {
    users: {
      name: "Users",
    },
    jobQueues: {
      name: "Job Queue",
    },
    auditTxs: {
      name: "Audit TXs",
    },

    plutustxs: {
      name: "dApp TXs",
    },
    changePassword: {
      name: "Change password",
    },
    verifySmartContract: {
      name: "Audit contract",
    },

    paymentReport: {
      name: "dApp TXs",
    },
    reports: {
      import: "Import excels",
    },

    cardanos: {
      name: "Fetch cardano |||| Fetch cardano",
    },
    parseAddress: {
      name: "Parse address",
    },
    gits: {
      reportName: "Git commits",
      name: "Query github |||| Query github",
    },

    smartContracts: {
      name: "Contract list|||| Contract list",
    },
    contracts: {
      name: "Publish a contract |||| Publish a contract",
    },

    wallets: {
      name: "Select wallet |||| Select wallet",
    },
    withdraws: {
      name: "Withdraw |||| Withdraws",
    },
    postJobReports: {
      name: "Smart contract |||| Smart contracts",
    },
    walletReports: {
      name: "Wallet UTXO |||| Wallet UTXOs",
    },
    smartContractReports: {
      name: "Smart contract |||| Smart contracts",
    },
    settings: {
      name: "Setting |||| Settings",
      action: {
        accept: "Accept",
        reject: "Reject",
      },
    },
  },
};

export default customEnglishMessages;
