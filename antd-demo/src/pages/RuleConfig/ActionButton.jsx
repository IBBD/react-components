import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import data from './data.js';
import styles from './BottomButton.less';

const ActionButton = (props) => {
  const [step, setStep] = useState(props.step); // 当前在哪一步

  useEffect(() => {
    setStep(props.step);
  }, [props.step]);

  return (
    <>
      <Space className={styles.boxmain}>
        <Space className={styles.boxone}>
          {step === data.StepStatus.step2 ? (
            <Button
              className={styles.cancal}
              onClick={() => props.changeStep(data.StepStatus.step1)}
            >
              上一步
            </Button>
          ) : null}
        </Space>

        <Space className={styles.boxtwo}>
          <Button className={styles.cancal} onClick={() => props.onCancel()}>
            取消
          </Button>
          {step === data.StepStatus.step1 ? (
            <Button type="primary" onClick={() => props.changeStep(data.StepStatus.step2)}>
              下一步
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          )}
        </Space>
      </Space>
    </>
  );
};

export default ActionButton;
