import { SkillService } from '../skill/service';
import { PostJobService } from '../postjob/service';
import { JobBidService } from '../jobbid/service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  empSearchConfig,
  jskSearchConfig,
  cmsSearchConfig,
} from '../flatworks/config/search';

@Injectable()
export class SearchService {
  constructor(
    private readonly postJobService: PostJobService,
    private readonly jobBidService: JobBidService,
    private readonly skillService: SkillService,
  ) {}

  async findAllEmp(filter): Promise<any> {
    const config = empSearchConfig;

    const text = filter.text;
    let _limit = filter.limit;
    let _skip = filter.skip;

    const _searchCols = await Promise.all(
      config.priority.map(async (item, index) => {
        const _ = await this[item.serviceName].findAll({
          filter: {
            $text: {
              $search: text,
            },
          },
        });
        const totalRecords = _.count;
        return { ...item, totalRecords: totalRecords };
      }),
    );

    const searchCols = _searchCols.map((item, index) => {
      _limit == 0
        ? null
        : item.totalRecords - _skip > _limit
        ? ((item.limit = _limit), (_limit = 0), (item.skip = _skip))
        : item.totalRecords < _skip
        ? ((item.skip = item.totalRecords),
          (item.limit = 0),
          (_limit = _limit),
          (_skip = _skip - item.totalRecords))
        : ((item.skip = _skip),
          (item.limit = item.totalRecords - _skip),
          (_limit = _limit - (item.totalRecords - _skip)),
          (_skip = 0));

      return item;
    });

    const results = await Promise.all(
      searchCols.map(async (item, index) => {
        let result;
        const query = {
          filter: {
            $text: {
              $search: text,
            },
          },
          sort: {},
          skip: item.skip,
          limit: item.limit,
        };

        try {
          result = await this[item.serviceName].findAll(query);
        } catch (error) {
          console.log(error);
        }

        return {
          count: result.count,
          data: result.data.map((record) => ({
            ...record._doc,
            collectionName: item.collection,
          })),
        };
      }),
    );
    let data = [];
    let count = 0;

    results.forEach((item) => {
      const _data = item.data.map((item) => ({
        text: item.name || item.username || item.title,
        link: `${config.baseUrl}/${item.collectionName}/${item._id}/show`,
        _id: item._id,
      }));
      data = [...data, ..._data];
      count = (count + item.count) as number;
    });

    return {
      data,
      count,
    };
  }

  async findAllJsk(filter): Promise<any> {
    const config = jskSearchConfig;
    const text = filter.text;
    let _limit = filter.limit;
    let _skip = filter.skip;

    const _searchCols = await Promise.all(
      config.priority.map(async (item, index) => {
        const _ = await this[item.serviceName].findAll({
          filter: {
            $text: {
              $search: text,
            },
          },
        });
        const totalRecords = _.count;
        return { ...item, totalRecords: totalRecords };
      }),
    );

    const searchCols = _searchCols.map((item, index) => {
      _limit == 0
        ? null
        : item.totalRecords - _skip > _limit
        ? ((item.limit = _limit), (_limit = 0), (item.skip = _skip))
        : item.totalRecords < _skip
        ? ((item.skip = item.totalRecords),
          (item.limit = 0),
          (_limit = _limit),
          (_skip = _skip - item.totalRecords))
        : ((item.skip = _skip),
          (item.limit = item.totalRecords - _skip),
          (_limit = _limit - (item.totalRecords - _skip)),
          (_skip = 0));

      return item;
    });

    const results = await Promise.all(
      searchCols.map(async (item, index) => {
        let result;
        const query = {
          filter: {
            $text: {
              $search: text,
            },
          },
          sort: {},
          skip: item.skip,
          limit: item.limit,
        };

        try {
          result = await this[item.serviceName].findAll(query);
        } catch (error) {
          console.log(error);
        }

        return {
          count: result.count,
          data: result.data.map((record) => ({
            ...record._doc,
            collectionName: item.collection,
          })),
        };
      }),
    );
    let data = [];
    let count = 0;

    results.forEach((item) => {
      const _data = item.data.map((item) => ({
        text: item.name || item.username || item.title,
        link: `${config.baseUrl}/${item.collectionName}/${item._id}/show`,
        _id: item._id,
      }));
      data = [...data, ..._data];
      count = (count + item.count) as number;
    });

    return {
      data,
      count,
    };
  }

  async findAllCms(filter): Promise<any> {
    const config = cmsSearchConfig;
    const text = filter.text;
    let _limit = filter.limit;
    let _skip = filter.skip;

    const _searchCols = await Promise.all(
      config.priority.map(async (item, index) => {
        const _ = await this[item.serviceName].findAll({
          filter: {
            $text: {
              $search: text,
            },
          },
        });
        const totalRecords = _.count;
        return { ...item, totalRecords: totalRecords };
      }),
    );

    const searchCols = _searchCols.map((item, index) => {
      _limit == 0
        ? null
        : item.totalRecords - _skip > _limit
        ? ((item.limit = _limit), (_limit = 0), (item.skip = _skip))
        : item.totalRecords < _skip
        ? ((item.skip = item.totalRecords),
          (item.limit = 0),
          (_limit = _limit),
          (_skip = _skip - item.totalRecords))
        : ((item.skip = _skip),
          (item.limit = item.totalRecords - _skip),
          (_limit = _limit - (item.totalRecords - _skip)),
          (_skip = 0));

      return item;
    });

    const results = await Promise.all(
      searchCols.map(async (item, index) => {
        let result;
        const query = {
          filter: {
            $text: {
              $search: text,
            },
          },
          sort: {},
          skip: item.skip,
          limit: item.limit,
        };

        try {
          result = await this[item.serviceName].findAll(query);
        } catch (error) {
          console.log(error);
        }

        return {
          count: result.count,
          data: result.data.map((record) => ({
            ...record._doc,
            collectionName: item.collection,
          })),
        };
      }),
    );
    let data = [];
    let count = 0;

    results.forEach((item) => {
      const _data = item.data.map((item) => ({
        text: item.name || item.username || item.title,
        link: `${config.baseUrl}/${item.collectionName}/${item._id}/show`,
        _id: item._id,
      }));
      data = [...data, ..._data];
      count = (count + item.count) as number;
    });

    return {
      data,
      count,
    };
  }
}
