import { submitPlaylist } from "./actions";

export default async function Home() {
  return (
    <main>
      <form>
        <label htmlFor="playlistUrl">playlistUrl:</label>
        <input id="playlistUrl" name="playlistUrl" type="text" required />
        <label htmlFor="name">Mixtape Name:</label>
        <input id="name" name="name" type="text" required />
        <label htmlFor="to">to:</label>
        <input id="to" name="to" type="text" />
        <label htmlFor="from">from:</label>
        <input id="from" name="from" type="text" />
        <label htmlFor="message">message:</label>
        <textarea id="message" name="message" />
        <button formAction={submitPlaylist}>Crear Mixtape</button>
      </form>
    </main>
  );
}
