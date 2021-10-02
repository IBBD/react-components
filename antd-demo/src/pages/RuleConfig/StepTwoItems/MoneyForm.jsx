import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

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
        required
        label="金额类型"
        name="money_type"
        rules={[{ required: true, message: '请选择金额类型' }]}
      >
        <Select>
          {data.MoneyTypes.map((val) => {
            return (
              <Option value={val.key} key={val.key}>
                {val.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <PrefixKeywords />
      <SuffixKeywords />
    </>
  );
};

export default NerForm;
