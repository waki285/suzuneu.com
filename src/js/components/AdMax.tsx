import React, { useEffect } from "react";

type AdmaxAdType = {
  admax_id: string;
  type: string;
};

export const AdMax = (props: { id: string, type: "banner" | "switch" | "overlay", size?: `${number}x${number}`, style?: React.CSSProperties }) => {
  useEffect(() => {
    if (!window["admaxads"]) window["admaxads"] = [];
    const sadmaxads: AdmaxAdType[] = window["admaxads"]!;
    if (!sadmaxads.some(ad => ad.admax_id === props.id))
      sadmaxads.push({
        admax_id: props.id,
        type: props.type
      });
    const tag = document.createElement('script');
    tag.src = 'https://adm.shinobi.jp/st/t.js';
    tag.async = true;
    document.body.appendChild(tag);
    return () => {
      document.body.removeChild(tag);
      sadmaxads.splice(sadmaxads.findIndex(ad =>
        ad.admax_id === props.id), 1);
      window["__admax_tag__"] = undefined;
    }
  }, []);
  const st: React.CSSProperties = { display: "inline-block", ...props.style };
  st.width = props.size ? (props.size.split("x")[0] + "px"):"";
  st.height = props.size ? (props.size.split("x")[1] + "px"):"";
  return props.type === "overlay" ? <></>:<div
    className={props.type === "switch" ? "admax-switch":"admax-ads"}
    data-admax-id={props.id}
    style={st} />
}