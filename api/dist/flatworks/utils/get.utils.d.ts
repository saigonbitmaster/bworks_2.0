import { mongooseQuery, raList } from '../types';
declare const queryTransform: (query: any) => mongooseQuery;
declare const formatRaList: (res: any, result: raList) => any;
export { queryTransform, formatRaList };
