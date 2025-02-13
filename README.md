# Mixtape Creator 🎶🎧
Website: https://mixtape.condorcoders.com/

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)

## Project Overview

Create and share personalized mixtapes by turning your favorite Spotify playlists into a mixtape with a message! 🎵 This app allows you to dedicate a mixtape to someone special, add a personal touch, and share it easily.

Preview:
![Mixtape Preview](/public/preview.gif)

## Features

- Turn Spotify playlists into personalized mixtapes.
- Add a message and dedicate it to someone special.
- Share the mixtape with a unique link.

## Getting Started

To run this project locally, follow the steps below:

### 1. Clone the repository

```bash
git clone https://github.com/CondorCoders/mixtape.git
cd mixtape
```

### 2. Set up your environment variables

You'll need to set up a few environment variables. Create a `.env.local` file in the root of the project and add the following values:

```
SPOTIFY_API_URL=https://api.spotify.com/v1/playlists/
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Getting Your API Credentials

- **Spotify API**: You can get your **Spotify API credentials** (Client ID and Client Secret) by creating a new application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- **Supabase**: To set up Supabase, sign up at [Supabase](https://supabase.io/) and create a new project. Once your project is created, retrieve your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the project settings.

### 3. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 4. Run the project locally

Run the following command to start the project:

```
npm run dev
```

This will start the app on `http://localhost:3000`. You can open it in your browser to see the app in action.

### Database Setup

To store your mixtape data, you need to create a table in Supabase. Here's the SQL query to create the necessary table:

```sql
CREATE TABLE mixtapes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  from TEXT,
  to TEXT,
  message TEXT,
  playlist_id TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);
```
