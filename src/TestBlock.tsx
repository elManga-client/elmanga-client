import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';

const TestBlock = (): JSX.Element => {
  const [page, setPage] = useState('');

  useEffect(() => {
    listenTestMessage();
  }, []);

  const listenTestMessage = async () => {
    ipcRenderer.on('test-reply', (event, { pageUrl }) => {
      setPage(pageUrl);
    });
  };

  const testAction = () => {
    ipcRenderer.send('test-action', { message: 'test' });
  };

  return (
    <div>
      <h3>Test block</h3>
      <button onClick={() => testAction()}>Boop</button>
      <img src={page} />
    </div>
  );
};

export default TestBlock;
