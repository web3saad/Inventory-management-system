import { Card, Tabs } from 'antd';
import HistoryTable from '../components/tables/HistoryTable';
import {
  useDailySaleQuery,
  useMonthlySaleQuery,
  useWeeklySaleQuery,
  useYearlySaleQuery,
} from '../redux/features/management/saleApi';

const { TabPane } = Tabs;

const SaleHistoryPage = () => {
  const { data: yearlyData, isFetching: isYearlyDataFetching } = useYearlySaleQuery(undefined);
  const { data: monthlyData, isFetching: isMonthlyDataFetching } = useMonthlySaleQuery(undefined);
  const { data: dailySale, isFetching: isDailySaleFetching } = useDailySaleQuery(undefined);
  const { data: weeklySale, isFetching: isWeeklySaleFetching } = useWeeklySaleQuery(undefined);

  return (
    <Tabs defaultActiveKey="yearly" style={{ padding: '1rem' }}>
      <TabPane tab="Yearly Sale" key="yearly">
        <Card>
          <HistoryTable data={yearlyData} isFetching={isYearlyDataFetching} />
        </Card>
      </TabPane>
      <TabPane tab="Monthly Sale" key="monthly">
        <Card>
          <HistoryTable data={monthlyData} isFetching={isMonthlyDataFetching} />
        </Card>
      </TabPane>
      <TabPane tab="Weekly Sale" key="weekly">
        <Card>
          <HistoryTable data={weeklySale} isFetching={isWeeklySaleFetching} />
        </Card>
      </TabPane>
      <TabPane tab="Daily Sale" key="daily">
        <Card>
          <HistoryTable data={dailySale} isFetching={isDailySaleFetching} />
        </Card>
      </TabPane>
    </Tabs>
  );
};

export default SaleHistoryPage;
