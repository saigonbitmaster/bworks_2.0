import { MongooseQuery, RaList } from '../types/types';
/*
#queryTransform => Convert REST query to MONGOOSE query:
from: http://localhost:3000/postjobs?filter={}&range=[0,24]&sort=["date","desc"]
to:    {
      filter: { employerId: '634ad27f251be52f6e7fcefb' },
      sort: { date: -1 },
      skip: 0,
      limit: 25
    }

#formatRaList => Format LIST data to send to client that match RA LIST:
  header Content-Range:
  {  'Content-Range': result.count,
    'Access-Control-Expose-Headers': 'Content-Range'};
  data: [{_id: '', field: ''}]

fullText search: filter: { textSearch: 'text' } -> filter: $text: { $search: 'text' }

*/

const queryTransform = (query): MongooseQuery => {
  const sort = {};
  const select = {};
  query.sort
    ? (sort[JSON.parse(query.sort)[0]] =
        JSON.parse(query.sort)[1] === 'ASC' ? 1 : -1)
    : null;
  const range = query.range ? JSON.parse(query.range) : [0, 10];
  const [rangeStart, rangeEnd] = [...range];
  const limit = rangeEnd - rangeStart + 1;
  const skip = rangeStart;
  const filter = query.filter ? JSON.parse(query.filter) : {};
  //need to add text search for reference collections
  filter.textSearch ? (filter.$text = { $search: filter.textSearch }) : null;
  return { filter, sort, skip, limit, select };
};

const formatRaList = (res, result: RaList) => {
  return res
    .set({
      'Content-Range': result.count,
      'Access-Control-Expose-Headers': 'Content-Range',
    })
    .json(result.data);
};

export { queryTransform, formatRaList };
