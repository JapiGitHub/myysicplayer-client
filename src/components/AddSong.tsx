import React from "react";
import axios from "axios";

export default function AddSong({
  setUploadFile,
  uploadFile,
  songList,
  setSongList,
  ytdlUrl,
  setYtdlUrl,
  urlToken,
  setShowAddSongMenu,
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
      .post<any>("https://myysic.xyz:443/api/upload", data)
      .then((res) => {
        console.log(res);
        setSongList([res.data, ...songList]);
        setShowAddSongMenu(false);
      })
      .catch((err) => console.log(err));
  };

  //SEND YOUTUBE / SOUNDCLOUD LINK TO BE DOWNLOADED BY NODE
  const uploadFromYT = () => {
    axios
      .post(
        "https://myysic.xyz:443/api/ytdl",
        { url: ytdlUrl },
        {
          headers: {
            "Content-type": "application/json",
            token: urlToken,
          },
        }
      )
      .then(function (response) {
        console.log("YTDL RESPONSE : ", response.data);
        setSongList([response.data, ...songList]);
        setShowAddSongMenu(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
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
          <button onClick={uploadToNode} className="uploadButton" title="send">
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
            id="urlclick-yt-button"
            title="paste full URL of YouTube or SoundCloud"
          >
            Download to server
          </button>
        </section>
      </div>
    </div>
  );
}
