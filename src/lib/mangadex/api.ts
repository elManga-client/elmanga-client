import fs from 'fs';
import fetch from 'electron-fetch';
import { Readable } from 'stream';
import { Chapter, Manga, Relationship } from './interfaces';

export const getFirstManga = async (): Promise<Manga> => {
  const res = await fetch('https://api.mangadex.org/manga');
  const { results } = await res.json();
  console.log('manga', results);

  return results[0].data;
};

export const getRandomManga = async (): Promise<Manga> => {
  const res = await fetch('https://api.mangadex.org/manga/random');
  const { data } = await res.json();
  console.log('manga', data);
  return data;
};

export const getOneChapter = async (manga: Manga): Promise<Chapter> => {
  const mangaId = manga.id;
  const resManga = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
  const payload = await resManga.json();
  const chapters = payload.relationships.filter(
    (r: Relationship) => r.type == 'chapter'
  );

  const chapterId = chapters[0].id;
  const resChapter = await fetch(
    `https://api.mangadex.org/chapter/${chapterId}`
  );
  const { data } = await resChapter.json();
  return data;
};

export const getServer = async (chapterId: string): Promise<string> => {
  const res = await fetch(
    `https://api.mangadex.org/at-home/server/${chapterId}`
  );
  const { baseUrl } = await res.json();
  console.log(baseUrl);
  return baseUrl;
};

export const getPageUrl = async (
  chapter: Chapter,
  serverBaseUrl: string,
  pageFileName: string
): Promise<string> => {
  const pageUrl = `${serverBaseUrl}/data/${chapter.attributes.hash}/${pageFileName}`;
  console.log(pageUrl);

  return pageUrl;
};

export const downloadOneChapter = async (): Promise<void> => {
  const manga = await getFirstManga();
  const chapter = await getOneChapter(manga);
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
