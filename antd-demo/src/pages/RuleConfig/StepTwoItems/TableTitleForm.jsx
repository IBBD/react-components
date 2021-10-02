import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

const TableTitleForm = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Form.Item
        label="行关键词"
        name="row_cell_keywords"
        extra="行关键词用来是指表格第一列单元格的文本"
      >
        <Select
          mode="tags"
          allowClear
          placeholder="请输入关键字，点击Enter键区分关键字"
          tokenSeparators={[',']}
        >
          {props.rowKeywords ? props.rowKeywords : []}
        </Select>
      </Form.Item>

      <Form.Item
        label="列关键词"
        name="column_cell_keywords"
        extra="列关键词用来是指表格第一行单元格的文本"
      >
        <Select
          mode="tags"
          allowClear
          placeholder="请输入关键字，点击Enter键区分关键字"
          tokenSeparators={[',']}
        >
          {props.colKeywords ? props.colKeywords : []}
        </Select>
      </Form.Item>
    </>
  );
};

export default TableTitleForm;
