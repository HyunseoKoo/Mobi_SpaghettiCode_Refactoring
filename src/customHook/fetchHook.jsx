export const FetchHook = async (api, setState) => {
    const res = await api();
    if(res.data.comments){
        return setState(res.data.comments)
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