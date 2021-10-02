import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

import RequireKeywords from 'components/FormItem/RequireKeywords';
import ExcludeKeywords from 'components/FormItem/ExcludeKeywords';
import PrefixKeywords from 'components/FormItem/PrefixKeywords';
import SuffixKeywords from 'components/FormItem/SuffixKeywords';
import data from '../data.js';

const { Option } = Select;

const NerForm = (props) => {
  useEffect(() => {
  }, []);

  return (
    <>
      <Form.Item
        label="实体类型"
        name="ner_type"
        required
        tooltip="实体类型"
        rules={[{ required: true, message: '请选择实体类型' }]}
      >
        <Select>
          {data.NerTypes.map((val) => {
            return (
              <Option value={val.key} key={val.key}>
                {val.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <RequireKeywords />
      <ExcludeKeywords />
      <PrefixKeywords />
      <SuffixKeywords />
    </>
  );
};

export default NerForm;
