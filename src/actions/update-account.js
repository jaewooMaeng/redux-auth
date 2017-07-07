import {getAccountUpdateUrl}  from "../utils/session-storage";
import {parseResponse} from "../utils/handle-fetch-response";
import extend from "extend";
import fetch from "../utils/fetch";

export const UPDATE_ACCOUNT_START       = "UPDATE_ACCOUNT_START";
export const UPDATE_ACCOUNT_COMPLETE    = "UPDATE_ACCOUNT_COMPLETE";
export const UPDATE_ACCOUNT_ERROR       = "UPDATE_ACCOUNT_ERROR";
export const UPDATE_ACCOUNT_FORM_UPDATE = "UPDATE_ACCOUNT_FORM_UPDATE";

export function updateAccountFormUpdate(endpoint, key, value) {
  return { type: UPDATE_ACCOUNT_FORM_UPDATE, endpoint, key, value };
}
export function updateAccountStart(endpoint) {
  return { type: UPDATE_ACCOUNT_START, endpoint };
}
export function updateAccountComplete(user, endpoint) {
  return { type: UPDATE_ACCOUNT_COMPLETE, user, endpoint };
}
export function updateAccountError(errors, endpoint) {
  return { type: UPDATE_ACCOUNT_ERROR, errors, endpoint };
}
export function updateAccount(body, endpointKey) {
  return dispatch => {
    dispatch(updateAccountStart(endpointKey));

    let data = new FormData();
    for (let key in body) {
      if (body[key]) {
        data.append(key, body[key]);
      }
    }
    data.append('confirm_success_url', getConfirmationSuccessUrl());

    return fetch(getAccountUpdateUrl(endpointKey), {
      //headers: {
        //"Accept": "application/json",
        //'Content-Type': 'multipart/form-data',
      //},
      method: "put",
      body: data,
    })
      .then(parseResponse)
      .then(({data}) => dispatch(updateAccountComplete(data, endpointKey)))
      .catch(({errors}) => {
        dispatch(updateAccountError(errors, endpointKey))
        throw errors;
      });
  };
}
