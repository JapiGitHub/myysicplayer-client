import React from "react";

export default function Queue({ playQueue, setPlayQueue }: any) {
  const deleteFromQueue = (song: string) => {
    setPlayQueue(
      playQueue.filter((queued: string) => {
        return queued !== song;
      })
    );
  };

  return (
    <>
      <section id="playqueue" className="long-names">
        play queue
        {playQueue.map((queuedSong: string, idx: number) => {
          return (
            <div className="queue-container">
              <article className="queue-song-container long-names">
                #{String(idx + 1).padStart(2, "0")}&nbsp;
                {queuedSong.slice(0, queuedSong.length - 4)}
              </article>
              <div
                className="delete-queue-hamburger"
                id={`queue-list-index-for-testing${idx}`}
                onClick={() => {
                  deleteFromQueue(queuedSong);
                }}
              >
                <aside className="burger-line"></aside>
                <aside className="burger-line"></aside>
              </div>
            </div>
          );
        })}
        {playQueue.length === 0 ? <div id="emptyqueue">empty</div> : null}
      </section>
    </>
  );
}
