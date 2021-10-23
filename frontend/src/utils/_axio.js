import axios from "axios";

export const postLyrics = (
  input,
  setResponse,
  onSuccess = () => {},
  onError = () => {}
) => {
  axios
    .post("https://song-lyrics-classifier.herokuapp.com/pred", {
      body: { sentence: input },
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      setResponse({
        error: false,
        ...response.data,
      });
      onSuccess(response);
    })
    .catch((error) => {
      setResponse({
        error: true,
        ...error,
      });
      onError(error);
    });
};
