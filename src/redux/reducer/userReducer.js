import * as types from "../actions/actionsType";

const initialState = {
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
    case types.LOGIN_START:
      return { ...state };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return { ...state, currentUser: action.payload };
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
