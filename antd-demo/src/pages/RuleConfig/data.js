// 常量定义
const
  // 步骤常量
  STEP_STEP1 = 'step1',
  STEP_STEP2 = 'step2',
  STEP_HIGH = 'high',
  // rule mode
  MODE_LINE = 'line',
  MODE_SENTENCE = 'sentence',
  MODE_PARAGRAPH = 'paragraph',
  MODE_CHAPTER = 'chapter',
  MODE_TABLE = 'table',
  MODE_OBJECT = 'object',
  // rule type
  TYPE_KV = 'kv',
  TYPE_NER = 'ner',
  TYPE_TITLE = 'title',
  TYPE_MONEY = 'money',
  TYPE_REGULAR = 'regular',
  TYPE_TABLEID = 'tableID',
  TYPE_TABLETITLE = 'tableTitle'

// 数据
let data = {
  // 步骤标识常量（规则配置时主要分成两个步骤）
  StepStatus: {
    step1: STEP_STEP1,  // 第一步
    step2: STEP_STEP2,  // 第二步
    high: STEP_HIGH,    // 高级设置
  },

  // 规则匹配模式
  RuleModes: [
    {
      key: MODE_LINE,
      open: true,       // 该值为false，则不会在界面上展示出来
      title: '行模式',
      desc: '按照文档中的文本行进行匹配。',
    },
    {
      key: MODE_SENTENCE,
      open: true,
      title: '句模式',
      desc: '将文本按标点符号（句号，问号，感叹号等）进行分割，然后按句进行匹配。',
    },
    {
      key: MODE_PARAGRAPH,
      open: true,
      title: '段落模式',
      desc: '按照段落切分之后进行匹配。',
    },
    {
      key: MODE_CHAPTER,
      open: false,
      title: '章节模式',
      desc: '按照文档章节结构进行匹配。',
    },
    {
      key: MODE_TABLE,
      open: true,
      title: '表格模式',
      desc: '对表格的行列数据进行匹配。',
    },
    {
      key: MODE_OBJECT,
      open: true,
      title: '目标模式',
      desc: '对文档图像上的目标进行识别匹配，目前支持水印，印章，签名等。',
    },
  ],
  RuleModesDict: {},

  // 规则类型
  RuleTypes: [
    {
      key: TYPE_NER,
      title: '实体识别匹配',
      modes: [MODE_LINE, MODE_SENTENCE, MODE_PARAGRAPH], // 定义在哪些模式下可以包含该选项
      desc: '根据实体识别的结果进行匹配。',
    },
    {
      key: TYPE_MONEY,
      title: '金额匹配',
      modes: [MODE_LINE, MODE_SENTENCE, MODE_PARAGRAPH],
      desc: '匹配文档当的金额信息。',
    },
    {
      key: TYPE_REGULAR,
      title: '正则匹配',
      modes: [MODE_LINE, MODE_SENTENCE, MODE_PARAGRAPH],
      desc: '使用正则表达式来匹配文档中的关键信息。',
    },
    {
      key: TYPE_KV,
      title: '键值匹配',
      modes: [MODE_LINE, MODE_SENTENCE, MODE_PARAGRAPH],
      desc: '通过键的正则表达式来匹配相应的值。',
    },
    {
      key: TYPE_TITLE,
      title: '标题匹配',
      modes: [MODE_CHAPTER],
      desc: '通过标题来匹配相应的内容，目前支持通过章节标题来匹配整个章节的内容。',
    },
    {
      key: TYPE_TABLETITLE,
      title: '表格行列标题匹配',
      modes: [MODE_TABLE],
      desc: '指定首行或者首列的关键词来匹配相应单元格的内容。',
    },
    {
      key: TYPE_TABLEID,
      title: '表格行列ID匹配',
      modes: [MODE_TABLE],
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

  // 过滤标点及关键词
  filterKeywords: {
    key: 'filter_keywords',
    punctuation: [],   // 过滤的标点符号
    modes: [MODE_LINE, MODE_SENTENCE],  // 定义在哪些模式下可以包含该选项
  },

  // map for rule type to api field
  type2APIDict: {}
};

// 定义类型到API下标的映射
data.type2APIDict[TYPE_NER] =         "ner_config"
data.type2APIDict[TYPE_MONEY] =       "money_config"
data.type2APIDict[TYPE_REGULAR] =     "regular_config"
data.type2APIDict[TYPE_KV] =          "kv_config"
data.type2APIDict[TYPE_TITLE] =       "title_config"
data.type2APIDict[TYPE_TABLETITLE] =  "tableTitle_config"
data.type2APIDict[TYPE_TABLEID] =     "tableID_config"

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
