import { Flex } from 'antd';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDailySaleQuery } from '../../redux/features/management/saleApi';
import Loader from '../Loader';
import { months } from '../../utils/generateDate';

export default function DailyChart() {
  const { data: dailyData, isLoading } = useDailySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = dailyData?.data.map(
    (item: {
      day: number;
      month: number;
      year: number;
      totalRevenue: number;
      totalQuantity: number;
    }) => ({
      name: `${item.day} ${months[item.month - 1]}, ${item.year}`,
      revenue: item.totalRevenue,
      quantity: item.totalQuantity,
    })
  );

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='revenue' stroke='#1f77b4' fill='url(#colorRevenue)' />
        <Area type='monotone' dataKey='quantity' stroke='#ff7f0e' fill='url(#colorQuantity)' />
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1f77b4" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#1f77b4" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff7f0e" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ff7f0e" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
}
