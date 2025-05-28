
import { EditFilled, EditOutlined } from '@ant-design/icons';
import { Button, Typography, Avatar, Card, Space } from 'antd';
import userProPic from '../assets/User.png';
import Loader from '../components/Loader';
import { useGetSelfProfileQuery } from '../redux/features/authApi';
import { profileKeys } from '../constant/profile';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  if (isLoading) return <Loader />;

  return (
    <div style={{ minHeight: 'calc(100vh - 10rem)', padding: '2rem', backgroundColor: '#f0f2f5' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }} align="center">
          <Avatar
            size={150}
            src={data?.data?.avatar || userProPic}
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', transition: 'transform 0.3s' }}
          />
          <Space size="middle">
            <Link to="/edit-profile">
              <Button type="primary" icon={<EditOutlined />} size="large" style={{ fontWeight: 'bold' }}>
                Edit Profile
              </Button>
            </Link>
            <Link to="/change-password">
              <Button type="primary" icon={<EditFilled />} size="large" style={{ fontWeight: 'bold' }}>
                Change Password
              </Button>
            </Link>
          </Space>
          <Card
            style={{ width: '100%', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            bodyStyle={{ padding: '2rem' }}
          >
            <Title level={3} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              Profile Information
            </Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {profileKeys.map(({ keyName }) => (
                <ProfileInfoItem
                  key={keyName}
                  label={keyName}
                  value={data?.data[keyName]}
                  isEditing={editingKey === keyName}
                  onEdit={() => setEditingKey(keyName)}
                  onCancel={() => setEditingKey(null)}
                  onSave={() => {
                    // Implement save logic here or open modal for editing
                    setEditingKey(null);
                  }}
                />
              ))}
            </Space>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default ProfilePage;

import { Input, Space as AntSpace } from 'antd';

interface ProfileInfoItemProps {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const ProfileInfoItem = ({ label, value, isEditing, onEdit, onCancel, onSave }: ProfileInfoItemProps) => {
  const [editValue, setEditValue] = React.useState(value);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text strong style={{ flex: 1, textTransform: 'capitalize' }}>
        {label}
      </Text>
      {isEditing ? (
        <AntSpace>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={() => onSave()}>
            Save
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </AntSpace>
      ) : (
        <Space style={{ flex: 2, justifyContent: 'flex-end' }}>
          <Text>{value}</Text>
          <Button type="link" onClick={onEdit}>
            Edit
          </Button>
        </Space>
      )}
    </div>
  );
};
