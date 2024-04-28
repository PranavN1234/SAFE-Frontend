import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

function App() {
  return (
      <div style={{ margin: '20px' }}>
        <Title>Hello World</Title>
        <Button type="primary">Click Me</Button>
      </div>
  );
}

export default App;
