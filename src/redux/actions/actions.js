import * as types from "./actionsType";
import { auth } from "../../utils/init-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
} from "firebase/auth";

const registerStart = () => ({
  type: types.REGISTER_START,
});
const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});
const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});
const loginStart = () => ({
  type: types.LOGIN_START,
});
const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});
const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

export const registerInitiate = (email, password, displayName) => {
  return (dispatch) => {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // user.updateProfile({
        //   displayName,
        // });
        dispatch(registerSuccess(user));
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
};

export const loginInitiate = (email, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // user.updateProfile({
        //   displayName,
        // });
        dispatch(loginSuccess(user));
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};
