import { FC } from 'react';
import Title from './Title';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { purchasesPerMonth } from '../data/utils';
const data = purchasesPerMonth();
const Chart: FC = () => {    
    return (
    <>
        <Title>מכירות לפי חודש</Title>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ data }>
                <XAxis dataKey="name" interval="preserveStartEnd"/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" name="כמות מחירות" />
            </LineChart>
        </ResponsiveContainer>
    </>
  );
}

export default Chart;