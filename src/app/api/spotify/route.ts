import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playlistUrl = searchParams.get("id");

  let playlistId;

  if (playlistUrl?.includes("/playlist/")) {
    const spotifyId = playlistUrl.split("/playlist/")[1]?.split("?")[0];
    playlistId = spotifyId;
  }

  if (!playlistId) {
    return NextResponse.json({ error: "Missing playlist ID" }, { status: 400 });
  }

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

  if (!tokenRes.ok) {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }

  const tokenData = await tokenRes.json();
  const res = await fetch(`${process.env.SPOTIFY_API_URL}${playlistId}`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const playlist = await res.json();

  if (playlist.error) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
  }

  return NextResponse.json({
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
  });
}
