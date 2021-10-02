import React, { useEffect } from 'react';
import { Form, Select } from 'antd';
import data from '../data.js';

const { Option } = Select;

const ObjectForm = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Form.Item
        required
        label="目标类型"
        name="object_type"
        rules={[{ required: true, message: '请选择目标类型' }]}
        extra="选择匹配文档图像上的目标"
      >
        <Select>
          {data.ObjectTypes.map((val) => {
            return (
              <Option value={val.key} key={val.key}>
                {val.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );
};

export default ObjectForm;
