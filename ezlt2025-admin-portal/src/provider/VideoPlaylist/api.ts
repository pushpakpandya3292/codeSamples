import service from "@/services";
import { VideoPlaylist } from "./types";
import { ENDPOINTS } from "../constant";

export async function listing(
  props?: VideoPlaylist.ListingAPIPayload,
): Promise<VideoPlaylist.ListingResponse> {
  return service({
    method: "GET",
    url: ENDPOINTS.VIDEO,
    queryParams: {
      limit: props?.limit,
      page: props?.page,
    },
  });
}
export async function upload(
  payload: VideoPlaylist.VideoPlaylistCreateAPIPayload,
): Promise<VideoPlaylist.VideoPlaylistCreateResponse> {
  return service({
    method: "POST",
    url: ENDPOINTS.VIDEO,
    body: payload.data,
  });
}
export async function playListListing(
  props?: VideoPlaylist.ListingAPIPayload,
): Promise<VideoPlaylist.ListingResponse> {
  return service({
    method: "GET",
    url: ENDPOINTS.VIDEO_PLAYLIST,
    queryParams: {
      limit: props?.limit,
      page: props?.page,
    },
  });
}
export async function playListDetails(
  props?: VideoPlaylist.PlayListDetailsProps,
): Promise<VideoPlaylist.ListingResponse> {
  return service({
    method: "GET",
    url: ENDPOINTS.VIDEO_PLAYLIST_DETAILS,
    queryParams: {
      playlistId: props?.playlistId,
      limit: props?.limit,
      page: props?.page,
    },
  });
}
export async function createPlaylist(
  payload: VideoPlaylist.CreatePlaylistAPIMutationPayload,
): Promise<VideoPlaylist.CreatePlaylistResponse> {
  return service({
    method: "POST",
    url: ENDPOINTS.VIDEO_PLAYLIST,
    body: payload,
  });
}
export async function editPlaylist(
  payload: VideoPlaylist.UpdatePlaylistAPIMutationPayload,
): Promise<VideoPlaylist.CreatePlaylistResponse> {
  return service({
    method: "PATCH",
    url: ENDPOINTS.VIDEO_PLAYLIST + `/${payload.playlistId}`,
    body: payload.data,
  });
}
export async function addVideoToPlaylist(
  payload: VideoPlaylist.AddVideoToPlaylistAPIMutationPayload,
): Promise<VideoPlaylist.AddVideoToPlaylistResponse> {
  return service({
    method: "POST",
    url: ENDPOINTS.ADD_VIDEO_TO_PLAYLIST,
    body: payload,
  });
}
export async function updateVideoToPlaylist(
  payload: VideoPlaylist.UpdateVideoToPlaylistAPIMutationPayload,
): Promise<VideoPlaylist.UpdateVideoToPlaylistResponse> {
  return service({
    method: "POST",
    url: ENDPOINTS.UPDATE_VIDEO_TO_PLAYLIST,
    body: payload,
  });
}
export async function removeVideoFromPlaylist(
  payload: VideoPlaylist.RemoveVideoToPlaylistResponse,
): Promise<VideoPlaylist.RemoveVideoFromPlaylistAPIMutationPayload> {
  return service({
    method: "POST",
    url: ENDPOINTS.REMOVE_VIDEO_TO_PLAYLIST,
    body: payload,
  });
}

export async function deleteFile(
  payload: VideoPlaylist.DeleteVideoPlaylistAPIMutationPayload,
): Promise<VideoPlaylist.DeleteVideoPlaylistResponse> {
  return service({
    method: "DELETE",
    url: `${ENDPOINTS.VIDEO}/${payload.videoId}`,
  });
}
