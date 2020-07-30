import * as types from "../actions/types";

const initialState = {
  currentSong: null,
  loading: false,
  music: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_MUSIC:
      return {
        ...state,
        music: action.payload,
        loading: false,
      };
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: "there is an error",
      };
    case types.CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    case types.GET_ARTIST:
      return {
        ...state,
        artist: action.artistData,
        artistMusic: action.artistMusic,
        loading: false,
      };
    default:
      return state;
  }
}
