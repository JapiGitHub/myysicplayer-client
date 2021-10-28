import React from "react";

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
  //TOIMII
  return (
    <>
      <section className="songs-container">
        {songList
          ? songList
              .filter((song: string) => {
                return (
                  song === selectedSong ||
                  song.toLowerCase().includes(searchText.toLowerCase())
                );
              })
              .map((song: string, idx: number) => {
                return (
                  <article
                    className="singlesong-container"
                    key={idx}
                    style={{
                      animationDelay: idx < 35 ? idx * 0.06 + "s" : 0 + "s",
                    }}
                  >
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
              })
          : null}
      </section>
    </>
  );
}
