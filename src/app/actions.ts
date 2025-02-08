"use server";

import { createClient } from "@/app/supabase/server";
import { redirect } from "next/navigation";
import { MixtapeType } from "./mixtape/[id]/page";
import { nanoid } from "nanoid";

export async function submitPlaylist(formData: FormData) {
  const supabase = await createClient();

  const data = {
    name: formData.get("name") as string,
    playlistUrl: formData.get("playlistUrl") as string,
    to: formData.get("to") as string,
    from: formData.get("from") as string,
    message: formData.get("message") as string,
  };
  const playlistId = data.playlistUrl.split("/playlist/")[1]?.split("?")[0];

  // TODO: Error handling
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/app/actions.ts#L15
  if (!playlistId) return redirect("/error");

  // TODO: Confirmar que podems acceder al playlist y que no es privado

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
  if (error) return redirect("/error");

  redirect(`/mixtape/${savedData[0].id}`);
}

export async function getMixtape(slug: string): Promise<MixtapeType | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mixtapes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

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
    console.log(tokenData);
    return null;
  }

  const res = await fetch(`${process.env.SPOTIFY_API_URL}${data.playlist_id}`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const response = await res.json();
  if (!response.tracks) return null;

  return {
    id: data.id,
    name: data.name,
    from: data.from,
    to: data.to,
    message: data.message,
    spotifyUrl: response.external_urls.spotify,
    playlistName: response.name,
    tracks: response.tracks.items.map((item) => ({
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
      })),
    })),
  };
}
