import authentication from "./reducers/authenticate";
import configure from "./reducers/configure";
import user from "./reducers/user";
import ui from "./reducers/ui";
import emailSignIn from "./reducers/email-sign-in";
import emailSignUp from "./reducers/email-sign-up";
import oAuthSignIn from "./reducers/oauth-sign-in";
import requestPasswordReset from "./reducers/request-password-reset";
import updateAccount from './reducers/update-account';
import updatePassword from "./reducers/update-password";
import updatePasswordModal from "./reducers/update-password-modal";
import server from "./reducers/server";
import signOut from "./reducers/sign-out";
import destroyAccount from "./reducers/destroy-account";
import {combineReducers} from "redux-immutablejs";

/* reducers */
export const authStateReducer = combineReducers({
  configure,
  emailSignIn,
  emailSignUp,
  signOut,
  authentication,
  requestPasswordReset,
  oAuthSignIn,
  updateAccount,
  updatePassword,
  updatePasswordModal,
  destroyAccount,
  server,
  ui,
  user,
});

/* actions */
export {configure} from "./actions/configure";
export {authenticate} from "./actions/authenticate";
export {emailSignIn, emailSignInFormUpdate} from "./actions/email-sign-in";
export {signOut} from "./actions/sign-out";
export {emailSignUp, emailSignUpFormUpdate} from "./actions/email-sign-up";
export {oAuthSignIn} from "./actions/oauth-sign-in";
export {requestPasswordReset, requestPasswordResetFormUpdate} from "./actions/request-password-reset";
export {updateAccount, updateAccountFormUpdate} from './actions/update-account';
export {updatePassword, updatePasswordFormUpdate} from "./actions/update-password";
export {updatePasswordModal, updatePasswordModalFormUpdate} from "./actions/update-password-modal";
export {destroyAccount} from "./actions/destroy-account";
export {default as verifyAuth} from "./utils/verify-auth";
export {getApiUrl, getSessionEndpoint} from "./utils/session-storage";
export {
  hideEmailSignInSuccessModal,
  hideEmailSignInErrorModal,
  hideOAuthSignInSuccessModal,
  hideOAuthSignInErrorModal,
  hideSignOutSuccessModal,
  hideSignOutErrorModal,
  hideEmailSignUpSuccessModal,
  hideEmailSignUpErrorModal,
  showFirstTimeLoginSuccessModal,
  showPasswordResetSuccessModal,
  hideFirstTimeLoginSuccessModal,
  hidePasswordResetSuccessModal,
  showFirstTimeLoginErrorModal,
  showPasswordResetErrorModal,
  hideFirstTimeLoginErrorModal,
  hidePasswordResetErrorModal,
  hidePasswordResetRequestSuccessModal,
  hidePasswordResetRequestErrorModal,
  hideUpdatePasswordSuccessModal,
  hideUpdatePasswordErrorModal,
  hideDestroyAccountSuccessModal,
  hideDestroyAccountErrorModal
} from "./actions/ui";

/* utils */
export {default as fetch} from "./utils/fetch";
export {default as axiauth} from "./utils/axiauth";
