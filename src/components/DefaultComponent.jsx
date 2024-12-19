import React from 'react';
import { Row, Col } from 'antd'; // Giả sử bạn đang dùng Ant Design.
import SideBarComponent from './SideBarComponent';

const DefaultComponent = ({ children }) => {
  return (
    <Row style={{ height: '100vh', overflow: 'hidden', width:"1000px" }}>
      <Col
        span={5}
        style={{
          height: '100%',
          overflowY: 'auto', // Cuộn độc lập cho Sidebar
        }}
      >
        <SideBarComponent />
      </Col>

      <Col
        span={18}
        style={{
          height: '100%',
          overflowY: 'auto', // Cuộn độc lập cho phần nội dung chính
          padding: '16px',
        }}
      >
        {children}
      </Col>
    </Row>
  );
};

export default DefaultComponent;
