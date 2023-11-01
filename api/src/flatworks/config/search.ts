const empSearchConfig = () => {
  const baseUrl = process.env.APP_BASE_URL;
  return {
    baseUrl,
    priority: [
      {
        priority: 1,
        collection: 'postjobs',
        serviceName: 'postJobService',
        totalRecords: 0,
        limit: 0,
        skip: 0,
      },
      {
        priority: 2,
        collection: 'jobbids',
        serviceName: 'jobBidService',
        totalRecords: 0,
        limit: 0,
        skip: 0,
      },
      {
        priority: 3,
        collection: 'skills',
        serviceName: 'skillService',
        totalRecords: 0,
        limit: 0,
        skip: 0,
      },
    ],
  };
};

const jskSearchConfig = () => {
  const baseUrl = process.env.APP_BASE_URL;
  return {
    baseUrl,
    priority: [
      {
        priority: 1,
        collection: 'postjobs',
        serviceName: 'postJobService',
        totalRecords: 0,
        limit: 0,
        skip: 0,
      },
      {
        priority: 2,
        collection: 'jobbids',
        serviceName: 'jobBidService',
        totalRecords: 0,
        limit: 0,
        skip: 0,
      },
      {
        priority: 3,
        collection: 'skills',
        serviceName: 'skillService',
        totalRecords: 0,
        limit: 0,
        skip: 0,
      },
    ],
  };
};

const cmsSearchConfig = () => [
  {
    subUrl: 'postjobs',
    serviceName: 'postJobService',
    text: 'Found posted jobs',
  },

  {
    subUrl: 'jobbids',
    serviceName: 'jobBidService',
    text: 'Found applications',
  },

  {
    subUrl: 'users',
    serviceName: 'userService',
    text: 'Found users',
  },
  {
    subUrl: 'skills',
    serviceName: 'skillService',
    text: 'Found work skills',
  },
  {
    subUrl: 'plutustxs',
    serviceName: 'plutusTxService',
    text: 'Found plutus payment transactions',
  },
];

const appSearchConfig = (userId) => {
  return [
    {
      subUrl: 'postjobs',
      serviceName: 'postJobService',
      text: 'Found jobs you posted',
      filter: {
        employerId: userId,
      },
    },
    {
      subUrl: 'postjobsjsk',
      serviceName: 'postJobService',
      text: 'Found posted jobs',
      filter: {},
    },
    {
      subUrl: 'jobbids',
      serviceName: 'jobBidService',
      text: 'Found applied to your jobs',
      filter: {
        employerId: userId,
      },
    },
    {
      subUrl: 'jobbidsjsk',
      serviceName: 'jobBidService',
      text: 'Found job applications',
      filter: {
        jobSeekerId: userId,
      },
    },
    {
      subUrl: 'users',
      serviceName: 'userService',
      text: 'Found users',
    },
    {
      subUrl: 'skills',
      serviceName: 'skillService',
      text: 'Found work skills',
    },
    {
      subUrl: 'plutustxs',
      serviceName: 'plutusTxService',
      text: 'Found payment transactions',
      filter: {
        $or: [{ jskId: userId }, { empId: userId }, { unlockUserId: userId }],
      },
    },
  ];
};

export { empSearchConfig, jskSearchConfig, cmsSearchConfig, appSearchConfig };
