import React, { useEffect, useState } from "react";
import { AdMax } from "./components/AdMax";
import { MobileView, BrowserView } from "react-device-detect";

import Icon from "../assets/icon.png";
import Twitter from "../assets/twitter.png";
import Discord from "../assets/discord.png";
import GitHubLight from "../assets/githublight.png";
import Mail from "../assets/mail.png";
import WOW from "wow.js";

function A({ className, children, href }: { className?: string, children: React.ReactNode, href: string }) {
  return (
    <a className={`${className} text-blue-600 underline`} target="_blank" rel="noopener noreferrer" href={href}>{children}</a>
  )
}

export default function App() {
  const [animation, setAnimation] = useState(true);
  const [wow, setWow] = useState(new WOW({
    live: false
  }));
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    wow.init();
    const an = localStorage.getItem("animation");
    if (an === "false") {
      setAnimation(false);
      wow.stop();
    } else {
      if (an === null) {
        localStorage.setItem("animation", "true");
      }
    }
    const dm = localStorage.getItem("darkMode");
    if (dm === "true") {
      setDarkMode(true);
    } else {
      if (dm === null) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setDarkMode(true);
          localStorage.setItem("darkMode", "true");
        }
        localStorage.setItem("darkMode", "false");
      }
    }
  }, []);
  const changeAnimation = () => {
    if (animation) {
      localStorage.setItem("animation", "false");
      setAnimation(false);
      wow.stop();
    } else {
      localStorage.setItem("animation", "true");
      setAnimation(true);
      wow.start();
    }
  }
  const changeDarkMode = () => {
    if (darkMode) {
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    } else {
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    }
  }
  console.log(animation);
  return (
    <div className={`${darkMode ? "dark":""}`}>
      <header className="fixed top-0 w-full bg-transparent h-12 z-10">
        <div className="flex justify-around items-center w-full h-full">
          <p>すずねーう</p>
          <div className="flex gap-2">
          </div>
          <div className="flex gap-4 text-xl settings">
            <button onClick={changeAnimation}>
              <span className={`material-symbols-rounded ${animation ? "animate__animated animate__shakeX":""}`}>animation</span>
            </button>
            <button onClick={changeDarkMode}>
              <span className={`material-symbols-rounded ${darkMode ? "filled":""}`}>dark_mode</span>
            </button>
          </div>
        </div>
      </header>
      <main className="relative">
        <div className="grid place-items-center h-dscreen relative bg-[rgb(194,144,228)] bg-[linear-gradient(120deg,_rgba(194,144,228,1)_0%,_rgba(130,211,222,1)_50%,_rgba(252,176,69,1)_100%)] bg-fixed">
          <BrowserView className="absolute left-4">
            <AdMax id="e873c813468ea7ea54379b21179dd127" type="banner" size="160x600" />
          </BrowserView>
          <BrowserView className="absolute right-4">
            <AdMax id="dd16ff173a11fcc0fc93d331249f5e78" type="banner" size="160x600" />
          </BrowserView>
          <MobileView className="absolute top-4">
            <AdMax id="41cbc3496969abfd577aebf2ca1c3e4e" type="banner" />
          </MobileView>
          {/*<AdMax id="94b8cd835ad3a0aa5ce7aea59ed08304" type="overlay" />*/}
          <div className="w-[400px] h-[500px] bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)] flex flex-col items-center animate__animated animate__fadeInUp">
            <div>
              <h1 className="font-bold text-4xl my-4">すずねーう</h1>
            </div>
            <div className="w-full">
              <div className="flex justify-center">
                <img src={Icon} width={80} alt="" className="rounded-full" />
              </div>
              <div className="flex justify-around mt-2 w-full">
                <A href="https://twitter.com/suzuneu_discord">
                  <img src={Twitter} width={30} alt="Twitter" />
                </A>
                <div className="relative cursor-pointer inline-block group">
                  <img src={Discord} width={30} alt="Discord" />
                  <span className="m-0 p-1 hidden absolute text-xs leading-6 text-white rounded-lg bg-black before:absolute before:top-full before:content-[''] before:left-1/2 group-hover:before:border-solid group-hover:before:border-[15px] group-hover:before:border-transparent group-hover:before:border-t-black group-hover:before:ml-[-15px] group-hover:inline-block group-hover:top-[-50px] group-hover:left-[-40px] w-max">すずねーう#8888</span>
                </div>
                <A href="https://github.com/waki285">
                  <img src={GitHubLight} width={30} alt="GitHub" />
                </A>
                <A href="mailto:suzuneu@suzuneu.com">
                  <img src={Mail} width={30} alt="Mail" />
                </A>
              </div>
              <p className="text-center font-bold my-4 text-red-500">偽物湧いてます気をつけてください プロフィールにGitHubの連携がある方が本物です</p>
              <div>
                <p className="my-4 font-bold text-center">Services</p>
                <ul className="my-4 list-disc ml-8">
                  <li><A href="https://suzuneu.com">suzuneu.com</A></li>
                  <li><A href="https://pastedeck.suzuneu.com">Pastedeck</A></li>
                  <li><A href="https://miq.suzuneu.com">MakeItAQuote Discord</A></li>
                  <li><A href="https://rdtools.suzuneu.com">Random Dice Tools</A></li>
                </ul>
              </div>
            </div>
          </div>
          <span className="material-symbols-rounded text-5xl absolute bottom-4">expand_circle_down</span>
        </div>
        <div className="mt-80 wow animate__animated animate__fadeInLeft">Wow!</div>
        <footer className="text-center absolute bottom-2">©2023 suzuneu All rights reserved.</footer>
      </main>
    </div>
  );
};