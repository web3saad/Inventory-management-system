import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useState } from 'react';
import toastMessage from '../lib/toastMessage';
import { useGetAllBrandsQuery } from '../redux/features/management/brandApi';
import { useGetAllCategoriesQuery } from '../redux/features/management/categoryApi';
import { useCreateNewProductMutation } from '../redux/features/management/productApi';
import { useGetAllSellerQuery } from '../redux/features/management/sellerApi';
import { ICategory } from '../types/product.types';
import CreateSeller from '../components/product/CreateSeller';
import CreateCategory from '../components/product/CreateCategory';
import CreateBrand from '../components/product/CreateBrand';

const { Title } = Typography;
const { Option } = Select;

const CreateProduct = () => {
  const [createNewProduct] = useCreateNewProductMutation();
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: sellers } = useGetAllSellerQuery(undefined);
  const { data: brands } = useGetAllBrandsQuery(undefined);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FieldValues) => {
    setLoading(true);
    const payload = { ...values };
    payload.price = Number(values.price);
    payload.stock = Number(values.stock);

    if (payload.size === '') {
      delete payload.size;
    }

    try {
      const res = await createNewProduct(payload).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        form.resetFields();
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gutter={24} style={{ height: 'calc(100vh - 6rem)', overflowY: 'auto', padding: '1rem' }}>
      <Col xs={24} lg={14}>
        <div
          style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            Add New Product
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ flex: 1 }}
            scrollToFirstError
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the product name' }]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: 'Please enter the price' },
                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Enter a valid price' },
              ]}
            >
              <Input type="number" placeholder="Price" min={0} step={0.01} />
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[
                { required: true, message: 'Please enter the stock quantity' },
                { pattern: /^\d+$/, message: 'Enter a valid stock number' },
              ]}
            >
              <Input type="number" placeholder="Stock" min={0} />
            </Form.Item>

            <Form.Item
              label="Seller"
              name="seller"
              rules={[{ required: true, message: 'Please select a seller' }]}
            >
              <Select placeholder="Select Seller">
                {sellers?.data.map((item: ICategory) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Select Category">
                {categories?.data.map((item: ICategory) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand"
            >
              <Select placeholder="Select Brand" allowClear>
                {brands?.data.map((item: ICategory) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea rows={4} placeholder="Description" />
            </Form.Item>

            <Form.Item
              label="Size"
              name="size"
            >
              <Select placeholder="Select Size" allowClear>
                <Option value="SMALL">Small</Option>
                <Option value="MEDIUM">Medium</Option>
                <Option value="LARGE">Large</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
              >
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col xs={24} lg={10}>
        <div
          style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <CreateSeller />
          <CreateCategory />
          <CreateBrand />
        </div>
      </Col>
    </Row>
  );
};

export default CreateProduct;
