import React from 'react';
import { Form, Select } from 'antd';

const ExcludeKeywords = (props) => {
  return (
    <Form.Item
      label="排除关键词"
      name="exclude_keywords"
      rules={[{ required: false, message: '排除关键词' }]}
      // required
      tooltip="被匹配的值不能包含这些关键词"
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

export default ExcludeKeywords;
