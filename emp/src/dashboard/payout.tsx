import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';

import CardWithIcon from './cardWithIcon';

interface Props {
    value?: number;
}

const MonthlyPayout = (props: Props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/plutustxs"
            icon={DollarIcon}
            title="Paid by plutus"
            subtitle={`1000 jobs, ${value} Ada`}
        />
    );
};

export default MonthlyPayout;
