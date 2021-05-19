import MangaAttributes from './MangaAttributes';

export default interface Manga {
  id: string;
  type: string;
  attributes: MangaAttributes;
}
