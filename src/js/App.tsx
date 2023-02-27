import React, { useCallback, useEffect, useRef, useState } from "react";
import { AdMax } from "./components/AdMax";
import { MobileView, BrowserView } from "react-device-detect";

import Icon from "../assets/icon.webp";
import Twitter from "../assets/twitter.webp";
import Discord from "../assets/discord.webp";
import GitHubLight from "../assets/githublight.webp";
import GitHubDark from "../assets/githubdark.webp";
import Mail from "../assets/mail.webp";
import MailDark from "../assets/maildark.webp";
import WOW from "wow.js";

import EN from "../locales/en";
import JA from "../locales/ja";

const LANG = {
  en: EN,
  ja: JA
} as const;

function A({ className, children, href }: { className?: string, children: React.ReactNode, href: string }) {
  return (
    <a className={`${className} text-blue-600 underline`} target="_blank" rel="noopener noreferrer" href={href}>{children}</a>
  )
}

export default function App() {
  const [animation, setAnimation] = useState(true);
  const [animatedStop, setAnimatedStop] = useState<string[]>(["animationIcon"]);
  const [wow, setWow] = useState(new WOW({
    live: false
  }));
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<keyof typeof LANG>("ja");
  const [langMenu, setLangMenu] = useState(false);
  const changeLangMenu = useCallback(() => {
    setLangMenu((s) => !s);
  }, []);
  useEffect(() => {
    wow.init();
    // @ts-expect-error
    window.gwow = wow;
    const an = localStorage.getItem("animation");
    if (an === "false") {
      setAnimation(false);
      wow.stop();
      wow.resetStyle();
      setTimeout(() => {
        wow.resetStyle();
      }, 1000);
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
    setLang(
      (localStorage.getItem("lang") as keyof typeof LANG) || navigator.language.split("-")[0] as keyof typeof LANG === "en" ? "en":"ja"
    )
  }, []);
  const animationIcon = useRef<HTMLButtonElement>(null);
  const changeAnimation = () => {
    setAnimatedStop((s) => s.filter((v) => v !== "animationIcon"));
    if (animation) {
      localStorage.setItem("animation", "false");
      setAnimation(false);
      wow.stop();
      wow.resetStyle();
      const callback = () => {
        setAnimatedStop((s) => [...s, "animationIcon"]);
        animationIcon.current?.removeEventListener("animationend", callback);
      }
      animationIcon.current?.addEventListener("animationend", callback);
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
  return (
    <div className={`${darkMode ? "dark":""} relative`}>
      <header className="fixed top-0 w-full bg-transparent h-12 z-50 font-serif">
        <div className="flex justify-around items-center w-full h-full">
          <p>{LANG[lang]["suzuneu"]}</p>
          <div className="flex gap-2">
          </div>
          <div className="flex gap-4 text-xl settings items-center">
            <button onClick={changeAnimation} className={`relative ${!animation ? "before:content-[''] before:absolute before:rotate-45 before:bg-red-600 before:w-12 before:h-px":""}`}>
              <span className={`material-symbols-rounded ${animatedStop.includes("animationIcon") ? "":animation ? "animate__animated animate__shakeX":"animate__animated animate__fadeOut"}`} ref={animationIcon}>animation</span>
            </button>
            <button onClick={changeDarkMode}>
              <span className={`material-symbols-rounded ${darkMode ? "filled":""} transition-all duration-200 ease-in-out`}>dark_mode</span>
            </button>
            <div className="flex flex-col items-stretch relative">
              <button className="hover:bg-[#ffffff50] focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-50" onClick={changeLangMenu}>
                <p>{LANG[lang]["meta"]["name"]} ({LANG[lang]["meta"]["slug"].toUpperCase()})</p>
                <span className="material-symbols-rounded transition-all duration-200 ease-in-out">{langMenu ? "expand_less":"expand_more"}</span>
              </button>
              <div className={`z-20 absolute top-12 ${langMenu ? "block":"hidden"} rounded-lg bg-white dark:bg-gray-700 divide-y divide-gray-100`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {Object.keys(LANG).map((v) => (
                    <li key={v} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <button onClick={() => {
                        setLang(v as keyof typeof LANG);
                        setLangMenu(false);
                      }} className="block w-full px-4 py-2 text-left dark:hover:text-white">
                        {LANG[v as keyof typeof LANG]["meta"]["name"]} ({LANG[v as keyof typeof LANG]["meta"]["slug"].toUpperCase()})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="relative">
        { /* light bg-[linear-gradient(120deg,_rgba(194,144,228,1)_0%,_rgba(130,211,222,1)_50%,_rgba(252,176,69,1)_100%)] */ }
        { /* linear-gradient(120deg, rgba(155,83,163,1) 0%, rgba(0,112,106,1) 50%, rgba(199,131,0,1) 100%); */ }
        <div className="grid place-items-center h-dscreen relative bg-gradient-to-br from-purple-400 via-teal-300 to-amber-400  
          dark:from-purple-600 dark:via-cyan-800 dark:to-amber-700 bg-fixed font-serif">
          <BrowserView className="absolute left-4">
            <AdMax id="e873c813468ea7ea54379b21179dd127" type="banner" size="160x600" />
          </BrowserView>
          <BrowserView className="absolute right-4">
            <AdMax id="dd16ff173a11fcc0fc93d331249f5e78" type="banner" size="160x600" />
          </BrowserView>
          <MobileView className="absolute top-16">
            <AdMax id="41cbc3496969abfd577aebf2ca1c3e4e" type="banner" />
          </MobileView>
          {/*<AdMax id="94b8cd835ad3a0aa5ce7aea59ed08304" type="overlay" />*/}
          <div className="w-[400px] h-[500px] bg-white dark:bg-black dark:text-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)] flex flex-col items-center animate__animated animate__fadeInUp">
            <div>
              <h1 className="font-bold text-4xl my-4">{LANG[lang]["suzuneu"]}</h1>
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
                  <span className="m-0 p-1 hidden absolute text-xs leading-6 text-white dark:text-black rounded-lg bg-black dark:bg-white before:absolute before:top-full before:content-[''] before:left-1/2 group-hover:before:border-solid group-hover:before:border-[15px] group-hover:before:border-transparent group-hover:before:border-t-black dark:group-hover:before:border-t-white group-hover:before:ml-[-15px] group-hover:inline-block group-hover:top-[-50px] group-hover:left-[-40px] w-max">すずねーう#8888</span>
                </div>
                <A href="https://github.com/waki285">
                  <img src={darkMode ? GitHubDark:GitHubLight} width={30} alt="GitHub" />
                </A>
                <A href="mailto:suzuneu@suzuneu.com">
                  <img src={Mail} width={30} alt="Mail" />
                </A>
              </div>
              <p className="text-center font-bold my-4 text-red-500">{LANG[lang]["spoofingwarn"]}</p>
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
      </main>
      <div className="my-12">
        <section className="ml-12 my-8 wow animate__animated animate__slideInLeft">
          <div className="relative max-w-md">
            <h1 className="font-title text-4xl whitespace-nowrap">{LANG[lang].d["makeTitle"]}</h1>
            <div className="font-sans text-lg">{LANG[lang].d["makeDesc"]}</div>
          </div>
        </section>
        <section className="flex justify-end mr-12 my-8 wow animate__animated animate__slideInRight">
          <div className="relative max-w-md">
            <h1 className="font-title text-4xl whitespace-nowrap">{LANG[lang].noWriteContent}</h1>
            <div className="font-sans text-lg">{LANG[lang].noWriteContent}</div>
          </div>
        </section>
      </div>
      <footer className="text-center mb-2 font-serif">©2023 suzuneu All rights reserved.</footer>
    </div>
  );
};