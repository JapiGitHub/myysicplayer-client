import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import "./mobile.scss";
import "./4k.scss";

import SignIn from "./components/SignIn";
import AllSongs from "./components/AllSongs";
import TopNavBar from "./components/TopNavBar";

import Sound from "react-sound";

function App() {
  interface songObje {
    bytesLoaded: number;
    bytesTotal: number;
    duration: number;
  }

  interface songPlayingObje {
    position: number;
    duration: number;
  }

  type PlayOrPause = "PLAYING" | "STOPPED" | "PAUSED";

  //STATES
  const [songList, setSongList] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [playingOrPaused, setPlayingOrPaused] =
    useState<PlayOrPause>("PLAYING");
  const [playQueue, setPlayQueue] = useState<any>([]);
  const [selectedSongLength, setSelectedSongLength] = useState<number>(0);
  const [songElapsed, setSongElapsed] = useState<number>(0);
  const [searchText, setSearchText] = useState("");
  const [scrollingTitle, setScrollingTitle] = useState("");

  //UPLOAD STATES
  const [uploadFile, setUploadFile] = useState<any>();
  const [ytdlUrl, setYtdlUrl] = useState<string>("");
  const [showAddSongMenu, setShowAddSongMenu] = useState(false);

  //JWT & SIGN-IN STATES
  const [tokenValid, setTokenValid] = useState(false);
  const localstorageToken: string | null =
    localStorage.getItem("myysicplayer-token");
  const [urlToken, setUrlToken] = useState(
    localstorageToken !== null ? localstorageToken : "initialblankwrong"
  );

  const getSongList = () => {
    axios
      .get<string[]>("https://myysic.xyz:443/api/getlist", {
        headers: { token: urlToken },
      })
      .then(function (response) {
        setSongList(response.data);
        setTokenValid(true);
      })
      .catch(function (error) {
        console.log("TOKEN: ", urlToken);
        console.error("couldnt get songlist", error);
      });
  };

  //get song/URLs list first time
  useEffect(() => {
    if (tokenValid) {
      getSongList();
    }
    // eslint-disable-next-line
  }, []);

  //get song/URLs list every time new urlToken
  useEffect(() => {
    if (urlToken !== "initialblankwrong") {
      getSongList();
    }
    // eslint-disable-next-line
  }, [urlToken]);

  useEffect(() => {
    //3000 nimen lista jota scrollataan. ei pitäs loppua kesken vaikka ois kuinka pitkä biisi xD ja riippuu mobilessa kuinka monta riviä tulee titlejä. esim 4k näyttö portrait modessa on mooonta
    //react-text-scroll löytyy npm:stä, mut siinä ei voinu säätää et kuinka lyhyt väli tekstien välillä oli.
    setScrollingTitle(
      `${selectedSong.slice(
        0,
        selectedSong.length - 4
      )}             ☁️              `.repeat(3000)
    );

    setSongElapsed(0);
  }, [selectedSong]);

  //
  //SONG CONTROLS
  //shuffle
  const nextSong = () => {
    if (playQueue.length > 0) {
      setSelectedSong(playQueue[playQueue.length - 1]);
      setPlayQueue(playQueue.slice(1));
    } else {
      setSelectedSong(
        songList[Math.floor(Math.random() * songList.length + 1)]
      );
    }

    setPlayingOrPaused("PLAYING");
  };

  //FAST FORWARD - en halua
  //jos haluais kelauksen:kelaus fast forward ja back
  //tulis ton Sound komponentin playFromPosition propista. sitä on käytetty tossa songElapsed statessa esimerkiksi

  //next
  const makeNext = (nextSong: string) => {
    setPlayQueue([...playQueue, nextSong]);
    console.log(nextSong);
  };

  //STOP
  const stopSong = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (playingOrPaused === "PLAYING") {
      setPlayingOrPaused("PAUSED");
    } else {
      setPlayingOrPaused("PLAYING");
    }
  };

  //sound component props
  const loadingSong = (songObj?: songObje) => {
    //console.log("duration", songObj ? songObj.duration / 1000 : songObj);
    const songLength: number = songObj ? songObj.duration : 0;
    setSelectedSongLength(Math.floor(songLength));
  };

  const playingSong = (songPlaying?: songPlayingObje): void => {
    if (songPlaying) {
      setSelectedSongLength(songPlaying.duration);
      setSongElapsed(songPlaying.position);
    }
  };

  return (
    <div className="App">
      {selectedSong !== "" ? (
        <Sound
          url={`https://myysic.xyz:443/api/bigplaylist/${selectedSong}?token=${urlToken}`}
          playStatus={playingOrPaused}
          onLoading={loadingSong}
          autoLoad={false}
          onFinishedPlaying={nextSong}
          onPlaying={playingSong}
        />
      ) : null}
      {tokenValid ? (
        <div className="all-container">
          <TopNavBar
            songElapsed={songElapsed}
            selectedSongLength={selectedSongLength}
            showAddSongMenu={showAddSongMenu}
            setShowAddSongMenu={setShowAddSongMenu}
            selectedSong={selectedSong}
            scrollingTitle={scrollingTitle}
            playQueue={playQueue}
            setUploadFile={setUploadFile}
            setYtdlUrl={setYtdlUrl}
            setPlayQueue={setPlayQueue}
            songList={songList}
            setSongList={setSongList}
            uploadFile={uploadFile}
            ytdlUrl={ytdlUrl}
            nextSong={nextSong}
            stopSong={stopSong}
            setTokenValid={setTokenValid}
            setUrlToken={setUrlToken}
            urlToken={urlToken}
            setSearchText={setSearchText}
          />
          <AllSongs
            playQueue={playQueue}
            songList={songList}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            setPlayingOrPaused={setPlayingOrPaused}
            makeNext={makeNext}
            searchText={searchText}
          />
        </div>
      ) : (
        <SignIn setTokenValid={setTokenValid} setUrlToken={setUrlToken} />
      )}
    </div>
  );
}

export default App;
