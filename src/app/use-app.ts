/*
 * @Author: Czy
 * @Date: 2025-02-06 18:28:02
 * @FilePath: /b2b-official-website/src/app/use-app.ts
 *
 */
import { ref } from "vue";

const currentApp = ref(localStorage.getItem("appName"));
const requestName = ref(localStorage.getItem("requestName"));
const sessionId = ref(localStorage.getItem("session"));
const appId = ref(localStorage.getItem("appId"));

const useApp = () => {
  return {
    currentApp,
    requestName,
    sessionId,
    appId,
  };
};

export default useApp;
