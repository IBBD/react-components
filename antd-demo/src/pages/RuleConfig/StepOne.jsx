import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Switch } from 'antd';
import data from './data.js';

const { Option } = Select;
const { TextArea } = Input;

const getTooltips = (items) => {
  return items.map((item) => item.title + ': ' + item.desc).join('\n');
};

const StepOne = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [ruleMode, setRuleMode] = useState(props.ruleMode);
  const [ruleType, setRuleType] = useState(props.ruleType);

  useEffect(() => {
    setVisible(props.visible);
    setRuleMode(props.ruleMode);
    setRuleType(props.ruleType);
    console.log('Step One useEffect:', props.visible, props.ruleMode, props.ruleType);
  }, [props.visible, props.ruleMode, props.ruleType]);

  const changeRuleMode = (newRuleMode) => {
    props.changeRuleMode(newRuleMode);
    props.changeRuleType('');
    props.formRef.setFieldsValue({ rule_type: '' });
  };

  const changeRuleType = (newRuleType) => {
    props.changeRuleType(newRuleType);
  };

  return (
    <>
      <div style={{ display: visible ? 'block' : 'none' }}>
        <Form.Item
          label="变量名"
          name="variable_name"
          rules={[{ required: true, message: '请输入变量名!' }]}
          extra="匹配到的值会被保存到该变量中"
        >
          <Input placeholder="请输入变量名" minLength={3} maxLength={50} />
        </Form.Item>

        <Form.Item
          label="匹配模式"
          required
          tooltip={getTooltips(data.RuleModes)}
          name="match_pattern"
          rules={[{ required: true, message: '请选择匹配模式!' }]}
          extra={ruleMode ? data.RuleModesDict[ruleMode].desc : ''}
        >
          <Select placeholder="请选择匹配模式" onChange={changeRuleMode}>
            {data.RuleModes.map((rule_mode) => {
              return (
                <Option value={rule_mode.key} key={rule_mode.key}>
                  {rule_mode.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        {
          // 目标模式下不需要选择规则的类型
          ruleMode !== data.RuleModesDict.object.key ? (
            <Form.Item
              label="规则类型"
              required
              tooltip={getTooltips(data.RuleTypes)}
              name="rule_type"
              rules={[{ required: true, message: '请选择规则类型!' }]}
              extra={ruleType ? data.RuleTypesDict[ruleType].desc : ''}
            >
              <Select placeholder="请选择规则类型" onChange={changeRuleType} allowClear>
                {data.RuleTypes.filter((val) => val.modes.indexOf(ruleMode) >= 0).map(
                  (rule_type) => {
                    return (
                      <Option value={rule_type.key} key={rule_type.key}>
                        {rule_type.title}
                      </Option>
                    );
                  },
                )}
              </Select>
            </Form.Item>
          ) : null
        }

        {
          // 只有行模式先才可能需要合并水平行
          ruleMode === data.RuleModesDict.line.key ? (
            <Form.Item
              label="是否合并水平行"
              name="is_merge_horizontal_row"
              valuePropName="checked"
              extra="通常情况下保持默认合并即可"
            >
              <Switch defaultChecked disabled={false} />
            </Form.Item>
          ) : null
        }

        <Form.Item label="规则说明" name="rule_description">
          <TextArea rows={4} disabled={false} placeholder="规则应该有相关的说明" />
        </Form.Item>
      </div>
    </>
  );
};

export default StepOne;
