import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
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

  const [songList, setSongList] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [playingOrPaused, setPlayingOrPaused] =
    useState<PlayOrPause>("PLAYING");
  const [playQueue, setPlayQueue] = useState<any>([]);

  const [selectedSongLength, setSelectedSongLength] = useState<number>(0);
  const [songElapsed, setSongElapsed] = useState<number>(0);

  const [searchText, setSearchText] = useState("");

  //scrolling title
  const [scrollingTitle, setScrollingTitle] = useState("");

  //DEBUG any pois ja kunnollinen type tilalle
  const [uploadFile, setUploadFile] = useState<any>();
  const [ytdlUrl, setYtdlUrl] = useState<string>("");
  const [showAddSongMenu, setShowAddSongMenu] = useState(false);

  //JWT & SIGN-IN
  const [tokenValid, setTokenValid] = useState(false);
  const localstorageToken: string | null =
    localStorage.getItem("myysicplayer-token");
  const [urlToken, setUrlToken] = useState(
    localstorageToken !== null ? localstorageToken : "initialblankwrong"
  );

  const getSongList = () => {
    axios
      .get<string[]>("http://13.48.136.183:2000/", {
        headers: { token: urlToken },
      })
      .then(function (response) {
        // success
        setSongList(response.data);
        setTokenValid(true);
      })
      .catch(function (error) {
        // handle error
        console.log("TOKEN: ", urlToken);
        console.error("couldnt get songlist", error);
        //DEBUG
        //TOKEN:  initialblankwrong
        //toimii kuitenkin jos saa esim seivaamalla renderöimään uudestaan reactin
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
    //3000 nimen lista jota scrollataan. ei pitäs loppua kesken vaikka ois kuinka pitkä biisi xD ka riippuu mobilessa kuinka monta riviä tulee titlejä. esim 4k näyttö portrait modessa on mooonta
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
    setSongElapsed(0);
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

  //FAST FORWARD
  //jos haluais kelauksen:kelaus fast forward ja back
  //tulis ton Sound komponentin playFromPosition propista. sitä on käytetty tossa songElapsed statessa esimerkiksi

  //STOP
  const stopSong = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (playingOrPaused === "PLAYING") {
      setPlayingOrPaused("STOPPED");
    } else {
      setPlayingOrPaused("PLAYING");
    }
  };

  //jos kutsut tän funktion jsx:ssä alempaa näin:
  //onLoading={loadingSong}   niin toimii ja saa ton songObjectin react-soundilta, mutta jos taas
  //  onLoading={() => loadingSong()} niin jää undefinediksi
  const loadingSong = (songObj?: songObje) => {
    console.error("duration", songObj ? songObj.duration / 1000 : songObj);
    const songLength: number = songObj ? songObj.duration : 0;
    setSelectedSongLength(Math.floor(songLength));
  };

  const playingSong = (songPlaying?: songPlayingObje): void => {
    if (songPlaying) {
      setSelectedSongLength(songPlaying.duration);
      setSongElapsed(songPlaying.position);
    }
  };

  const makeNext = (nextSong: string) => {
    setPlayQueue([...playQueue, nextSong]);
    console.log(nextSong);
  };

  return (
    <div className="App">
      <Sound
        url={`http://13.48.136.183:2000/bigplaylist/${selectedSong}?token=${urlToken}`}
        playStatus={playingOrPaused}
        onLoading={loadingSong}
        autoLoad={false}
        onFinishedPlaying={nextSong}
        playFromPosition={songElapsed}
        onPlaying={playingSong}
      />
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
            setSongElapsed={setSongElapsed}
            setSelectedSong={setSelectedSong}
            setPlayQueue={setPlayQueue}
            songList={songList}
            setSongList={setSongList}
            playingOrPaused={playingOrPaused}
            setPlayingOrPaused={setPlayingOrPaused}
            uploadFile={uploadFile}
            ytdlUrl={ytdlUrl}
            nextSong={nextSong}
            stopSong={stopSong}
            setTokenValid={setTokenValid}
            setUrlToken={setUrlToken}
            setSearchText={setSearchText}
          />
          <AllSongs
            playQueue={playQueue}
            songList={songList}
            songElapsed={songElapsed}
            selectedSong={selectedSong}
            playingOrPaused={playingOrPaused}
            urlToken={urlToken}
            setSongElapsed={setSongElapsed}
            setSelectedSong={setSelectedSong}
            setPlayQueue={setPlayQueue}
            setPlayingOrPaused={setPlayingOrPaused}
            setSelectedSongLength={setSelectedSongLength}
            nextSong={nextSong}
            loadingSong={loadingSong}
            playingSong={playingSong}
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
