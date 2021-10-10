import React, { useState, useEffect } from 'react';
// import { Space, Form, Select, Switch, InputNumber, Divider } from 'antd';
import { Space, Form, Divider } from 'antd';
import { CaretDownFilled, CaretUpOutlined } from '@ant-design/icons';
import { Select, Switch, InputNumber } from 'components/FormItem/items';
import data from './data.js';
import styles from './BottomButton.module.less';

const HighLevel = (props) => {
  const [visible, setVisible] = useState(false); // 是否展示

  return (
    <>
      <Divider plain disabled={!visible}>
        {visible ? (
          <Space className={styles.highsetting} onClick={() => setVisible(false)}>
            隐藏高级配置
            <CaretUpOutlined />
          </Space>
        ) : (
          <Space className={styles.highsetting} onClick={() => setVisible(true)}>
            展开高级配置
            <CaretDownFilled />
          </Space>
        )}
      </Divider>

      <HighForm {...props} visible={visible} />
    </>
  );
};

const HighForm = (props) => {
  const [visible, setVisible] = useState(false); // 是否展示
  const [textLenLimit, setTextLenLimit] = useState(false); // 是否展示
  // eslint-disable-next-line no-unused-vars
  const [_, setRuleType] = useState(props.ruleType); // 规则类型
  const [ruleMode, setRuleMode] = useState(props.ruleMode); // 规则匹配模式

  useEffect(() => {
    setVisible(props.visible);
    setRuleMode(props.ruleMode);
    setRuleType(props.ruleType);
    console.log('HighLevel useEffect:', props.visible, props.ruleMode, props.ruleType);
  }, [props.visible, props.ruleMode, props.ruleType]);

  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      <Form.Item label="过滤关键词" name="filter_keywords" extra="匹配到的值会过滤掉这些关键词">
        <Select
          mode="tags"
          allowClear
          placeholder="输入需要过滤的标点或者关键词，点击Enter键区分字符"
          tokenSeparators={[',']}
        />
      </Form.Item>

      {ruleMode === data.RuleModesDict.line.key ? (
        <Form.Item
          label="排除页眉页脚"
          name="is_exclude_headers_and_footers"
          valuePropName="checked"
          extra="在行模式下，可以选择是否排除页眉页脚"
        >
          <Switch defaultChecked />
        </Form.Item>
      ) : null}

      <Form.Item
        label="只匹配一次"
        name="is_only_match_once"
        valuePropName="checked"
        extra="如果开启该选项，则只会返回第一个满足条件的值"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="长度限制"
        name="is_matching_text_length"
        valuePropName="checked"
        extra="可以对匹配到的值的长度进行限制，过滤无效数据"
      >
        <Switch onChange={setTextLenLimit} />
      </Form.Item>

      {textLenLimit ? (
        <Form.Item
          label="长度范围"
          name="text_length_limit"
          extra="如果值的长度超出该范围，则会被过滤掉"
        >
          <InputNumber defaultValue={0} min={0} />至 <InputNumber defaultValue={0} min={0} />
        </Form.Item>
      ) : null}
    </div>
  );
};

export default HighLevel;
