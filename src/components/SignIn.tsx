import React, { useState } from "react";
import axios from "axios";
import useWindowOrientation from "use-window-orientation";

export default function SignIn({ setTokenValid, setUrlToken }: any) {
  const { orientation, portrait, landscape } = useWindowOrientation();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [randomPicture, setRandomPicture] = useState(
    Math.floor(Math.random() * 3) + 1
  );

  const loginClick = (e: any) => {
    e.preventDefault();
    //tähän tulee axioksen login pyyntö
    axios
      .get("http://localhost:2000/login", {
        headers: {
          username: usernameInput,
          password: passwordInput,
        },
      })
      .then(function (response: any) {
        console.error("JWT : ", response.data);
        localStorage.setItem("myysicplayer-token", response.data);
        setTokenValid(true);
        setUrlToken(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setTokenValid(false);
      })
      .then(function () {
        // always executed
      });

    //
    // /login josta node vastaa jotain
    //response = token tai errori
    //jos token niin päästä etusivulle joka yrittäkin heti hakea biisejä
  };

  return (
    <div>
      <aside id="sign-lock">
        <aside className="login-filter filter-a"></aside>
        <aside className="login-filter filter-b"></aside>

        <img
          src={`./${randomPicture}login.background.${orientation}.jpg`}
          id="wallpaper-login"
          alt="login"
        ></img>
        <form>
          <section className="signmenu">
            pls sign in
            <div className="username-input-container">
              username:
              <input
                type="text"
                id="username-input"
                onChange={(e: any) => setUsernameInput(e.target.value)}
                required
                autoFocus
              ></input>
            </div>
            <div className="password-input-container">
              PASSWORD:
              <input
                type="password"
                id="password-input"
                onChange={(e: any) => setPasswordInput(e.target.value)}
                required
              ></input>
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setTokenValid(true);
                loginClick(e);
              }}
              id="signin-button"
            >
              SIGN
            </button>
          </section>
        </form>
      </aside>
    </div>
  );
}
