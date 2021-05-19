enum Results {
  ok = 'ok',
  error = 'error',
}

export interface Manga {
  id: string;
  type: string;
  attributes: MangaAttributes;
}

export interface MangaAttributes {
  title: Record<string, unknown>;
  altTitles: Record<string, unknown>[];
  description: Record<string, unknown>;
  isLocked: boolean;
  links: Record<string, unknown>;
  originalLanguage: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: string;
  status?: string;
  year?: string;
  contentRating?: string;
  tags: Record<string, unknown>[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

export default interface MangaResponse {
  result: Results;
  data: Manga[];
  relationships: Relationship[];
}

export interface Chapter {
  id: string;
  type: string;
  attributes: ChapterAttributes;
}

export interface ChapterAttributes {
  title: string;
  volume?: string;
  chapter?: string;
  translatedLanguage: string;
  hash: string;
  data: string[];
  dataSaver: string[];
  uploader: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Relationship {
  id: string;
  type: string;
}
