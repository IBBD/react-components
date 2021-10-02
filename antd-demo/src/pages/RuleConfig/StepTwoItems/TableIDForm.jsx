import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';

const TableIDForm = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Form.Item label="行ID" name="row_id" extra="行ID用来定义匹配第几行的单元格内容">
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="列ID" name="column_id" extra="列ID用来定义匹配第几列的单元格内容">
        <InputNumber min={0} />
      </Form.Item>
    </>
  );
};

export default TableIDForm;
