import React, { useState } from 'react';
import { Form, Select, InputNumber } from 'antd';

const PrefixKeywords = (props) => {
  const [range, setRange] = useState(props.range ? props.range : 0);

  return (
    <>
      <Form.Item
        label="前缀范围"
        name="prefix_range"
        extra="该值为0或者为空，则表示不使用前缀关键词匹配"
      >
        <InputNumber
          // defaultValue={range ? range : 0}
          style={{ width: '100px' }}
          min={0}
          onChange={setRange}
        />
      </Form.Item>

      {range > 0 ? (
        <Form.Item label="前缀关键词" name="prefix_keywords">
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
      ) : null}
    </>
  );
};

export default PrefixKeywords;
