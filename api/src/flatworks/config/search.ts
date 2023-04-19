const empSearchConfig = {
  baseUrl: 'http://localhost:3002/#',
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

const jskSearchConfig = {
  baseUrl: 'http://localhost:3003/#',
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

const cmsSearchConfig = {
  baseUrl: 'http://localhost:3001/#',
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

export { empSearchConfig, jskSearchConfig, cmsSearchConfig };
