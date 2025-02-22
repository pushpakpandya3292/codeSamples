export namespace VideoPlaylist {
  //Listing
  export type PlayListDetailsProps = {
    playlistId?: string;
    limit?: number;
    page?: number;
  };
  export type ListingProps = {
    limit?: number;
    page?: number;
  };
  export type ListingResponse = {
    data: [];
    current: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
  };
  export interface ListingAPIPayload extends ListingProps {}
  export type VideoPlaylistCreateAPIMutationPayload = {
    name: string;
    fileId: string;
    order: number;
  };
  export type VideoPlaylistCreateProps = {};
  export type AddVideoToPlaylistCreateProps = {};
  export interface VideoPlaylistCreateAPIPayload
    extends VideoPlaylistCreateProps {
    data: VideoPlaylistCreateAPIMutationPayload;
  }

  export type VideoPlaylistCreateResponse = {};
  export type CreatePlaylistResponse = {};
  export type AddVideoToPlaylistResponse = {};
  export type RemoveVideoToPlaylistResponse = {};
  export type UpdateVideoToPlaylistResponse = {};
  export type UpdatePlaylistAPIMutationPayload = {
    playlistId: string;
    data: {
      name?: string;
      order?: number;
      publicName?: string;
    };
  };
  export type CreatePlaylistAPIMutationPayload = {
    name: string;
    order: number;
  };
  export type UpdateVideoToPlaylistAPIMutationPayload = {
    id: string;
    videoId: string;
    playlistId: string;
    videoTitle?: string;
    videoDescription?: string;
    order?: number;
  };
  export type AddVideoToPlaylistAPIMutationPayload = {
    videoId: string;
    playlistId: string;
    videoTitle: string;
    videoDescription: string;
    order: number;
  };
  export type RemoveVideoFromPlaylistAPIMutationPayload = {
    videoId: string;
    playlistId: string;
  };
  export type DeleteVideoPlaylistProps = {};

  export type DeleteVideoPlaylistResponse = {};
  export type DeleteVideoPlaylistAPIMutationPayload = {
    videoId: string;
  };
}
