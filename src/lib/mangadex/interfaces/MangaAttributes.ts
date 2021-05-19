export default interface MangaAttributes {
  title: Object;
  altTitles: Object[];
  description: Object;
  isLocked: boolean;
  links: Object;
  originalLanguage: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: string;
  status?: string;
  year?: string;
  contentRating?: string;
  tags: Object[];
  version: number;
  createdAt: string;
  updatedAt: string;
}
