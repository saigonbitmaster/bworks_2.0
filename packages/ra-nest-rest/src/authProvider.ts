import { stringify } from "query-string";
import { fetchUtils, AuthProvider } from "ra-core";
import jwt_decode from "jwt-decode";
import { localStorageManager } from "./utils";

/**
 * Check access token for every query to backend
 *
 * Rredirect to login if token is invalid
 *
 * Auto renew access token
 * Login email post data: { authType: email, username: "username", password: "password"}
 * Login email wallet data: { authType: wallet,  walletRewardAddress: "stake1uxww77x845hta4udeaz3s7mt6v3k3cq3qsrw7zy69hjrknc949k54",
    signature: {
        "signature": "84582aa201276761646472657373581de19cef78c7ad2ebed78dcf45187b6bd32368e0110406ef089a2de43b4fa166686173686564f458247061617378376a64364f38645945653245365042756466646165797643387a4a697132435840f0ac7c840ab458ee213b17f5fee38be393944d2894d9bd8a54ba8b6841379f0589d6544fa0b2bd6a2a2576bd88cabbaff01a36b080273a48b1738cec8aacbd08",
        "key": "a40101032720062158200d85a6c0f50c37278214c70e9b4a40edb75d5910f541d22bf3755240af9a5c7e"
    }}
 **/

const authProvider = (
  loginUrl,
  renewTokenUrl,
  logoutUrl,
  loginWalletUrl
): AuthProvider => ({
  login: (data) => {
    if (data.authType === "email")
      return fetchUtils
        .fetchJson(loginUrl, {
          method: "POST",
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        })
        .then(({ json }) => {
          localStorageManager.setItems(
            json.username,
            json.accessToken,
            json.refreshToken,
            json.fullName
          );
        })
        .catch((err) => err);
    if (data.authType === "wallet")
      return fetchUtils
        .fetchJson(loginWalletUrl, {
          method: "POST",
          body: JSON.stringify({
            walletRewardAddress: data.walletRewardAddress,
            signature: data.signature,
          }),
        })
        .then(({ json }) => {
          localStorageManager.setItems(
            json.username,
            json.accessToken,
            json.refreshToken,
            json.fullName
          );
        })
        .catch((err) => err);
  },
  logout: async () => {
    const accessToken = localStorageManager.getItem("accessToken");
    localStorageManager.removeItems();

    let decodedAccessToken, isExpiredAccessToken;
    try {
      decodedAccessToken = jwt_decode(accessToken) as any;
      isExpiredAccessToken = Date.now() >= decodedAccessToken.exp * 1000;
    } catch (err) {
      return Promise.resolve();
    }

    if (!accessToken || isExpiredAccessToken) {
      return Promise.resolve();
    }

    const options = {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    };

    try {
      //remove user refreshToken
      const data = await fetchUtils.fetchJson(logoutUrl, options);
    } catch (error) {
      console.log(error);
    }
    return Promise.resolve();
  },
  checkError: (error) => {
    //access token expire after standBy then require login
    if (error.status === 401 || error.status === 403) {
      localStorageManager.removeItems();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
    const { accessToken, refreshToken } = await localStorageManager.getItems();
    if (!accessToken || !refreshToken) {
      return Promise.reject();
    }

    //before expire 1 mins then refresh token during fetch activities
    const decodedAccessToken = jwt_decode(accessToken) as any;
    const isExpiredAccessToken =
      Date.now() >= decodedAccessToken.exp * 1000 - 600000;

    const decodedJwtRefresh = jwt_decode(refreshToken) as any;
    const isExpiredJwtRefresh =
      Date.now() >= decodedJwtRefresh.exp * 1000 - 60000;

    if (isExpiredJwtRefresh) {
      return Promise.reject();
    }

    if (isExpiredAccessToken) {
      const options = {
        headers: new Headers({
          Authorization: `Bearer ${refreshToken}`,
        }),
      };

      try {
        const data = await fetchUtils.fetchJson(renewTokenUrl, options);

        if (!data) return Promise.reject();

        localStorageManager.setItem("accessToken", data.json.accessToken);
        localStorageManager.setItem("refreshToken", data.json.refreshToken);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    }
  },
  getPermissions: () => Promise.reject("Unknown method"),
  getIdentity: () =>
    Promise.resolve({
      id: "user",
      fullName: localStorageManager.getItem("fullName"),
    }),
});

export default authProvider;
