import axios from "axios";

export const postDetailApi = () => {
    return axios.get("/api/post");
  };

export const commentsApi = (params, LIMIT_TAKE) => {
    return axios.get("/api/comments", {
      params: {
        take: params.get("take") ?? LIMIT_TAKE,
      },
    });
  };

  export const postListApi = (params, LIMIT_TAKE) => {
    return axios.get("/api/posts", {
      params: {
        take: params.get("take") ?? LIMIT_TAKE,
      },
    });
  };