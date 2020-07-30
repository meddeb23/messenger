import * as types from "./types";
import axios from "axios";

const musicURL = "/api/v1/music";

export const getMusic = () => (dispatch) => {
  dispatch({ type: types.LOADING });

  axios
    .get(musicURL)
    .then((res) => {
      dispatch({
        type: types.GET_MUSIC,
        payload: res.data.songs,
      });
    })
    .catch((err) =>
      dispatch({
        type: types.ACTION_FAIL,
      })
    );
};

export const setCurrentSong = (song) => (dispatch) => {
  dispatch({
    type: types.CURRENT_SONG,
    payload: song,
  });
};

export const getArtist = (artistId) => (dispatch) => {
  dispatch({ type: types.LOADING });

  axios
    .get(`${musicURL}/artist/${artistId}`)
    .then((res) =>
      dispatch({
        type: types.GET_ARTIST,
        artistData: res.data.artist,
        artistMusic: res.data.music,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ACTION_FAIL,
      });
    });
};
