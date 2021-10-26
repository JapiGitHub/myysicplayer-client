import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

export default function TopNavBar({
  songElapsed,
  selectedSongLength,
  showAddSongMenu,
  setShowAddSongMenu,
  selectedSong,
  scrollingTitle,
  playQueue,
  setUploadFile,
  setYtdlUrl,
  setSongElapsed,
  setSelectedSong,
  setPlayQueue,
  songList,
  setSongList,
  playingOrPaused,
  setPlayingOrPaused,
  uploadFile,
  ytdlUrl,
  nextSong,
  stopSong,
  setTokenValid,
  setUrlToken,
  setSearchText,
}: any) {
  //
  //ADD SONG
  //
  //UPLOAD TO NODE FROM DISK
  const uploadToNode = (event: any) => {
    console.log("uppload init in react");
    const data: FormData = new FormData();
    console.error(" dataform type ::: ", typeof data);
    data.append("file", uploadFile);

    //et voi console logata data:a koska selain ei ymmärrä sitä. httpbin kautta voi testata onneksi
    /*     Axios.post("http://httpbin.org/anything", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err)); */
    axios
      .post<any>("http://localhost:2000/upload", data)
      .then((res) => {
        console.log(res);
        setSongList([...songList, res.data]);
      })
      .catch((err) => console.log(err));
  };

  //SEND YOUTUBE / SOUNDCLOUD LINK TO BE DOWNLOADED BY NODE
  const uploadFromYT = () => {
    axios
      .post("http://localhost:2000/ytdl", {
        url: ytdlUrl,
      })
      //DEBUG
      .then(function (response) {
        console.log("YTDL RESPONSE : ", response.data);
        setSongList([response.data, ...songList]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFromQueue = (song: string) => {
    setPlayQueue(
      playQueue.filter((queued: string) => {
        return queued !== song;
      })
    );
  };

  const searchSong = (e: any) => {
    setSearchText(e.target.value);
  };

  const logoutClick = () => {
    setTokenValid(false);
    localStorage.setItem("myysicplayer-token", "wroong");
    setUrlToken("wrong");
  };

  return (
    <>
      <nav className="sticky-nav">
        <article className="topbar">
          <div className="progressbar-container">
            <aside
              className="progressbar"
              style={{
                /* 80vw : container width 
                    115 :     progressbar left = -120vw*/
                left: (songElapsed / selectedSongLength) * 77 - 76.5 + "vw",
              }}
            ></aside>
          </div>

          <button onClick={nextSong} id="next-button" title="shuffle next song">
            NEXT
          </button>
          <button onClick={stopSong} title="pause">
            PAUSE
          </button>
          <button
            onClick={() => {
              setShowAddSongMenu(!showAddSongMenu);
            }}
            title="add songs from local disk or URLs"
          >
            add
          </button>
          <aside id="songname-fade-left"></aside>

          <div id="songname-topbar">
            {selectedSong ? "" + scrollingTitle : "Select a song"}
          </div>
        </article>
        <aside className="topbar-fade-down"></aside>

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

        <button id="logout-button" onClick={logoutClick} title="Logout">
          logout
        </button>
        <input
          type="text"
          className="search-input"
          onChange={searchSong}
          title="Search song name"
          placeholder="Search"
        />

        <CSSTransition
          in={showAddSongMenu}
          timeout={1000}
          classNames="addsong-transition"
          unmountOnExit
        >
          <div className="addsong-container">
            <section className="addsong-controls">
              <input
                type="file"
                accept=".mp3, .m4a"
                id="uploadfile-input"
                onChange={(event: any) => {
                  const uploadedFile = event.target.files[0];
                  /* files = FileList jossa sijalla 0 on meidän upload tiedosto.    https://developer.mozilla.org/en-US/docs/Web/API/FileList     An object of this type is returned by the files property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element. It's also used for a list of files dropped into web content when using the drag and drop API; see the DataTransfer object for details on this usage. */
                  setUploadFile(uploadedFile);
                }}
              ></input>
              <label htmlFor="uploadfile-input" id="uploadfile-label">
                Upload to server from local disk
              </label>
              <button
                onClick={uploadToNode}
                className="uploadButton"
                title="send"
              >
                Send to server
              </button>
              <hr className="line" />
              <input
                type="text"
                id="ytdl-input"
                onChange={(e) => setYtdlUrl(e.target.value)}
              ></input>
              <label htmlFor="ytdl-input" id="ytdl-label">
                URL for downloading to server
              </label>

              <button
                onClick={uploadFromYT}
                className="uploadButton"
                title="paste full URL of YouTube or SoundCloud"
              >
                Download to server
              </button>
            </section>
          </div>
        </CSSTransition>
      </nav>
    </>
  );
}
