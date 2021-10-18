import React, { Component } from 'react'
import { Table } from 'antd';


export default class StrictlyTable extends Component {
  state = {
    selectedRowKeys:[]
  }
  static defaultProps = {
    rowKey:'key',
  }

  _getParent = (list, id) =>{
    let childlist = false;
    let isExist = false;
    for (let i = 0; i < list.length; i++) {
      if ((childlist = list[i].children)) {
        for (var key in childlist) {
          if (childlist[key][this.props.rowKey] === id) {
            isExist = true;
          }
        }
        if (isExist) {
          return list[i];
        }
        if (this._getParent(childlist)) {
          return this._getParent(childlist);
        }
      }
    }
  }

  // 获取当前对象的父级
  getParent = (tabData, id) => {
    for (let i = 0; i < tabData.length; i++) {
      if (tabData[i][this.props.rowKey] === id) {
        return null;
      }
    }
    return this._getParent(tabData, id);
  }

  // 设置父级选择
  handleOnSetParentCheck(set, id) {
    // let parent = this.getParent(this.props.selectedRowKeys, article_id);
    let parent = this.getParent(this.state.selectedRowKeys, id);
    if (parent) {
      set.add(parent[this.props.rowKey]);
      this.handleOnSetParentCheck(set, parent[this.props.rowKey]);
    }
    return set;
  }

  // 设置父级取消
  handleOnSetParentUncheck = (set, id) => {
    console.log(set);
    let checkedParent = false;
    const parent = this.getParent(Array.from(set), id);
    if (parent) {
      let childlist = parent.children;
      childlist.forEach((v) => {
        if (set.has(v[this.props.rowKey])) {
          checkedParent = true;
        }
      });
      if (!checkedParent) {
        set['delete'](parent[this.props.rowKey]);
        this.handleOnSetParentUncheck(set, parent[this.props.rowKey]);
      }
    }
    return set;
  }

  handleOnTableSelect = (record, selected, selectedRows) => {
    console.log(record, this.props.dataSource[0]);
    const { selectedRowKeys } = this.state;
    const article_id = record[this.props.rowKey];
    let set = new Set(selectedRowKeys);
    if (selected) {
      set.add(article_id);
      record.children && this.handleOnSetChildCheck(set, record.children);
      this.handleOnSetParentCheck(set, article_id);
      //   如果子节点全部选中，父节点也选中
      if (Array.from(set).length === this.props.dataSource[0].children.length) {
        console.log(Array.from(set).length, this.props.dataSource[0].children.length);
        set.add(this.props.dataSource[0][this.props.rowKey]);
      }
    } else {
      set['delete'](article_id);
      record.children && this.handleOnSetChildUncheck(set, record.children);
      this.handleOnSetParentUncheck(set, article_id);
      // 只要有一个子节点未选中，父节点不能选中
      //  if(!record.children) set['delete'](this.props.dataSource[0].article_id);
    }

    this.setState({selectedRowKeys: [...Array.from(set)]})
    this.props.rowSelection.onSelect(record, set, selectedRows)
  }

  // 设置child全选
  handleOnSetChildCheck = (set, list) => {
    list.forEach(v => {
      set.add(v[this.props.rowKey]);
      v.children && this.handleOnSetChildCheck(set, v.children);
    });
    return set;
  }

  // 设置child取消
  handleOnSetChildUncheck = (set, list) => {
    list.forEach(v => {
      set['delete'](v[this.props.rowKey]);
      v.children && this.handleOnSetChildUncheck(set, v.children);
    });
    return set;
  }

  render() {
    const { rowSelection, rowKey } = this.props
    const { selectedRowKeys } = this.state
    const rowSelectionChild = {
      selectedRowKeys: selectedRowKeys,
      onSelect: this.handleOnTableSelect,
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log('In StrictleTable select all:', selected, selectedRows, changeRows)
        if (selected) {
          let arr_select = []
          selectedRows.map((item) => {
            return arr_select.push(item[rowKey])
          })
          this.setState({ selectedRowKeys: arr_select })
        } else {
          this.setState({ selectedRowKeys: [] })
        }
        rowSelection.onSelectAll(selected, selectedRows, changeRows)
      },
    };

    return (
      <Table
        {...this.props}
        rowSelection={rowSelectionChild}
      />
    )
  }
}