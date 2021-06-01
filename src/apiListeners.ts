import {
  getMangaList,
  getOneChapter,
  getPageUrl,
  getRandomManga,
  getServer,
} from '@elmanga/mangadex-lib';
import { MangaListOptions } from '@elmanga/mangadex-lib/dist/interfaces';

export const randomMangaResponse = async (
  event: Electron.IpcMainEvent
): Promise<void> => {
  for (let i = 0; i < 3; ++i) {
    try {
      const manga = await getRandomManga();
      const chapter = await getOneChapter(manga);
      const serverBaseUrl = await getServer(chapter.id);
      const pageUrls: string[] = [];
      for (const fileName of chapter.attributes.data) {
        pageUrls.push(await getPageUrl(chapter, serverBaseUrl, fileName));
      }
      return event.reply('random-manga-response', { manga, pageUrls });
    } catch (error) {
      event.reply('random-manga-response', { error: error.message });
    }
  }
};

export const mangaListResponse = async (
  event: Electron.IpcMainEvent,
  { options }: { options: MangaListOptions }
): Promise<void> => {
  for (let i = 0; i < 3; ++i) {
    try {
      const mangaList = await getMangaList(options);
      return event.reply('manga-list-response', {
        mangaList: mangaList,
      });
    } catch (error) {
      event.reply('manga-list-response', { error: error.message });
    }
  }
};
