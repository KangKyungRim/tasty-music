import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getSpotifyToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Token error:", err);
    throw new Error("Spotify token failed");
  }

  const data = await res.json();
  return data.access_token;
}

function buildQuery(
  moods?: string,
  activities?: string,
  styles?: string
) {
  
  const moodMap: Record<string, string> = {
    happy: "happy",
    sad: "sad",
    energetic: "energetic",
    calm: "calm",
    romantic: "romantic",
  };

  const activityMap: Record<string, string> = {
    study: "study",
    workout: "workout",
    relax: "relax",
    party: "party",
  };

  const styleMap: Record<string, string> = {
    pop: "pop",
    rock: "rock",
    jazz: "jazz",
    latin: "latin",
    edm: "electronic",
  };

  const parts: string[] = [];

  if (styles && styleMap[styles]) {
    parts.push(`genre:${styleMap[styles]}`);
  }

  if (moods && moodMap[moods]) {
    parts.push(moodMap[moods]);
  }

  if (activities && activityMap[activities]) {
    parts.push(activityMap[activities]);
  }

  return parts.join(" AND ");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { moods, activities, styles } = body;

    const token = await getSpotifyToken();
    const query = buildQuery(moods, activities, styles);

    if (!query) {
      return NextResponse.json(
        { error: "Empty query" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      q: query,
      type: "track",
      offset: "0",
      limit: "10",
      market: "KR"
    });
    
    const searchUrl = `https://api.spotify.com/v1/search?${params.toString()}`;

    const spotifyRes = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!spotifyRes.ok) {
      const errorBody = await spotifyRes.text();
      console.error("Spotify error body:", errorBody);

      return NextResponse.json(
        { error: "Spotify search failed", detail: errorBody },
        { status: spotifyRes.status }
      );
    }

    const data = await spotifyRes.json();

    if (!data.tracks?.items) {
      return NextResponse.json([]);
    }

    let tracks = data.tracks.items || [];

    const uniqueMap = new Map();

    tracks.forEach((track: { name: string; artists: { name: string; }[]; }) => {
      const key =
        track.name.toLowerCase().trim() +
        "_" +
        track.artists[0]?.name.toLowerCase().trim();
    
      const cleanedKey = key
        .replace(/\(.*?\)/g, "")
        .replace(/-.*$/g, "")
        .trim();
    
      if (!uniqueMap.has(cleanedKey)) {
        uniqueMap.set(cleanedKey, track);
      }
    });
    
    tracks = Array.from(uniqueMap.values());

    tracks.sort((a: { popularity: number; }, b: { popularity: number; }) => b.popularity - a.popularity);

    const topTracks = tracks.slice(0, 25);

    const result = topTracks.slice(0, 10);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}