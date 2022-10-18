import { MongooseQuery, RaList } from '../types/types';
declare const queryTransform: (query: any) => MongooseQuery;
declare const formatRaList: (res: any, result: RaList) => any;
export { queryTransform, formatRaList };
