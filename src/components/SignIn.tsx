import React, { useState, useEffect } from "react";
import axios from "axios";
//import useWindowOrientation from "use-window-orientation";
import gsap from "gsap";
import "./signIn.scss";

export default function SignIn({ setTokenValid, setUrlToken }: any) {
  //const { orientation } = useWindowOrientation();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const tlMenu = gsap.timeline({
    defaults: { opacity: 0, duration: 1, stagger: 0.3 },
  });

  useEffect(() => {
    gsap.from("#parallax-back", { y: "5vh" });
    gsap.from("#parallax-middle", { y: "7vh" });
    gsap.from("#parallax-front", { y: "30vh" });

    tlMenu.from(".menu-anim", { y: 50 });
  }, []);

  const loginClick = (e: any) => {
    e.preventDefault();

    axios
      .get<any>("https://myysic.xyz:443/api/login", {
        headers: {
          username: usernameInput,
          password: passwordInput,
        },
      })
      .then(function (response: any) {
        console.error("JWT : TO LOCALSTORAGE ::: ", response.data);
        localStorage.setItem("myysicplayer-token", response.data);
        setTokenValid(true);
        //huom pelkkä tää state ei ole token checki vaan jokaisella latauksella esim joutuu tekemään token checkin noden kanssa.
        setUrlToken(response.data);
        //tää ei muuten sit muutu jos testattessa muutat localstoragesta sitä "myysicplayer-token" valueta.
        //mutta jos välttämättä haluat testata ettei väärällä tokenillä pääse login ikkunan takanakaan tekemään mitään, niin
        //vaihda se devtoolsin react componentsien statesta, ni ei anna kuunnella biisejä enää. eli toimii.
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
      <aside id="sign-lock" data-testid="sign-lock">
        <form>
          <section className="signmenu menu-anim">
            <span className="menu-anim">pls sign in</span>
            <div className="username-input-container menu-anim">
              username
              <input
                type="text"
                id="username-input"
                onChange={(e: any) => setUsernameInput(e.target.value)}
                required
                autoFocus
                data-testid="username-input"
              ></input>
            </div>
            <div className="password-input-container menu-anim">
              password
              <input
                type="password"
                id="password-input"
                onChange={(e: any) => setPasswordInput(e.target.value)}
                required
                data-testid="password-input"
              ></input>
            </div>
            <svg
              className="menu-anim"
              width="46"
              height="27"
              viewBox="0 0 46 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.preventDefault();
                loginClick(e);
              }}
              id="sign-button"
            >
              <g id="svg-lock" clipPath="url(#clip0_1:12)">
                <g id="avain">
                  <path
                    id="Vector"
                    d="M8.0083 23.0133C10.2174 23.0169 12.0113 21.2291 12.0149 19.0199C12.0186 16.8108 10.2307 15.017 8.0216 15.0133C5.81247 15.0096 4.01863 16.7975 4.01496 19.0066C4.01129 21.2158 5.79917 23.0096 8.0083 23.0133Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M10.8697 16.168L19.0332 8.03159"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M18.0316 9.02992L20.0282 11.0332"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M15.0266 12.0249L17.0233 14.0283"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <g id="lukko">
                  <path
                    id="lukkorunko"
                    d="M38 14H28C26.8954 14 26 14.8954 26 16V22C26 23.1046 26.8954 24 28 24H38C39.1046 24 40 23.1046 40 22V16C40 14.8954 39.1046 14 38 14Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="lukkorunko_2"
                    d="M38 14H28C26.8954 14 26 14.8954 26 16V22C26 23.1046 26.8954 24 28 24H38C39.1046 24 40 23.1046 40 22V16C40 14.8954 39.1046 14 38 14Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="ulukko"
                    d="M29 13V11C29 9.93913 29.4214 8.92172 30.1716 8.17157C30.9217 7.42143 31.9391 7 33 7C34.0609 7 35.0783 7.42143 35.8284 8.17157C36.5786 8.92172 37 9.93913 37 11V15"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="avainreika">
                    <path
                      id="Vector_5"
                      d="M33 19C33.5523 19 34 18.5523 34 18C34 17.4477 33.5523 17 33 17C32.4477 17 32 17.4477 32 18C32 18.5523 32.4477 19 33 19Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      id="Rectangle 1"
                      x="32"
                      y="20"
                      width="2"
                      height="2"
                      rx="1"
                      fill="black"
                    />
                    <rect
                      id="Rectangle 2"
                      x="32"
                      y="19"
                      width="2"
                      height="2"
                      fill="black"
                    />
                  </g>
                  <g id="ruuvit">
                    <rect
                      id="Rectangle 3"
                      x="36"
                      y="22"
                      width="2"
                      height="2"
                      rx="1"
                      fill="black"
                    />
                    <rect
                      id="Rectangle 4"
                      x="28"
                      y="22"
                      width="2"
                      height="2"
                      rx="1"
                      fill="black"
                    />
                    <rect
                      id="Rectangle 5"
                      x="28"
                      y="14"
                      width="2"
                      height="2"
                      rx="1"
                      fill="black"
                    />
                    <rect
                      id="Rectangle 6"
                      x="36"
                      y="14"
                      width="2"
                      height="2"
                      rx="1"
                      fill="black"
                    />
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_1:12">
                  <rect width="46" height="27" fill="white" />
                </clipPath>
              </defs>
            </svg>
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

        <img
          src="./parallax.front.png"
          id="parallax-front"
          className="anim1"
        ></img>
        <img
          src="./parallax.middle.png"
          id="parallax-middle"
          className="anim1"
        ></img>
        <img
          src="./parallax.back.png"
          id="parallax-back"
          className="anim1"
        ></img>

        <img src="./parallax.sky.png" id="parallax-sky" className=""></img>

        <aside id="fog"></aside>

        <aside id="spotlight" className="anim1"></aside>
        <aside id="spotlight-2" className="anim1"></aside>

        <section className="lowbar-container">
          045 248 4883
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="feather"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 20l10 -10m0 -5v5h5m-9 -1v5h5m-9 -1v5h5m-5 -5l4 -4l4 -4"></path>
            <path d="M19 10c.638 -.636 1 -1.515 1 -2.486a3.515 3.515 0 0 0 -3.517 -3.514c-.97 0 -1.847 .367 -2.483 1m-3 13l4 -4l4 -4"></path>
          </svg>
          Janne.Korkee@gmail.com
          <div>
            <a href="https://github.com/JapiGitHub" title="checkout my GitHub">
              <svg
                width="292"
                height="292"
                viewBox="0 0 292 292"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="svg-github">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M145.66 22C77.3685 22 22 77.3685 22 145.66C22 213.959 77.3685 269.32 145.66 269.32C213.951 269.32 269.32 213.959 269.32 145.66C269.319 77.3685 213.951 22 145.66 22ZM180.299 239.865C179.588 230.189 178.792 218.201 178.746 213.348C178.437 209.623 178.034 200.147 169.039 194.096C204.753 191.105 221.748 171.366 222.97 145.281C223.99 130.427 218.085 117.365 207.598 106.823C208.131 95.5474 207.257 82.1839 206.532 76.3107C198.478 73.9922 179.697 83.9081 174.449 88.1512C163.381 83.8538 136.293 82.3469 119.83 88.1512C108.16 79.9434 94.8742 74.8734 87.6325 76.2878C80.9469 91.1039 85.2444 105.108 86.5501 106.777C77.9399 114.646 65.9296 124.33 69.1913 144.617C74.4235 174.365 95.353 190.411 129.05 194.336C121.863 195.805 120.649 201.169 120.046 203.495C97.416 212.831 90.9477 197.729 88.0876 193.795C78.5893 182.04 70.0641 185.448 69.5385 185.633C69.0283 185.819 68.642 186.561 68.6964 186.916C69.1752 189.451 74.3462 192.025 74.6009 192.233C81.6108 197.458 84.2078 206.895 85.8072 209.584C95.8624 226.116 119.234 219.261 119.458 219.4C119.474 220.845 119.296 233.011 119.157 242.478C76.5417 230.838 45.186 191.962 45.186 145.66C45.186 90.1675 90.1675 45.1869 145.659 45.1869C201.151 45.1869 246.133 90.1675 246.133 145.66C246.133 188.964 218.696 225.744 180.299 239.865Z"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </section>
      </aside>
    </div>
  );
}
