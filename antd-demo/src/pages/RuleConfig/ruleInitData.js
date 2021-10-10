// 配置时的默认值
const ruleInitData = {
  is_merge_horizontal_row: true,
  is_exclude_headers_and_footers: true,
  is_matching_text_length: true,
  rule_description: '',
  text_length_min: 0,
  text_length_max: 0,
  is_only_match_once: false,
  filter_keywords: [],
  ner_config: {
    prefix_range: 0,
    suffix_range: 0,
  },
  money_config: {
    prefix_range: 0,
    suffix_range: 0,
  },
  regular_config: {},
  kv_config: {
    key_match_degree: 80,
    value_min_length: 0,
  },
  title_config: {},
  tableTitle_config: {},
  tableID_config: {},
  object_config: {},
};

export default ruleInitData;
