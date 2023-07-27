export const FetchHook = async (api, setState, params, LIMIT_TAKE) => {
    const res = await api(params, LIMIT_TAKE);
    if(res.data.Comments){
        return setState(res.data.Comments)
    } else
    return setState(res.data);
}

// const fetchPostDetail = async () => {
//     const res = await postDetailApi();
//     setPostDetail(res.data);
//   }
// const fetchComments = async () => {
//     const res = await commentsApi(params, LIMIT_TAKE);
//     setCommentList(res.data.Comments);
// }