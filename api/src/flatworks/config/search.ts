const empSearchConfig = () => {
  const baseUrl = process.env.EMP_SEARCH_BASE_URL;
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
  const baseUrl = process.env.JSK_SEARCH_BASE_URL;
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
const cmsSearchConfig = () => {
  const baseUrl = process.env.CMS_SEARCH_BASE_URL;
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

export { empSearchConfig, jskSearchConfig, cmsSearchConfig };
