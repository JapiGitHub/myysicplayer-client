import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Sound from "react-sound";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";
import SignIn from "./components/SignIn";
import AllSongs from "./components/AllSongs";
import TopNavBar from "./components/TopNavBar";

//import { createWriteStream } from "fs";

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

  //scrolling title
  const [scrollingTitle, setScrollingTitle] = useState("");

  //DEBUG any pois ja kunnollinen type tilalle
  const [uploadFile, setUploadFile] = useState<any>();
  const [ytdlUrl, setYtdlUrl] = useState<string>("");
  const [showAddSongMenu, setShowAddSongMenu] = useState(false);

  //JWT & SIGN-IN
  const [tokenValid, setTokenValid] = useState(false);
  const [urlToken, setUrlToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYWRtaW4iLCJpYXQiOjE2MzQ4OTk4MDAsImV4cCI6MTYzNTQ5OTgwMH0.dRTg9aE9V9DGb-IfNQuyaqhBXV_rdTcurgzAy2RacqU"
  );

  //get song/URLs list
  useEffect(() => {
    axios
      .get<any>("http://localhost:2000/", {
        headers: { token: urlToken },
      })
      .then(function (response) {
        // handle success
        setSongList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.error("cound get songlist", error);
      });
  }, []);

  //BIISIN VAIHTO
  useEffect(() => {
    setSongElapsed(0);
    //varsinainen biisin vaihto tulee Sound komponentin playStatus proppiin
  }, [selectedSong]);

  //scrolling title
  useEffect(() => {
    //2000 nimen lista jota scrollataan. ei pitäs loppua kesken vaikka ois kuinka pitkä biisi xD
    //react-text-scroll löytyy npm:stä, mut siinä ei voinu säätää et kuinka lyhyt väli tekstien välillä oli.
    const lista: number[] = Array.from(Array(2000).keys());
    const montaTitles: string = lista
      .map((i: any) => {
        return selectedSong.slice(0, selectedSong.length - 4);
      })
      .join("             ☁️              ");
    //jotta monta speissiä toimii ni CSS :       #songname-topbar {white-space: pre-wrap;}
    setScrollingTitle(montaTitles);
  }, [selectedSong]);

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
    //else queue on tyhjä niin arvo math.floor...
    //miten saat biisin loputtua sen poistumaan? ei tarvi koska se poistaa aina ku se menee tän kautta.
    //jos click play aiemmin, niin ylimmän voi poistaa jos on sama kuin klikattu!

    setPlayingOrPaused("PLAYING");
    setSongElapsed(0);
  };

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
          />
        </div>
      ) : (
        <SignIn setTokenValid={setTokenValid} setUrlToken={setUrlToken} />
      )}
    </div>
  );
}

export default App;
