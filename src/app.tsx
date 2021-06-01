import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RandomManga from './components/RandomManga';
import './app.css';
import MangaList from './components/MangaList';

function render() {
  ReactDOM.render(
    <div>
      <MangaList />
      <RandomManga />
    </div>,
    document.getElementById('root')
  );
}

render();
