import React from 'react';
import { Form, Select } from 'antd';

const RequireKeywords = (props) => {
  return (
    <Form.Item
      label="必须关键词"
      name="required_keywords"
      rules={[{ required: false, message: '必须关键词' }]}
      // required
      tooltip="被匹配的值必须包含这些关键词"
    >
      <Select
        mode="tags"
        allowClear
        style={{ width: '100%' }}
        placeholder="请输入关键字，点击Enter键区分关键字"
        tokenSeparators={[',']}
      >
        {props.keywords ? props.keywords : []}
      </Select>
    </Form.Item>
  );
};

export default RequireKeywords;
