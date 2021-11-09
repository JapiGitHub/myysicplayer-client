import { CSSTransition } from "react-transition-group";
import axios from "axios";
import AddSong from "./AddSong";
import Queue from "./Queue";
import "./topNavBar.scss";

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
  setPlayQueue,
  songList,
  setSongList,
  uploadFile,
  ytdlUrl,
  nextSong,
  stopSong,
  setTokenValid,
  setUrlToken,
  urlToken,
  setSearchText,
}: any) {
  const searchSong = (e: any) => {
    setSearchText(e.target.value);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const logoutClick = () => {
    setTokenValid(false);
    localStorage.setItem("myysicplayer-token", "wroong");
    setUrlToken("wrong");
  };

  return (
    <>
      <nav className="sticky-nav" id="sticky-nav">
        <article className="topbar">
          <div className="progressbar-container">
            <aside
              className="progressbar"
              style={{
                left: (songElapsed / selectedSongLength) * 100 - 100 + "vw",
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
            id="urladd-showmenu-button"
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

        <Queue playQueue={playQueue} setPlayQueue={setPlayQueue} />

        <button id="logout-button" onClick={logoutClick} title="Logout">
          logout
        </button>
        <input
          type="text"
          className="search-input"
          onChange={searchSong}
          title="Search song name"
          placeholder="Search"
          id="search-input"
        />
        <CSSTransition
          in={showAddSongMenu}
          timeout={1000}
          classNames="addsong-transition"
          unmountOnExit
        >
          <AddSong
            setUploadFile={setUploadFile}
            uploadFilel={uploadFile}
            songList={songList}
            setSongList={setSongList}
            ytdlUrl={ytdlUrl}
            setYtdlUrl={setYtdlUrl}
            urlToken={urlToken}
            setShowAddSongMenu={setShowAddSongMenu}
          />
        </CSSTransition>
      </nav>
    </>
  );
}
