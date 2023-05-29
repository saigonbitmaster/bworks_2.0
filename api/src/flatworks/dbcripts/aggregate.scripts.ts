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
          month: { $month: '$lockDate' },
          year: { $year: '$lockDate' },
        },
        lockDate: { $first: '$lockDate' },
        lockedAmount: { $sum: '$amount' },
        lockTxs: { $sum: 1 },
        unlockedAmount: {
          $sum: {
            $cond: {
              if: '$isUnlocked',
              then: '$amount',
              else: 0,
            },
          },
        },
        unlockedTxs: {
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
        numberOfBids: { $sum: 1 },
        numberOfSelectedBids: {
          $sum: {
            $cond: {
              if: '$jobBids.isSelected',
              then: 1,
              else: 0,
            },
          },
        },
        totaldBidsAmount: {
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
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        createdAt: { $first: '$createdAt' },
        postedJobs: { $sum: 1 },
        Bids: { $sum: '$numberOfBids' },
        totalBidsAmount: { $sum: '$totaldBidsAmount' },
        numberOfPaidJobs: { $sum: '$numberOfPaidJobs' },
        numberOfCompletedJobs: { $sum: '$numberOfPaidJobs' },
      },
    },
  ];
  return script;
};

export { plutusDashboardScript, jobDashboardScript };