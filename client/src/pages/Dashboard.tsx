import { Col, Row } from 'antd';
import MonthlyChart from '../components/Charts/MonthlyChart';
import Loader from '../components/Loader';
import { useCountProductsQuery } from '../redux/features/management/productApi';
import { useYearlySaleQuery } from '../redux/features/management/saleApi';
import DailyChart from '../components/Charts/DailyChart';

const Dashboard = () => {
  const { data: products, isLoading } = useCountProductsQuery(undefined);
  const { data: yearlyData, isLoading: isLoading1 } = useYearlySaleQuery(undefined);

  if (isLoading && isLoading1) return <Loader />;
  else
    return (
      <>
        <Row gutter={16} style={{ paddingRight: '1rem', marginBottom: '1rem' }}>
          <Col xs={24} lg={8}>
            <div
              style={{
                background: '#1f77b4',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <h3>Total Stock</h3>
              <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{products?.data?.totalQuantity || 0}</h1>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div
              style={{
                background: '#ff7f0e',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <h3>Total Item Sell</h3>
              <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                {yearlyData?.data.reduce(
                  (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
                  0
                )}
              </h1>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div
              style={{
                background: '#2ca02c',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <h3>Total Revenue</h3>
              <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                $
                {yearlyData?.data.reduce(
                  (acc: number, cur: { totalRevenue: number }) => (acc += cur.totalRevenue),
                  0
                )}
              </h1>
            </div>
          </Col>
        </Row>
        <div
          style={{
            border: '1px solid #ddd',
            margin: '1rem',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            backgroundColor: '#fff',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '.5rem', fontWeight: 'bold' }}>Daily Sale and Revenue</h1>
          <DailyChart />
        </div>
        <div
          style={{
            border: '1px solid #ddd',
            margin: '1rem',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            backgroundColor: '#fff',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '.5rem', fontWeight: 'bold' }}>Monthly Revenue</h1>
          <MonthlyChart />
        </div>
      </>
    );
};

export default Dashboard;
