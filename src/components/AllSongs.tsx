import React, { useState, useEffect } from "react";

export default function AllSongs({
  playQueue,
  songList,
  selectedSong,
  setSelectedSong,
  setPlayingOrPaused,
  makeNext,
  searchText,
}: any) {
  const [totalSongsVisible, setTotalSongsVisible] = useState(777);

  //biisi listan CSS-HEIGHT style={{}} määritys. haettaessa lista tietenkin pienenee aina.
  //tehty oma looppi tähän erilleen noista samanlaisista JSX loopeista jotta renderöintejä olis vähemmän.
  useEffect(() => {
    let count = 0;

    songList
      .filter((song: string) => {
        return (
          song === selectedSong ||
          song.toLowerCase().includes(searchText.toLowerCase())
        );
      })
      .map((item: string, idx: number) => {
        count = count + 1;
      });

    setTotalSongsVisible(count);
  }, [searchText]);

  return (
    <>
      <section
        className={(() => {
          switch (true) {
            case totalSongsVisible >= 35 && totalSongsVisible <= 100:
              return "songs-container short-songlist";
            case totalSongsVisible < 35:
              return "songs-container no-search-list";
            default:
              return "songs-container";
          }
        })()}
        style={{ height: totalSongsVisible * 6.4 + 10 + "vh" }}
      >
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
