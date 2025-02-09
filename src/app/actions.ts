"use server";

import { createClient } from "@/app/supabase/server";
import { MixtapeType } from "./mixtape/[id]/page";
import { nanoid } from "nanoid";

export type State = {
  type?: "error" | "success";
  message?: string | null;
};

export async function getSpotifyPlaylist(
  playlistId: string
): Promise<Partial<MixtapeType> | State> {
  let id = playlistId;

  if (playlistId.includes("/playlist/")) {
    const spotifyId = playlistId.split("/playlist/")[1]?.split("?")[0];
    id = spotifyId;
  }
  // Usamos nuestras credenciales de spotify para conseguir un token
  // https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return {
      type: "error",
      message: "Error while retrieving playlist.",
    };
  }

  const res = await fetch(`${process.env.SPOTIFY_API_URL}${id}`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const playlist = await res.json();

  if (playlist.error) {
    return {
      type: "error",
      message:
        "Error while retrieving playlist. The playlist may not exist or is private.",
    };
  }

  return {
    spotifyUrl: playlist.external_urls.spotify,
    playlistName: playlist.name,
    tracks: playlist.tracks.items.map(
      (item: {
        track: {
          id: string;
          name: string;
          artists: { id: string; name: string }[];
        };
      }) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
      })
    ),
  };
}

export async function submitPlaylist(
  prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = await createClient();

  const data = {
    name: formData.get("name") as string,
    playlistUrl: formData.get("spotifyUrl") as string,
    to: formData.get("to") as string,
    from: formData.get("from") as string,
    message: formData.get("message") as string,
  };
  const playlistId = data.playlistUrl.split("/playlist/")[1]?.split("?")[0];

  // TODO: Error handling
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/app/actions.ts#L15
  if (!playlistId) {
    return { type: "error", message: "No Playlist URL provided" };
  }

  const slug = nanoid(10); // Genera id unico para usar en la url

  const { data: savedData, error } = await supabase
    .from("mixtapes")
    .insert([
      {
        to: data.to,
        from: data.from,
        message: data.message,
        playlist_id: playlistId,
        name: data.name,
        slug,
      },
    ])
    .select();

  if (error) {
    return { type: "error", message: "Error while getting mixtape." };
  }

  return { type: "success", message: savedData[0].slug };
}

export async function getMixtape(slug: string): Promise<MixtapeType | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mixtapes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  const playlist: Partial<MixtapeType> | State = await getSpotifyPlaylist(
    data.playlist_id
  );

  if ((playlist as State)?.type === "error") {
    return null;
  }

  if ("tracks" in playlist && !playlist?.tracks) return null;

  return {
    id: data.id,
    name: data.name,
    from: data.from,
    to: data.to,
    message: data.message,
    playlistName: (playlist as MixtapeType).playlistName,
    spotifyUrl: (playlist as MixtapeType).spotifyUrl,
    tracks: (playlist as MixtapeType).tracks,
  };
}
