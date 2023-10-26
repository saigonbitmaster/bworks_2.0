import { Response } from 'express';
import { EventHeader, EventType } from '../types/types';

export const esWriteHeader = (res: Response) => {
  return res.writeHead(200, EventHeader);
};

export const esWriteData = (res: Response, type: EventType, data: any) => {
  const userData = JSON.stringify(data);
  if (!res || !data) {
    return null;
  }
  return res.write(`event: ${type}\ndata: ${userData} \n\n`);
};
