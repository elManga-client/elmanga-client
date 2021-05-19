import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RandomManga from './components/RandomManga';
import './app.css';

function render() {
  ReactDOM.render(
    <div>
      <RandomManga />
    </div>,
    document.getElementById('root')
  );
}

render();
