export type GameThumbnail = {
  url: string;
  altText: string;
  height: number;
  width: number;
};

export type Game = {
  id: string;
  name: string;
  content: {
    thumbnail: GameThumbnail;
    thumbnailSquare?: GameThumbnail;
    thumbnailPortrait?: GameThumbnail;
    thumbnailLandscape?: GameThumbnail;
  };
};
