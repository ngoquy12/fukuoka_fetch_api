import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXZhbnRhbUBnbWFpbC5jb20iLCJpYXQiOjE3NDk2NDM4MDMsImV4cCI6MjY0OTY0MzgwM30.gLB45vxiiTtqK4Jk2ogDJBgk2BWGldKKREdxXjiWQuw`,
  },
});

export default http;
