const baseUrl = "https://theoluwafemi.pythonanywhere.com/api";

export const environment = {
  production: true,
  loginUser: `${baseUrl}/authenticate/`,
  registerUser: `${baseUrl}/profile/`,
  getFeed: `${baseUrl}/feed/`,
  uploadImage: `https://uploader-0012.appspot.com/uploads`,
};
