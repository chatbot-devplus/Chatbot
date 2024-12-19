import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({title,iconButton }) => {
  return (
    <div>
        <Button className='border-none' icon={iconButton}>
       {title}
      </Button>
    </div>
  )
}

export default ButtonComponent