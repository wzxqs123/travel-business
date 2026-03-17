import useFetch from "../fetch/use-fetch";
import authStore from "./auth-store";
import useApp from "../app/use-app";

const authUrls = ["/dologin", "/logout"];
const useAuth = () => {
  const fetch = useFetch();

  const toLogin = () => {
    localStorage.clear();
    sessionStorage.clear();
    let href = "/";
    if (window.location.href.includes("/invitation-confirmed")) {
      // 加入组织落地页
      href = `/?path=${encodeURIComponent(window.location.href)}`;
    }
    if (!window.location.href.includes("/login")) {
      window.location.href = href;
    }
  };
  //登出
  const logout = (url?: string) => {
    const apps = useApp();
    let logoutUrl = `app/${apps.requestName.value}/common/uaa/auth/logout`;
    // let logoutUrl = `/app/cwd/common/uaa/auth/logout`
    if (!authStore.value.token || authUrls.find((u) => url?.includes(u))) {
      return toLogin();
    }
    return fetch
      .get(logoutUrl, {
        params: {
          redirectUri: `${location.origin}`,
        },
        headers: {
          "x-tenant-header": undefined,
        },
      })
      .then((res) => {
        const token = encodeURIComponent(
          JSON.parse(localStorage.getItem("auth") || "{}").token
        );
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = res + `&Authorization=Bearer ${token}`;
      })
      .catch(() => {
        toLogin();
      });
  };
  //登录
  const login = (appId: string, appType: string, searchStr?: string) => {
    let loginUrl = `app/${appType}/common/uaa/auth/dologin`;

    let redirectUri = `${location.origin}/token.html`;
    if (searchStr) {
      // 组织落地页逻辑
      const { path } = Object.fromEntries(new URLSearchParams(searchStr));
      redirectUri = `${redirectUri}?path=${encodeURIComponent(path)}`;
    }

    return fetch.get(loginUrl, {
      params: {
        redirectUri: redirectUri,
      },
      headers: {
        isToken: false,
        "hix-auth-app-id": appId,
      },
    });
  };
  // 修改密码
  const updatePwd = (phone?: string | null) => {
    const apps = useApp();
    return fetch
      .get(`/app/${apps.requestName.value}/common/uaa/auth/change-password`)
      .then((res) => {
        // window.location.href = res
        window.open(res + `?phone=${phone}`);
      });
  };
  return {
    login,
    logout,
    updatePwd,
    toLogin,
  };
};

export default useAuth;
