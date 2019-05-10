import {getAccountUpdateUrl}  from "../utils/session-storage";
import {parseResponse} from "../utils/handle-fetch-response";
import extend from "extend";
import fetch from "../utils/fetch";

export const UPDATE_ACCOUNT_START       = "UPDATE_ACCOUNT_START";
export const UPDATE_ACCOUNT_COMPLETE    = "UPDATE_ACCOUNT_COMPLETE";
export const UPDATE_ACCOUNT_ERROR       = "UPDATE_ACCOUNT_ERROR";
export const UPDATE_ACCOUNT_FORM_UPDATE = "UPDATE_ACCOUNT_FORM_UPDATE";
export const UPDATE_ACCOUNT_AUTH        = "UPDATE_ACCOUNT_AUTH";


export const updateAccountFormUpdate = (endpoint, key, value) => {
  return { type: UPDATE_ACCOUNT_FORM_UPDATE, endpoint, key, value };
}
export const updateAccountStart = (endpoint) => {
  return { type: UPDATE_ACCOUNT_START, endpoint };
}
export const updateAccountComplete =(user, endpoint) => {
  return { type: UPDATE_ACCOUNT_COMPLETE, user, endpoint };
}
export const updateAccountAuth = (user) => {
  return { type: UPDATE_ACCOUNT_AUTH, user };
}
export const updateAccountError = (errors, endpoint) => {
  return { type: UPDATE_ACCOUNT_ERROR, errors, endpoint };
}
export const updateAccount = (body, endpointKey) => {
  return dispatch => {
    if (Object.keys(body).length === 0 && body.constructor === Object) {
      return Promise.resolve(dispatch(updateAccountError({}, endpointKey)));
    }
    dispatch(updateAccountStart(endpointKey));

    let data = new FormData();
    console.log(body)
    for (let key in body) {
      if (key === 'auth' && !body[key]) {
        data.append(key, false);
      } else if (body[key]) {
        data.append(key, body[key]);
      }
    }

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
