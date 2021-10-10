import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input } from 'antd';

import DisabledContext from 'components/FormItem/DisabledContext';
import data from './data.js';
import StepOne from './StepOne.jsx';
import StepTwo from './StepTwo.jsx';
import ActionButton from './ActionButton.jsx';
import HighLevel from './HighLevel.jsx';
import ruleInitData from './ruleInitData.js';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
// 表单初始化数据
let formInitData = { ...ruleInitData };

const RuleConfig = (props) => {
  const [visible, setVisible] = useState(false); // 组件是否展示
  const [step, setStep] = useState(data.StepStatus.step1); // 当前步骤
  const [stepOneStatus, setStepOneStatus] = useState(false); // 步骤一校验成功的状态
  const [ruleID, setRuleID] = useState(props.ruleID); // 如果是编辑状态则需要该参数
  const [ruleMode, setRuleMode] = useState(''); // 匹配模式
  const [ruleType, setRuleType] = useState(''); // 规则类型
  const [form] = Form.useForm();

  useEffect(() => {
    // 版本更新的时候
    setVisible(true);
    setRuleMode('');
    setRuleType('');
    setRuleID(props.ruleID);
    setStep(data.StepStatus.step1); // 重置为第一步
    console.log('RuleConfig version', props.version);
  }, [props.version, props.ruleID]);

  useEffect(() => {
    // 第一个步骤校验成功之后
    if (stepOneStatus) {
      setStepOneStatus(false);
      setStep(data.StepStatus.step2);
    }
  }, [stepOneStatus]);

  useEffect(() => {
    // 改变初始化值
    formInitData = { ...ruleInitData };
    if (data.filterKeywords.modes.indexOf(ruleMode) >= 0) {
      formInitData[data.filterKeywords.key] = data.filterKeywords.punctuation;
    } else {
      formInitData[data.filterKeywords.key] = [];
    }

    // 目标模式
    if (ruleMode === data.RuleModesDict.object.key) {
      formInitData = { ...formInitData, ...ruleInitData.object_config };
    }
    console.log('表单初始化值 in useEffect: mode', formInitData);
  }, [ruleMode]);

  useEffect(() => {
    if (ruleType in data.type2APIDict) {
      formInitData = { ...formInitData, ...ruleInitData[data.type2APIDict[ruleType]] };
      console.log('表单初始化值 in useEffect: type', formInitData);
    }
    // console.log('===', ruleType, data.type2APIDict)
  }, [ruleType]);

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((value) => {
        console.log('校验成功', value);
        // 保存数据
      })
      .catch((err) => {
        console.log('校验失败', err);
      });
  };

  const changeStep = (newStep) => {
    if (step === newStep) {
      return;
    }
    if (step === data.StepStatus.step1) {
      // 点击了下一步，需要判断必填字段是否已经填写了
      form
        .validateFields()
        .then((value) => {
          console.log('校验成功', value);
          setStepOneStatus(true);
          // setStep(newStep);  // 不能在这里直接修改，因为这个还在onFinish事件中
        })
        .catch((err) => {
          console.log('校验失败', err);
        });
    } else {
      // 点击上一步
      setStep(newStep);
    }
  };

  const onFormChange = (values) => {
    // console.log(values);
  };

  const formItemParams = {
    disabled: ruleID ? true : false, // 表单元素是否只读
    ruleMode: ruleMode,
    ruleType: ruleType,
  };

  return (
    <>
      <Drawer
        title={ruleID ? `修改规则：${ruleID}` : '添加新规则'}
        width="500px"
        placement="right"
        onClose={onClose}
        visible={visible}
        destroyOnClose
        maskClosable={false} // 点击蒙层是否允许关闭
      >
        <Form
          {...layout}
          form={form}
          name="RuleConfilgForm"
          onFieldsChange={(_, allFields) => {
            onFormChange(allFields);
          }}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={onFinish}
          initialValues={ruleInitData}
        >
          <Form.Item name="group" hidden>
            <Input value={props.groupID} />
          </Form.Item>

          <DisabledContext.Provider
            value={{
              disabled: false,
            }}
          >
            <StepOne
              {...formItemParams}
              formRef={form}
              visible={step === data.StepStatus.step1}
              // ruleMode={ruleMode}
              changeRuleMode={setRuleMode}
              // ruleType={ruleType}
              changeRuleType={setRuleType}
              readOnly={ruleID ? true : false}
            />

            {step === data.StepStatus.step2 ? (
              // <StepTwo ruleMode={ruleMode} ruleType={ruleType} />
              <StepTwo {...formItemParams} />
            ) : null}

            {/* <HighLevel ruleMode={ruleMode} ruleType={ruleType} form={form} /> */}
            <HighLevel {...formItemParams} form={form} />
          </DisabledContext.Provider>

          <ActionButton
            step={step}
            ruleMode={ruleMode}
            ruleType={ruleType}
            onCancel={onClose}
            changeStep={changeStep}
          />
        </Form>
      </Drawer>
    </>
  );
};

export default RuleConfig;
