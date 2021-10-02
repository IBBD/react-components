import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input } from 'antd';
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


const RuleConfig = (props) => {
  const [visible, setVisible] = useState(false); // 组件是否展示
  const [step, setStep] = useState(data.StepStatus.step1); // 当前步骤
  const [stepOneStatus, setStepOneStatus] = useState(false)   // 步骤一校验成功的状态
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
    console.log('RuleConfig version', props.version, ' useEffect:', props);
  }, [props, props.version]);

  useEffect(() => {
    // 第一个步骤校验成功之后
    if (stepOneStatus) {
      setStepOneStatus(false);
      setStep(data.StepStatus.step2);
    }
  }, [stepOneStatus]);

  let formInitData = {...ruleInitData}
  useEffect(() => {
    // 改变初始化值
    if (data.filterKeywords.modes.indexOf(ruleMode) >= 0) {
      formInitData[data.filterKeywords.key] = data.filterKeywords.punctuation
    } else {
      formInitData[data.filterKeywords.key] = []
    }

    //
  }, [ruleMode, ruleType]);

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

  return (
    <>
      <Drawer
        title={ruleID ? `修改规则：${ruleID}` : '添加新规则'}
        width="50%"
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
          onFinish={onFinish}
          initialValues={ruleInitData}
        >
          <Form.Item name="group" hidden>
            <Input value={props.groupID} />
          </Form.Item>

          <StepOne
            formRef={form}
            visible={step === data.StepStatus.step1}
            ruleMode={ruleMode}
            changeRuleMode={setRuleMode}
            ruleType={ruleType}
            changeRuleType={setRuleType}
          />

          {step === data.StepStatus.step2 ? (
            <StepTwo ruleMode={ruleMode} ruleType={ruleType} />
          ) : null}

          <HighLevel ruleMode={ruleMode} ruleType={ruleType} form={form} />

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
