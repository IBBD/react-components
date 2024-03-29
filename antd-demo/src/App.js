import './App.less';
import React, { useState } from 'react';
import { Button } from 'antd';
import TreeHorizPage from './pages/TreeHoriz/TreeHorizPage';
import RuleConfig from './pages/RuleConfig/RuleConfig';
import Table from './pages/Table/index';

function App() {
  const [confVersion, setConfVersion] = useState(0)

  return (
    <>
      <div>
        <TreeHorizPage />
      </div>

      <div>
        <Table />
      </div>

      <div>
        <Button onClick={() => setConfVersion(confVersion + 1)}>
          创建新规则
        </Button>
      </div>

      {confVersion > 0 ? (
        <RuleConfig
          version={confVersion}
          key={confVersion}
          groupID={0}
        />
      ) : null}
    </>
  );
}

export default App;
