import ChapterAttributes from './ChapterAttributes';

export default interface Chapter {
  id: string;
  type: string;
  attributes: ChapterAttributes;
}
