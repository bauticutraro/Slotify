function authorize() {
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  if (!hashParams.access_token) {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=10387b6d5e8b4da7b09ac055d680fa9e&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=${process.env.REACT_APP_SERVER}`;
  } else {
    localStorage.setItem('token', hashParams.access_token);
  }
}

export default authorize;
