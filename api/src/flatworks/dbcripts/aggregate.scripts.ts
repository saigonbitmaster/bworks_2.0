const plutusDashboardScript = (fromDate: Date, toDate: Date) => {
  const script = [
    {
      $match: {
        $and: [
          { lockDate: { $gte: fromDate } },
          { lockDate: { $lte: toDate } },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        lockDate: 1,
        unlockDate: 1,
        amount: 1,
        isUnlocked: {
          $cond: {
            if: {
              $and: [
                '$unlockedTxHash',
                { $ne: ['$unlockedTxHash', ''] },
                { $ne: ['$unlockedTxHash', null] },
                { $ne: ['$unlockedTxHash', undefined] },
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },

    {
      $group: {
        _id: {
          $concat: [
            { $toString: { $month: '$lockDate' } },
            '-',
            { $toString: { $year: '$lockDate' } },
          ],
        },
        date: { $first: '$lockDate' },
        sumLockedAmounts: { $sum: '$amount' },
        numberOfLockTxs: { $sum: 1 },
        sumUnlockedAmounts: {
          $sum: {
            $cond: {
              if: '$isUnlocked',
              then: '$amount',
              else: 0,
            },
          },
        },
        numberOfUnlockedTxs: {
          $sum: {
            $cond: {
              if: '$isUnlocked',
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
  ];
  return script;
};

const jobDashboardScript = (fromDate: Date, toDate: Date) => {
  const script = [
    {
      $match: {
        $and: [
          { createdAt: { $gte: fromDate } },
          { createdAt: { $lte: toDate } },
        ],
      },
    },
    {
      $project: {
        idAsString: { $toString: '$_id' },
        _id: 1,
        createdAt: 1,
      },
    },
    {
      $lookup: {
        from: 'jobbids',
        localField: 'idAsString',
        foreignField: 'jobId',
        as: 'jobBids',
      },
    },
    {
      $unwind: { path: '$jobBids', preserveNullAndEmptyArrays: true },
    },
    {
      $group: {
        _id: '$_id',
        createdAt: { $first: '$createdAt' },

        numberOfBids: {
          $sum: {
            $cond: [{ $eq: [{ $type: '$jobBids' }, 'missing'] }, 0, 1],
          },
        },
        numberOfSelectedBids: {
          $sum: {
            $cond: {
              if: '$jobBids.isSelected',
              then: 1,
              else: 0,
            },
          },
        },
        totalBidsAmount: {
          $sum: '$jobBids.bidValue',
        },
        selectedBidsAmount: {
          $sum: {
            $cond: {
              if: '$jobBids.isSelected',
              then: '$jobBids.bidValue',
              else: 0,
            },
          },
        },
        numberOfCompletedJobs: {
          $sum: {
            $cond: {
              if: '$jobBids.isCompleted',
              then: 1,
              else: 0,
            },
          },
        },
        numberOfPaidJobs: {
          $sum: {
            $cond: {
              if: '$jobBids.isPaid',
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $group: {
        _id: {
          $concat: [
            { $toString: { $month: '$createdAt' } },
            '-',
            { $toString: { $year: '$createdAt' } },
          ],
        },
        date: { $first: '$createdAt' },
        numberOfPostedJobs: { $sum: 1 },
        numberOfBids: { $sum: '$numberOfBids' },
        sumBidsAmounts: { $sum: '$totalBidsAmount' },
        numberOfPaidJobs: { $sum: '$numberOfPaidJobs' },
        numberOfCompletedJobs: { $sum: '$numberOfCompletedJobs' },
        numberOfSelectedBids: { $sum: '$numberOfSelectedBids' },
      },
    },
  ];
  return script;
};

const plutusScript = (queryType, userId) => {
  const match =
    queryType === 'emp'
      ? { empId: userId }
      : queryType === 'jsk'
      ? { jskId: userId }
      : {};
  const script = [
    {
      $match: match,
    },
    {
      $project: {
        _id: 1,
        lockDate: 1,
        unlockDate: 1,
        amount: 1,
        isUnlocked: {
          $cond: {
            if: {
              $and: [
                '$unlockedTxHash',
                { $ne: ['$unlockedTxHash', ''] },
                { $ne: ['$unlockedTxHash', null] },
                { $ne: ['$unlockedTxHash', undefined] },
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },

    {
      $group: {
        _id: {
          $concat: [
            { $toString: { $month: '$lockDate' } },
            '-',
            { $toString: { $year: '$lockDate' } },
          ],
        },
        date: { $first: '$lockDate' },
        sumLockedAmounts: { $sum: '$amount' },
        numberOfLockTxs: { $sum: 1 },
        sumUnlockedAmounts: {
          $sum: {
            $cond: {
              if: '$isUnlocked',
              then: '$amount',
              else: 0,
            },
          },
        },
        numberOfUnlockedTxs: {
          $sum: {
            $cond: {
              if: '$isUnlocked',
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $group: {
        _id: 'plutusReports',
        sumLockedAmounts: { $sum: '$sumLockedAmounts' },
        numberOfLockTxs: { $sum: '$numberOfLockTxs' },
        sumUnlockedAmounts: { $sum: '$sumUnlockedAmounts' },
        numberOfUnlockedTxs: { $sum: '$numberOfUnlockedTxs' },
      },
    },
  ];
  return script;
};

const jobScript = (queryType, userId) => {
  const filter =
    queryType === 'emp'
      ? { $eq: ['$$jobBid.employerId', userId] }
      : queryType === 'jsk'
      ? { $eq: ['$$jobBid.jobSeekerId', userId] }
      : {};

  const preserveNullAndEmptyArrays =
    queryType === 'emp' ? false : queryType === 'jsk' ? false : true;
  const script = [
    {
      $project: {
        idAsString: { $toString: '$_id' },
        _id: 1,
        createdAt: 1,
      },
    },
    {
      $lookup: {
        from: 'jobbids',
        localField: 'idAsString',
        foreignField: 'jobId',
        as: 'jobBids',
      },
    },
    {
      $project: {
        idAsString: 1,
        _id: 1,
        createdAt: 1,
        jobBids: {
          $filter: {
            input: '$jobBids',
            as: 'jobBid',
            cond: filter,
          },
        },
      },
    },
    {
      $unwind: {
        path: '$jobBids',
        preserveNullAndEmptyArrays: preserveNullAndEmptyArrays,
      },
    },
    {
      $group: {
        _id: '$_id',
        createdAt: { $first: '$createdAt' },

        numberOfBids: {
          $sum: {
            $cond: [{ $eq: [{ $type: '$jobBids' }, 'missing'] }, 0, 1],
          },
        },
        numberOfSelectedBids: {
          $sum: {
            $cond: {
              if: '$jobBids.isSelected',
              then: 1,
              else: 0,
            },
          },
        },
        totalBidsAmount: {
          $sum: '$jobBids.bidValue',
        },
        selectedBidsAmount: {
          $sum: {
            $cond: {
              if: '$jobBids.isSelected',
              then: '$jobBids.bidValue',
              else: 0,
            },
          },
        },
        numberOfCompletedJobs: {
          $sum: {
            $cond: {
              if: '$jobBids.isCompleted',
              then: 1,
              else: 0,
            },
          },
        },
        numberOfPaidJobs: {
          $sum: {
            $cond: {
              if: '$jobBids.isPaid',
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $group: {
        _id: {
          $concat: [
            { $toString: { $month: '$createdAt' } },
            '-',
            { $toString: { $year: '$createdAt' } },
          ],
        },
        date: { $first: '$createdAt' },
        numberOfPostedJobs: { $sum: 1 },
        numberOfBids: { $sum: '$numberOfBids' },
        sumBidsAmounts: { $sum: '$totalBidsAmount' },
        numberOfPaidJobs: { $sum: '$numberOfPaidJobs' },
        numberOfCompletedJobs: { $sum: '$numberOfPaidJobs' },
        numberOfSelectedBids: { $sum: '$numberOfSelectedBids' },
      },
    },
    //sum all records to return single document
    {
      $group: {
        _id: 'jobReport',
        numberOfPostedJobs: { $sum: '$numberOfPostedJobs' },
        numberOfBids: { $sum: '$numberOfBids' },
        sumBidsAmounts: { $sum: '$sumBidsAmounts' },
        numberOfPaidJobs: { $sum: '$numberOfPaidJobs' },
        numberOfCompletedJobs: { $sum: '$numberOfPaidJobs' },
        numberOfSelectedBids: { $sum: '$numberOfSelectedBids' },
      },
    },
  ];
  return script;
};

//get last year posted jobs
const jobMonthlyScript = (queryType, userId, fromDate, toDate) => {
  const filter =
    queryType === 'emp'
      ? { $eq: ['$$jobBid.employerId', userId] }
      : queryType === 'jsk'
      ? { $eq: ['$$jobBid.jobSeekerId', userId] }
      : {};

  const preserveNullAndEmptyArrays =
    queryType === 'emp' ? true : queryType === 'jsk' ? false : true;

  const employerFilter = queryType === 'emp' ? { employerId: userId } : {};

  const script = [
    {
      $match: {
        $and: [
          { createdAt: { $gte: fromDate } },
          { createdAt: { $lte: toDate } },
          employerFilter,
        ],
      },
    },
    {
      $project: {
        idAsString: { $toString: '$_id' },
        _id: 1,
        createdAt: 1,
      },
    },
    {
      $lookup: {
        from: 'jobbids',
        localField: 'idAsString',
        foreignField: 'jobId',
        as: 'jobBids',
      },
    },
    {
      $project: {
        idAsString: 1,
        _id: 1,
        createdAt: 1,
        jobBids: {
          $filter: {
            input: '$jobBids',
            as: 'jobBid',
            cond: filter,
          },
        },
      },
    },
    {
      $unwind: {
        path: '$jobBids',
        preserveNullAndEmptyArrays: preserveNullAndEmptyArrays,
      },
    },
    {
      $group: {
        _id: '$_id',
        createdAt: { $first: '$createdAt' },

        numberOfBids: {
          $sum: {
            $cond: [{ $eq: [{ $type: '$jobBids' }, 'missing'] }, 0, 1],
          },
        },
        numberOfSelectedBids: {
          $sum: {
            $cond: {
              if: '$jobBids.isSelected',
              then: 1,
              else: 0,
            },
          },
        },
        totalBidsAmount: {
          $sum: '$jobBids.bidValue',
        },
        selectedBidsAmount: {
          $sum: {
            $cond: {
              if: '$jobBids.isSelected',
              then: '$jobBids.bidValue',
              else: 0,
            },
          },
        },
        numberOfCompletedJobs: {
          $sum: {
            $cond: {
              if: '$jobBids.isCompleted',
              then: 1,
              else: 0,
            },
          },
        },
        numberOfPaidJobs: {
          $sum: {
            $cond: {
              if: '$jobBids.isPaid',
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $group: {
        _id: {
          $concat: [
            { $toString: { $month: '$createdAt' } },
            '-',
            { $toString: { $year: '$createdAt' } },
          ],
        },
        date: { $first: '$createdAt' },
        numberOfPostedJobs: { $sum: 1 },
        numberOfBids: { $sum: '$numberOfBids' },
        sumBidsAmounts: { $sum: '$totalBidsAmount' },
        numberOfPaidJobs: { $sum: '$numberOfPaidJobs' },
        numberOfCompletedJobs: { $sum: '$numberOfPaidJobs' },
        numberOfSelectedBids: { $sum: '$numberOfSelectedBids' },
      },
    },
  ];
  return script;
};

const plutusMonthlyScript = (queryType, userId, fromDate, toDate) => {
  const match =
    queryType === 'emp'
      ? {
          empId: userId,
          $and: [
            { lockDate: { $gte: fromDate } },
            { lockDate: { $lte: toDate } },
          ],
        }
      : queryType === 'jsk'
      ? {
          jskId: userId,
          $and: [
            { lockDate: { $gte: fromDate } },
            { lockDate: { $lte: toDate } },
          ],
        }
      : {
          $and: [
            { lockDate: { $gte: fromDate } },
            { lockDate: { $lte: toDate } },
          ],
        };

  const script = [
    {
      $match: match,
    },
    {
      $project: {
        _id: 1,
        lockDate: 1,
        unlockDate: 1,
        amount: 1,
        isUnlocked: {
          $cond: {
            if: {
              $and: [
                '$unlockedTxHash',
                { $ne: ['$unlockedTxHash', ''] },
                { $ne: ['$unlockedTxHash', null] },
                { $ne: ['$unlockedTxHash', undefined] },
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },

    {
      $group: {
        _id: {
          $concat: [
            { $toString: { $month: '$lockDate' } },
            '-',
            { $toString: { $year: '$lockDate' } },
          ],
        },
        date: { $first: '$lockDate' },
        sumLockedAmounts: { $sum: '$amount' },
        numberOfLockTxs: { $sum: 1 },
        sumUnlockedAmounts: {
          $sum: {
            $cond: {
              if: '$isUnlocked',
              then: '$amount',
              else: 0,
            },
          },
        },
        numberOfUnlockedTxs: {
          $sum: {
            $cond: {
              if: '$isUnlocked',
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
  ];
  return script;
};

export {
  plutusDashboardScript,
  jobDashboardScript,
  jobScript,
  plutusScript,
  jobMonthlyScript,
  plutusMonthlyScript,
};
