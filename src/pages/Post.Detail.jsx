import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SomethingPageNation from "../components/pagenation/Pagenation.Common";
import { commentsApi, postDetailApi } from "../apis/getApi";
import { FetchHook } from "../customHook/fetchHook";

const LIMIT_TAKE = 20;
const PostDetailPage = () => {
  const [params] = useSearchParams();
  const [postDetail, setPostDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);

  const onClickMoreComments = async () => {
    setIsOpenCommentList(true);
    FetchHook(commentsApi, setCommentList, params, LIMIT_TAKE);
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
    FetchHook(postDetailApi, setPostDetail);
  }, []);

  useEffect(() => {
    if (!isOpenCommentList) return;
    FetchHook(commentsApi, setCommentList, params, LIMIT_TAKE);
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
