import React from 'react';
import { Form, Input } from 'antd';

import RequireKeywords from 'components/FormItem/RequireKeywords';
import ExcludeKeywords from 'components/FormItem/ExcludeKeywords';
import PrefixKeywords from 'components/FormItem/PrefixKeywords';
import SuffixKeywords from 'components/FormItem/SuffixKeywords';

const RegularForm = (props) => {
  return (
    <>
      <Form.Item
        required
        label="正则表达式"
        name="re_express"
        rules={[{ required: true, message: '请输入正则表达式' }]}
      >
        <Input minLength={3} />
      </Form.Item>

      <RequireKeywords />
      <ExcludeKeywords />
      <PrefixKeywords />
      <SuffixKeywords />
    </>
  );
};

export default RegularForm;
