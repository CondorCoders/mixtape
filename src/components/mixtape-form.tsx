"use client";

import { getSpotifyPlaylist, submitPlaylist } from "@/app/actions";
import { Label } from "./label";
import { TextAreaInput } from "./text-area-input";
import { TextInput } from "./text-input";
import { useActionState, useState } from "react";
import { Button } from "./button";
import { CaseBack } from "./case-back";
import { MixtapeType, TrackType } from "@/app/mixtape/[id]/page";
import { CaseFront } from "./case-front";
import { Cassette } from "./cassette";
import { MixtapeSuccessMessage } from "./mixtape-success-message";

export const MixtapeForm = () => {
  const [step, setStep] = useState<number>(1);
  const [state, formAction] = useActionState(submitPlaylist, {});
  const [errors, setErrors] = useState<string | null>();
  const [validPlaylist, setValidPlaylist] = useState(false);
  const [tracks, setTracks] = useState<TrackType[] | undefined>([
    { id: "1", name: "Song 1", artists: [] },
  ]);

  const [formData, setFormData] = useState<Partial<MixtapeType>>({
    name: "",
    spotifyUrl: "",
    playlistName: "",
    to: "",
    from: "",
    message: "",
  });

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setErrors(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaylistVerification = async () => {
    if (!formData.spotifyUrl) return null;

    const playlist = await getSpotifyPlaylist(formData.spotifyUrl);

    if (playlist?.message) {
      setErrors(playlist?.message);
      setValidPlaylist(false);
    } else if ("playlistName" in playlist && "tracks" in playlist) {
      setErrors(null);
      setValidPlaylist(true);
      setTracks(playlist.tracks);
      setFormData((prev) => ({
        ...prev,
        name: playlist.playlistName,
        playlistName: playlist.playlistName,
      }));
    }
  };

  if (state?.type === "success" && state?.message) {
    return (
      <div className="w-full flex flex-col gap-8 items-center justify-center">
        <MixtapeSuccessMessage slug={state.message} />

        <div className="w-full aspect-video max-w-2xl">
          <Cassette
            name={formData.name}
            playlistName={formData.playlistName || "Mixtape"}
            linkText="See Mixtape"
            spotifyUrl={`${window.location.origin}/mixtape/${state.message}`}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <form className="flex flex-col gap-2 w-full md:min-h-96">
        {/* Step 1 */}
        <div className={step !== 1 ? "hidden" : "flex flex-col gap-2"}>
          <>
            <h2 className="text-2xl md:text-3xl font-bold">
              Add your spotify playlist
            </h2>
            <Label
              htmlFor="spotifyUrl"
              text="Spotify Playlist Url (required)"
            />
            <TextInput
              id="spotifyUrl"
              name="spotifyUrl"
              type="text"
              value={formData.spotifyUrl}
              onChange={handleOnChange}
              required
            />
          </>

          <Button
            type="button"
            disabled={!formData.spotifyUrl}
            onClick={handlePlaylistVerification}
          >
            Get Playlist
          </Button>
        </div>

        {/* STEP 2 */}
        <div className={step !== 2 ? "hidden" : "flex flex-col gap-2"}>
          <h2 className="text-2xl md:text-3xl font-bold">
            Add a personalized name
          </h2>
          <Label htmlFor="name" text="Mixtape Name" />
          <TextInput
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleOnChange}
          />
        </div>

        {/* STEP 3 */}
        <div className={step !== 3 ? "hidden" : "flex flex-col gap-2"}>
          <h2 className="text-2xl md:text-3xl font-bold">
            Add a personalized message
          </h2>
          <Label htmlFor="to" text="To" />
          <TextInput
            id="to"
            name="to"
            type="text"
            value={formData.to}
            onChange={handleOnChange}
            maxLength={20}
          />
          <p className="text-xs ml-auto text-gray-500">
            {formData.to?.length || 0}/20
          </p>

          <Label htmlFor="from" text="From" />
          <TextInput
            id="from"
            name="from"
            type="text"
            value={formData.from}
            onChange={handleOnChange}
            maxLength={20}
          />
          <p className="text-xs ml-auto text-gray-500">
            {formData.from?.length || 0}/20
          </p>
          <Label htmlFor="message" text="Message" />
          <TextAreaInput
            id="message"
            name="message"
            value={formData.message}
            onChange={handleOnChange}
            maxLength={140}
            className="h-24"
          />
          <p className="text-xs ml-auto text-gray-500">
            {formData.message?.length || 0}/140
          </p>
        </div>

        {errors && <div className="w-full p-2 bg-red-200">{errors}</div>}
        <div className="flex justify-between mt-auto">
          {step > 1 && (
            <Button type="button" onClick={() => setStep((prev) => prev - 1)}>
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button
              type="button"
              disabled={!formData.spotifyUrl || !validPlaylist}
              onClick={() => setStep((prev) => prev + 1)}
              className="ml-auto"
            >
              Next
            </Button>
          )}
          {step > 2 && (
            <Button
              type="submit"
              formAction={formAction}
              className="ml-auto bg-green-400"
            >
              Create Mixtape
            </Button>
          )}
        </div>
      </form>

      <div className="w-full max-h-60 md:max-h-72 aspect-video">
        {(step === 1 || step === 2) && (
          <CaseBack
            tracks={tracks}
            id={"1"}
            playlistName={
              formData.name || formData.playlistName || "Your Playlist"
            }
          />
        )}
        {(step === 3 || step === 4) && (
          <CaseFront
            id={"1"}
            playlistName={
              formData.name || formData.playlistName || "Your Playlist"
            }
            from={formData.from}
            to={formData.to}
            message={formData.message}
          />
        )}
      </div>
    </div>
  );
};
