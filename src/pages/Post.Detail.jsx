import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SomethingPageNation from "../components/pagenation/Pagenation.Common";
import { commentsApi, postDetailApi } from "../apis/getApi";

const LIMIT_TAKE = 20;
const PostDetailPage = () => {
  const [params] = useSearchParams();
  const [postDetail, setPostDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);

  // axios 관심사 분리
  const fetchPostDetail = async () => {
    const res = await postDetailApi();
    setPostDetail(res.data);
  }
  // axios 관심사 분리
  const fetchComments = async () => {
    const res = await commentsApi(params, LIMIT_TAKE);
    setCommentList(res.data.Comments);
  }

  const onClickMoreComments = async () => {
    setIsOpenCommentList(true);
    fetchComments();
  };

  const onClickHiddenComments = () => {
    setIsOpenCommentList(false);
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("로그인이 필요합니다");
      window.location.href = "/";
    }
    fetchPostDetail();
  }, []);

  useEffect(() => {
    if (!isOpenCommentList) return;
    fetchComments();
  }, [params]);

  return (
    <div>
      <h1>Post Detail Page</h1>
      <div>
        <p>제목: {postDetail.title}</p>
        <p>내용: {postDetail.content}</p>
        {!isOpenCommentList && (
          <button onClick={onClickMoreComments}>댓글 보기</button>
        )}
        {isOpenCommentList && (
          <button onClick={onClickHiddenComments}>댓글 숨기기</button>
        )}
        {isOpenCommentList && (
          <>
            {commentList.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.User.nickName}</p>
              </div>
            ))}
            <SomethingPageNation data = {'comments'}/>
          </>
        )}
      </div>
    </div>
  );
};
export default PostDetailPage;
