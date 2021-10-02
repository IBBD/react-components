import React, { useEffect } from 'react';
import { Form, Input, InputNumber } from 'antd';
import RequireKeywords from 'components/FormItem/RequireKeywords';
import ExcludeKeywords from 'components/FormItem/ExcludeKeywords';

const KVForm = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Form.Item
        label="键正则表达式"
        name="key_regular_expression"
        rules={[{ required: true, message: '请输入表达式' }]}
      >
        <Input placeholder="请输入表达式" />
      </Form.Item>

      <Form.Item label="键匹配度" name="key_match_degree" extra="匹配度低于该值的会被过滤掉">
        <InputNumber
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
        />
      </Form.Item>

      <RequireKeywords />
      <ExcludeKeywords />
    </>
  );
};

export default KVForm;
