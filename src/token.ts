import { createApp } from "vue";
import { urlSafeBase64Decode } from "@/utils/index";

const getQueryString = (name: string) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = window.location.search.substring(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

const accessToken = getQueryString("access_token");

const accessTokenStr = urlSafeBase64Decode(accessToken as string);
const idTokenBase64 = JSON.parse(accessTokenStr).idToken.split(".")[1];
const { cm } = JSON.parse(urlSafeBase64Decode(idTokenBase64));

localStorage.setItem("auth", JSON.stringify({ token: accessToken }));
localStorage.setItem("appName", cm || "b2b-platform");
localStorage.setItem("requestName", "b2b");

import Token from "./Token.vue";

createApp(Token).mount("#app");
