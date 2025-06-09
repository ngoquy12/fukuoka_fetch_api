import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXZhbnRhbUBnbWFpbC5jb20iLCJpYXQiOjE3NDk0Nzk2OTAsImV4cCI6MTc0OTQ4MDU1NH0.rTJZIB2tvmBjRD712_plKlLGA0AFLcthYahCbPdFpw4`,
  },
});

export default http;
