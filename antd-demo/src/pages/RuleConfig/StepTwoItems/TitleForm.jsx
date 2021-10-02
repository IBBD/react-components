import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

import RequireKeywords from 'components/FormItem/RequireKeywords';
import ExcludeKeywords from 'components/FormItem/ExcludeKeywords';

const TitleForm = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Form.Item label="标题关键词" name="title" extra="匹配标题中的关键词">
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

      <RequireKeywords />
      <ExcludeKeywords />
    </>
  );
};

export default TitleForm;
