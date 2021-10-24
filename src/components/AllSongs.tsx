import React from "react";
import Sound from "react-sound";

export default function AllSongs({
  playQueue,
  songList,
  songElapsed,
  selectedSong,
  playingOrPaused,
  urlToken,
  setSongElapsed,
  setSelectedSong,
  setPlayQueue,
  setPlayingOrPaused,
  setSelectedSongLength,
  nextSong,
  loadingSong,
  playingSong,
  makeNext,
  searchText,
}: any) {
  return (
    <>
      <section className="songs-container">
        {songList
          ? songList.map((song: string, idx: number) => {
              if (song.includes(searchText)) {
                return (
                  <article
                    className="singlesong-container"
                    key={idx}
                    style={{
                      animationDelay:
                        idx < 35 ? idx * 0.04 + 0.4 + "s" : 1.5 + "s",
                    }}
                  >
                    <Sound
                      url={`http://${window.location.hostname}:2000/bigplaylist/${song}?token=${urlToken}`}
                      playStatus={
                        selectedSong === song && playingOrPaused === "PLAYING"
                          ? "PLAYING"
                          : "STOPPED"
                      }
                      onLoading={loadingSong}
                      autoLoad={false}
                      onFinishedPlaying={nextSong}
                      playFromPosition={
                        selectedSong === song ? songElapsed : undefined
                      }
                      onPlaying={playingSong}
                    />
                    <button
                      className={
                        selectedSong === song
                          ? "selected long-names"
                          : "long-names"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedSong(song);
                        setPlayingOrPaused("PLAYING");
                      }}
                      title="click to play"
                    >
                      <span>#{String(idx + 1).padStart(3, "0")}</span>
                      &nbsp;&nbsp;
                      {song.slice(0, song.length - 4)}
                    </button>
                    <div
                      className="make-next-button"
                      onClick={() => {
                        makeNext(song);
                      }}
                      title={`add to queue in place ${playQueue.length + 1}.`}
                    >
                      queue
                    </div>
                  </article>
                );
              }
            })
          : null}
      </section>
    </>
  );
}
