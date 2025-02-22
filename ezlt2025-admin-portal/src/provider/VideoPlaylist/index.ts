import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as api from "./api";
import { VideoPlaylist } from "./types";

const KEY = "VIDEO_PLAYLIST";

export function getKeyFromProps(
  props: any,
  type: "VIDIEOLISTING" | "PLAYLISTLISTING" | "PLAYLISTDETAILSLISTING",
): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

//Listing
export function useVideoPlaylistListing(
  props?: VideoPlaylist.ListingProps,
): UseQueryResult<VideoPlaylist.ListingResponse> {
  return useQuery(
    getKeyFromProps(props, "VIDIEOLISTING"),
    () => api.listing(props),
    {},
  );
}
export function usePlaylistDetailsListing(
  props?: VideoPlaylist.PlayListDetailsProps,
): UseQueryResult<VideoPlaylist.ListingResponse> {
  return useQuery(
    getKeyFromProps(props, "PLAYLISTDETAILSLISTING"),
    () => api.playListDetails(props),
    {
      enabled: !!props?.playlistId,
    },
  );
}
export function usePlaylistListing(
  props?: VideoPlaylist.ListingProps,
): UseQueryResult<VideoPlaylist.ListingResponse> {
  return useQuery(
    getKeyFromProps(props, "PLAYLISTLISTING"),
    () => api.playListListing(props),
    {},
  );
}

export function useVideoUpload(
  props: VideoPlaylist.VideoPlaylistCreateProps = {},
): UseMutationResult<
  VideoPlaylist.VideoPlaylistCreateResponse,
  {
    message?: string;
  },
  VideoPlaylist.VideoPlaylistCreateAPIPayload
> {
  return useMutation((payload) => api.upload(payload), {
    mutationKey: `${KEY} | Create`,
    retry: 0,
  });
}
export function useCreatePlaylist(
  props: VideoPlaylist.VideoPlaylistCreateProps = {},
): UseMutationResult<
  VideoPlaylist.CreatePlaylistResponse,
  {
    message?: string;
  },
  VideoPlaylist.CreatePlaylistAPIMutationPayload
> {
  return useMutation((payload) => api.createPlaylist(payload), {
    mutationKey: `${KEY} | Create`,
    retry: 0,
  });
}

export function useUpdatePlaylist(
  props: VideoPlaylist.VideoPlaylistCreateProps = {},
): UseMutationResult<
  VideoPlaylist.CreatePlaylistResponse,
  {
    message?: string;
  },
  VideoPlaylist.UpdatePlaylistAPIMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.editPlaylist(payload), {
    mutationKey: `${KEY} | Create`,
    onSuccess: () => {
      queryClient.invalidateQueries([KEY]);
    },
    retry: 0,
  });
}

export function useAddVideoToPlaylist(
  props: VideoPlaylist.AddVideoToPlaylistCreateProps = {},
): UseMutationResult<
  VideoPlaylist.AddVideoToPlaylistResponse,
  {
    message?: string;
  },
  VideoPlaylist.AddVideoToPlaylistAPIMutationPayload
> {
  return useMutation((payload) => api.addVideoToPlaylist(payload), {
    mutationKey: `${KEY} | Add`,
    retry: 0,
  });
}
export function useUpdateVideoToPlaylist(
  props: VideoPlaylist.AddVideoToPlaylistCreateProps = {},
): UseMutationResult<
  VideoPlaylist.UpdateVideoToPlaylistResponse,
  {
    message?: string;
  },
  VideoPlaylist.UpdateVideoToPlaylistAPIMutationPayload
> {
  return useMutation((payload) => api.updateVideoToPlaylist(payload), {
    mutationKey: `${KEY} | Add`,
    retry: 0,
  });
}
export function useRemoveVideoToPlaylist(
  props: VideoPlaylist.RemoveVideoToPlaylistResponse = {},
): UseMutationResult<
  VideoPlaylist.RemoveVideoToPlaylistResponse,
  {
    message?: string;
  },
  VideoPlaylist.RemoveVideoFromPlaylistAPIMutationPayload
> {
  return useMutation((payload) => api.removeVideoFromPlaylist(payload), {
    mutationKey: `${KEY} | Remove`,
    retry: 0,
  });
}

export function useDeleteVideo(
  props: VideoPlaylist.DeleteVideoPlaylistProps = {},
): UseMutationResult<
  VideoPlaylist.DeleteVideoPlaylistResponse,
  {
    message?: string;
  },
  VideoPlaylist.DeleteVideoPlaylistAPIMutationPayload
> {
  return useMutation((payload) => api.deleteFile(payload), {
    mutationKey: `${KEY} | Delete`,
    retry: 0,
  });
}
