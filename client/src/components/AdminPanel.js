import React from 'react';
import { Layout, Typography } from 'antd';
const { Content } = Layout;
const { Title } = Typography;

const AdminPanel = () => (
  <Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
      <Title level={2}>Admin Panel</Title>
      <div className="site-layout-content">Admin Functions Here</div>
    </Content>
  </Layout>
);

export default AdminPanel;
