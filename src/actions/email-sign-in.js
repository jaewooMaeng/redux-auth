import {
  getEmailSignInUrl,
  setCurrentEndpointKey,
  getCurrentEndpointKey
} from "../utils/session-storage";
import {storeCurrentEndpointKey} from "./configure";
import {parseResponse} from "../utils/handle-fetch-response";
import fetch from "../utils/fetch";

export const EMAIL_SIGN_IN_START       = "EMAIL_SIGN_IN_START";
export const EMAIL_SIGN_IN_COMPLETE    = "EMAIL_SIGN_IN_COMPLETE";
export const EMAIL_SIGN_IN_TEMP        = "EMAIL_SIGN_IN_TEMP";
export const TFA_EMAIL_SIGN_IN_COMPLETE= "TFA_EMAIL_SIGN_IN_COMPLETE";
export const EMAIL_SIGN_IN_ERROR       = "EMAIL_SIGN_IN_ERROR";
export const EMAIL_SIGN_IN_FORM_UPDATE = "EMAIL_SIGN_IN_FORM_UPDATE";

export function emailSignInFormUpdate(endpoint, key, value) {
  return { type: EMAIL_SIGN_IN_FORM_UPDATE, endpoint, key, value };
}
export function emailSignInStart(endpoint) {
  return { type: EMAIL_SIGN_IN_START, endpoint };
}
export function emailSignInComplete(endpoint, user) {
  return { type: EMAIL_SIGN_IN_COMPLETE, user, endpoint };
}
export function emailSignInTemp(endpoint, user) {
  return { type: EMAIL_SIGN_IN_TEMP, user, endpoint };
}
export function tfaEmailSignInComplete() {
  return { type: TFA_EMAIL_SIGN_IN_COMPLETE }
}
export function emailSignInError(endpoint, errors) {
  return { type: EMAIL_SIGN_IN_ERROR, errors, endpoint };
}
export function emailSignIn(body, endpointKey) {
  return dispatch => {
    // save previous endpoint key in case  of failure
    var prevEndpointKey = getCurrentEndpointKey();

    // necessary for fetch to recognize the response as an api request
    setCurrentEndpointKey(endpointKey);
    var currentEndpointKey = getCurrentEndpointKey();

    dispatch(storeCurrentEndpointKey(currentEndpointKey));
    dispatch(emailSignInStart(currentEndpointKey));

    return fetch(getEmailSignInUrl(currentEndpointKey), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(parseResponse)
      .then((user) => {
        console.log(user)
        if(user.data.require_tfa) {
          console.log(user.data.require_tfa)
          dispatch(emailSignInTemp(currentEndpointKey, user))
          return user
        } else {
          console.log(user.data.require_tfa)
          dispatch(emailSignInComplete(currentEndpointKey, user))
          return user
        }
      })
      .catch((errors) => {
        // revert endpoint key to what it was before failed request
        setCurrentEndpointKey(prevEndpointKey);
        dispatch(storeCurrentEndpointKey(prevEndpointKey));
        dispatch(emailSignInError(currentEndpointKey, errors));
        throw errors;
      });
  };
}
