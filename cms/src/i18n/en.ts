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
      monthly_revenue: "Monthly Revenue",
      month_history: "30 Day Revenue History",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      all_reviews: "See all reviews",
      new_customers: "New Customers",
      all_customers: "See all customers",
      pending_orders: "Pending Orders",
      allPostedJobs: "See all Jobs",
      allPlutusTxs: "See all plutus TXs",
      order: {
        items:
          "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items",
      },
      welcome: {
        title: "Welcome to the catalyst funded project reports",
        subtitle: "subtitle.",
        ra_button: "cReport site",
        demo_button: "Source for this demo",
      },
    },
    menu: {
      manageJobs: "Manage jobs",
      reports: "Reports",
      manageFund: "Cardano",
      tools: "Tools",
      settings: "Settings",
    },
  },
  resources: {
    changePassword: {
      name: "Change password",
    },
    paymentReport: {
      name: "Payment",
    },
    skills: {
      name: "Job skills",
    },
    reports: {
      import: "Import excels",
    },
    jobtasks: {
      name: "Job task |||| Job tasks",

      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    smartContracts: {
      name: "Smart contracts",
    },
    parseAddress: {
      name: "Parse address",
    },
    jobQueues: {
      name: "Job queue, |||| Job queues",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    cardanos: {
      name: "Fetch Cardano |||| Fetch Cardano",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    gits: {
      reportName: "Git commits",
      name: "Query github |||| Query github",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    proposals: {
      name: "Proposal |||| Proposals",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    postJobs: {
      name: "Post Job |||| Post jobs",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    jobBids: {
      name: "Job bid |||| Job bids",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    contractedJobs: {
      name: "Contracted job |||| Contracted jobs",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    wallets: {
      name: "Admin wallet |||| Admin wallets",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    plutusTxs: {
      name: "Plutus TXs |||| Plutus TXs",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    postJobReports: {
      name: "Posted job |||| Posted jobs",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    walletReports: {
      name: "Wallet UTXO |||| Wallet UTXOs",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    smartContractReports: {
      name: "Smart contract |||| Smart contracts",
      fields: {
        commands: "Orders",
        first_seen: "First seen",
        groups: "Segments",
        last_seen: "Last seen",
        last_seen_gte: "Visited Since",
        name: "Name",
        total_spent: "Total spent",
        password: "Password",
        confirm_password: "Confirm password",
        stateAbbr: "State",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
        this_week: "This week",
        last_week: "Last week",
        this_month: "This month",
        last_month: "Last month",
        earlier: "Earlier",
        has_ordered: "Has ordered",
        has_newsletter: "Has newsletter",
        group: "Segment",
      },
      fieldGroups: {
        identity: "Identity",
        address: "Address",
        stats: "Stats",
        history: "History",
        password: "Password",
        change_password: "Change Password",
      },
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },

    settings: {
      name: "Setting |||| Settings",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating",
      },
      action: {
        accept: "Accept",
        reject: "Reject",
      },
    },
  },
};

export default customEnglishMessages;
