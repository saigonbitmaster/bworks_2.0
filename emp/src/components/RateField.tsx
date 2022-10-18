import * as React from 'react';
import get from 'lodash/get';
import { useRecordContext } from 'react-admin';

const TextField = ({ source }) => {
    const record = useRecordContext();

    return record ? <span>{get(record, source)}</span> : null;
}

export default TextField;