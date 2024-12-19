import { Button, Popover } from 'antd';
// import React, { useState } from 'react';
import {DeleteOutlined, EditOutlined, EllipsisOutlined  } from '@ant-design/icons';
import ButtonComponent from './ButtonComponent';

const HistoryItem = ({title,addressURL="#"}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const content = (
    <div >
      <ButtonComponent title="Đổi tên" iconButton={<EditOutlined />}/>
      <ButtonComponent title="Xóa" iconButton={<DeleteOutlined />}/>
    </div>
  );
  return (
    <li className="bg-white hover:bg-gray-100">
      <div className="flex justify-between items-center px-2">
        <a href={addressURL} className="hover:no-underline hover:text-inherit">{title}</a>
        <Popover 
          placement="leftBottom" 
          arrow={false} 
          content={content} 
          trigger="click"
        >
          <Button className="border-none bg-transparent hover:bg-transparent p-0 hover:text-inherit">
            <EllipsisOutlined />
          </Button>
        </Popover>
      </div>
    </li>

  );
};

export default HistoryItem;
