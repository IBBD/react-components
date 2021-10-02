let data = {
  // 步骤标识常量（规则配置时主要分成两个步骤）
  StepStatus: {
    step1: 'step1',  // 第一步
    step2: 'step2',  // 第二步
    high: 'high',    // 高级设置
  },

  // 规则匹配模式
  RuleModes: [
    {
      key: 'line',
      open: true,       // 该值为false，则不会在界面上展示出来
      title: '行模式',
      desc: '按照文档中的文本行进行匹配。',
    },
    {
      key: 'sentence',
      open: true,
      title: '句模式',
      desc: '将文本按标点符号（句号，问号，感叹号等）进行分割，然后按句进行匹配。',
    },
    {
      key: 'paragraph',
      open: true,
      title: '段落模式',
      desc: '按照段落切分之后进行匹配。',
    },
    {
      key: 'chapter',
      open: false,
      title: '章节模式',
      desc: '按照文档章节结构进行匹配。',
    },
    {
      key: 'table',
      open: true,
      title: '表格模式',
      desc: '对表格的行列数据进行匹配。',
    },
    {
      key: 'object',
      open: true,
      title: '目标模式',
      desc: '对文档图像上的目标进行识别匹配，目前支持水印，印章，签名等。',
    },
  ],
  RuleModesDict: {},

  // 规则类型
  RuleTypes: [
    {
      key: 'ner',
      title: '实体识别匹配',
      modes: ['line', 'sentence', 'paragraph'], // 定义在哪些模式下可以包含该选项
      desc: '根据实体识别的结果进行匹配。',
    },
    {
      key: 'money',
      title: '金额匹配',
      modes: ['line', 'sentence', 'paragraph'],
      desc: '匹配文档当的金额信息。',
    },
    {
      key: 'regular',
      title: '正则匹配',
      modes: ['line', 'sentence', 'paragraph'],
      desc: '使用正则表达式来匹配文档中的关键信息。',
    },
    {
      key: 'kv',
      title: '键值匹配',
      modes: ['line', 'sentence', 'paragraph'],
      desc: '通过键的正则表达式来匹配相应的值。',
    },
    {
      key: 'title',
      title: '标题匹配',
      modes: ['chapter'],
      desc: '通过标题来匹配相应的内容，目前支持通过章节标题来匹配整个章节的内容。',
    },
    {
      key: 'tableTitle',
      title: '表格行列标题匹配',
      modes: ['table'],
      desc: '指定首行或者首列的关键词来匹配相应单元格的内容。',
    },
    {
      key: 'tableID',
      title: '表格行列ID匹配',
      modes: ['table'],
      desc: '指定表格的行ID或者列ID匹配相应单元格的内容。',
    },
  ],
  RuleTypesDict: {},

  // 实体识别的类型
  NerTypes: [
    {
      key: 'company',
      title: '机构名',
    },
    {
      key: 'address',
      title: '地址',
    },
    {
      key: 'date',
      title: '日期',
    },
    {
      key: 'person',
      title: '人名',
    },
  ],
  NerTypesDict: {},

  // 金额匹配的类型
  MoneyTypes: [
    {
      key: 'capitalize',
      title: '只匹配大写金额',
    },
    {
      key: 'lowercase',
      title: '只匹配小写金额',
    },
    {
      key: 'case',
      title: '同时匹配大小写金额',
    },
  ],
  MoneyTypesDict: {},

  // 目标匹配的类型
  ObjectTypes: [
    {
      key: 'seal',
      title: '印章',
    },
    {
      key: 'sign',
      title: '签名',
    },
  ],
  ObjectTypesDict: {},

  filterKeywords: {
    key: 'filter_keywords',
    punctuation: [],   // 过滤的标点符号
    modes: ['line', 'sentence'],  // 定义在哪些模式下可以包含该选项
  }
};

// 生成字典结构
data.RuleModes.map((val) => {
  data.RuleModesDict[val.key] = val;
  return val
});
data.RuleTypes.map((val) => {
  data.RuleTypesDict[val.key] = val;
  return val
});
data.NerTypes.map((val) => {
  data.NerTypesDict[val.key] = val;
  return val
});
data.MoneyTypes.map((val) => {
  data.MoneyTypesDict[val.key] = val;
  return val
});
data.ObjectTypes.map((val) => {
  data.ObjectTypesDict[val.key] = val;
  return val
});
console.log('************** data.js ***************', data);

export default data;
