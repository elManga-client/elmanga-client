import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestBlock from './TestBlock';

function render() {
  ReactDOM.render(
    <div>
      <TestBlock />
    </div>,
    document.getElementById('root')
  );
}

render();
