import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import './RandomManga.css';

const RandomManga = (): JSX.Element => {
  const [pages, setPages]: [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
  ] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    listenTestMessage();
  }, []);

  const listenTestMessage = async () => {
    ipcRenderer.on(
      'test-reply',
      (
        _event,
        { pageUrls, error }: { pageUrls?: string[]; error?: string }
      ) => {
        console.log(pageUrls, error);
        setErrorMessage(error);
        if (error) {
          console.log(error);
          setErrorMessage(error);
          return;
        }
        setPages(pageUrls);
      }
    );
  };

  const testAction = () => {
    ipcRenderer.send('test-action', { message: 'test' });
  };

  return (
    <div>
      <div className="container-flex">
        <div>
          <h3>Random manga chapter</h3>
          <button onClick={() => testAction()}>Boop</button>
          {errorMessage && <span className="error">{errorMessage}</span>}
        </div>
        {pages.map((page) => (
          <img src={page} key={page} />
        ))}
      </div>
    </div>
  );
};

export default RandomManga;
