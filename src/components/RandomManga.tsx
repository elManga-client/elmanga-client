import { Manga } from '@elmanga/mangadex-lib/dist/interfaces';
import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import './RandomManga.css';

const RandomManga = (): JSX.Element => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [mangaInfo, setMangaInfo]: [
    Manga,
    React.Dispatch<React.SetStateAction<Manga>>
  ] = useState(null);
  const [pages, setPages]: [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
  ] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    listenTestMessage();
  }, []);

  useEffect(() => {
    console.log(`${imagesLoaded}/${pages.length}`);
  }, [imagesLoaded, pages]);

  const listenTestMessage = async () => {
    ipcRenderer.on(
      'test-reply',
      (
        _event,
        args: { pageUrls?: string[]; error?: string; manga?: Manga }
      ) => {
        console.log(args);
        const { pageUrls, error, manga } = args;
        setErrorMessage(error);
        if (error) {
          console.log(error);
          setErrorMessage(error);
          return;
        }
        setImagesLoaded(0);
        setPages(pageUrls);
        setMangaInfo(manga);
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
          <progress
            className={`progress-images-loaded ${
              pages.length === imagesLoaded && 'hidden'
            }`}
            max={pages.length}
            value={imagesLoaded}
          />

          {errorMessage && <span className="error">{errorMessage}</span>}
          {mangaInfo && mangaInfo.attributes && mangaInfo.attributes.title && (
            <h4>{Object.values(mangaInfo.attributes.title)[0]}</h4>
          )}
        </div>
        {pages.map((page) => (
          <img
            src={page}
            key={page}
            onLoad={() => {
              setImagesLoaded(imagesLoaded + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomManga;
