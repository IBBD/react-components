import React, { useEffect } from 'react';

// 加载子组件
import data from './data.js';
import NerForm from './StepTwoItems/NerForm';
import KVForm from './StepTwoItems/KVForm';
import MoneyForm from './StepTwoItems/MoneyForm';
import RegularForm from './StepTwoItems/RegularForm.jsx';
import ObjectForm from './StepTwoItems/ObjectForm.jsx';
import TableIDForm from './StepTwoItems/TableIDForm.jsx';
import TableTitleForm from './StepTwoItems/TableTitleForm.jsx';
import TitleForm from './StepTwoItems/TitleForm.jsx';

const StepTwo = (props) => {
  useEffect(() => {}, []);

  const FormIitm = (rule_mode, rule_type) => {
    if (rule_mode === data.RuleModesDict.object.key) {
      return <ObjectForm />;
    }

    switch (rule_type) {
      case data.RuleTypesDict.ner.key:
        return <NerForm {...props} />;
      case data.RuleTypesDict.kv.key:
        return <KVForm {...props} />;
      case data.RuleTypesDict.money.key:
        return <MoneyForm {...props} />;
      case data.RuleTypesDict.regular.key:
        return <RegularForm {...props} />;
      case data.RuleTypesDict.tableID.key:
        return <TableIDForm {...props} />;
      case data.RuleTypesDict.tableTitle.key:
        return <TableTitleForm {...props} />;
      case data.RuleTypesDict.title.key:
        return <TitleForm {...props} />;
      default:
        console.log('Error rule_type: ', rule_type);
    }
  };

  return <>{FormIitm(props.ruleMode, props.ruleType)}</>;
};

export default StepTwo;
