import fs from 'fs';
import fetch from 'electron-fetch';
import Chapter from './interfaces/Chapter';
import Manga from './interfaces/Manga';
import { Readable } from 'stream';

export const getFirstManga = async (): Promise<Manga> => {
  const res = await fetch('https://api.mangadex.org/manga');
  const data = await res.json();
  console.log('manga', data);

  return data.results[0].data;
};

export const getChapters = async (manga: Manga): Promise<Chapter[]> => {
  const mangaId = manga.id;

  const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
  const data = await res.json();
  return data.relationships.filter((r: any) => r.type == 'chapter');
};

export const getOneChapter = async (chapters: Chapter[]): Promise<Chapter> => {
  const chapterId = chapters[1].id;

  const res = await fetch(`https://api.mangadex.org/chapter/${chapterId}`);
  const data = await res.json();
  return data.data;
};

export const getServer = async (chapterId: string) => {
  const res = await fetch(
    `https://api.mangadex.org/at-home/server/${chapterId}`
  );
  console.log(res);
  return res.json();
};

export const getPageUrl = async (
  chapter: Chapter,
  server: any,
  pageFileName: string
): Promise<string> => {
  const serverBaseUrl = server.baseUrl;
  const pageUrl = `${serverBaseUrl}/data/${chapter.attributes.hash}/${pageFileName}`;
  console.log(pageUrl);

  return pageUrl;
};

export const downloadOneChapter = async () => {
  const manga = await getFirstManga();
  const chapters = await getChapters(manga);
  const chapter = await getOneChapter(chapters);
  const server = await getServer(chapter.id);
  for (const pageFileName of chapter.attributes.data) {
    const pageUrl = await getPageUrl(chapter, server, pageFileName);
    downloadImage(pageUrl, pageFileName);
  }
};

export const downloadImage = async (
  pageUrl: string,
  imageFileName: string
): Promise<void> => {
  const res = await fetch(pageUrl);
  try {
    if (!fs.existsSync('images')) await fs.promises.mkdir('images');
    const writeStream = fs.createWriteStream(`./images/${imageFileName}`);
    (res.body as Readable).pipe(writeStream);
  } catch (error) {
    console.log(error);
  }
};
