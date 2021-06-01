import { MangaListResponse } from '@elmanga/mangadex-lib/dist/interfaces';
import React, { SetStateAction, useEffect, useState } from 'react';

const MangaList = (): JSX.Element => {
  const [mangaList, setMangaList]: [
    MangaListResponse,
    React.Dispatch<SetStateAction<MangaListResponse>>
  ] = useState();

  useEffect(() => {
    const fetchMangaList = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.api.send('manga-list-request', {});
      console.log('manga-list-request');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.api.on('manga-list-response', (data) => {
        console.log('manga-list-response: ', data);
        if (data.mangaList) setMangaList(data.mangaList);
      });
    };

    fetchMangaList();
  }, []);

  return (
    <div>
      {mangaList &&
        mangaList.results.map((mangaResponse) => (
          <p key={mangaResponse.data.id}>
            {JSON.stringify(mangaResponse.data.attributes.title)}
          </p>
        ))}
    </div>
  );
};

export default MangaList;
