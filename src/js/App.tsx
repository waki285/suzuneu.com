import React from "react";

import Icon from "../assets/icon.png";
import Twitter from "../assets/twitter.png";
import Discord from "../assets/discord.png";

function A({ className, children, href }: { className?: string, children: React.ReactNode, href: string }) {
  return (
    <a className={className} target="_blank" rel="noopener noreferrer" href={href}>{children}</a>
  )
}

export default function App() {
  return (
    <main>
      <div className="grid place-items-center h-dscreen relative bg-[rgb(194,144,228)] bg-[linear-gradient(120deg,_rgba(194,144,228,1)_0%,_rgba(130,211,222,1)_50%,_rgba(252,176,69,1)_100%)] bg-fixed">
        <div className="w-[400px] h-[500px] bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)] flex flex-col items-center animate__animated animate__fadeInUp">
          <div>
            <h1 className="font-bold text-4xl my-4">すずねーう</h1>
          </div>
          <div>
            <div className="flex justify-center">
              <img src={Icon} width={80} alt="" className="rounded-full" />
            </div>
            <div className="flex justify-around mt-2">
              <A href="https://twitter.com/suzuneu_discord">
                <img src={Twitter} width={30} alt="Twitter" />
              </A>
              <div className="relative cursor-pointer inline-block group">
                <img src={Discord} width={30} alt="Discord" />
                <span className="m-0 p-1 hidden absolute text-xs leading-6 text-white rounded-lg bg-black before:absolute before:top-full before:content-[''] before:left-1/2 group-hover:before:border-solid group-hover:before:border-[15px] group-hover:before:border-transparent group-hover:before:border-t-black group-hover:before:ml-[-15px] group-hover:inline-block group-hover:top-[-50px] group-hover:left-[-40px] w-max">すずねーう#8888</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};