import axios from "axios";
import { useEffect, useState } from "react";
import { DialLogState, useDiaLogStore } from "../contexts/DialogProvider";
import { useSearchParams } from "react-router-dom";
import SomethingPageNation from "../components/pagenation/Pagenation.Common";
import { postListApi } from "../apis/getApi";

const LIMIT_TAKE = 10;
const PostListPage = () => {
  const [params] = useSearchParams();
  const [postList, setPostList] = useState([]);
  const [, , dispatch] = useDiaLogStore();

  const fetchPostList = async () => {
    const response = await postListApi(params, LIMIT_TAKE);
    setPostList(response.data.Posts);
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("로그인이 필요합니다");
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    fetchPostList();
  }, [params]);

  // useReducer 적용 리팩터링
  const onClickPost = async (postId) => {
    dispatch({type: 'moveToBlog', payload: {
      type: DialLogState.CONFIRM,
      text: "정말로 페이지 이동하겠습니다!",
      state: false,
      urlEndPoint: `/post-detail/${postId}`,
    }})
  };

  return (
    <table>
      <caption>Post List Page</caption>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
      </tr>
      {postList.map((post) => (
        <tr key={post.id} onClick={() => onClickPost(post.id)}>
          <td>{post.title}</td>
          <td>{post.content}</td>
          <td>{post.User.nickName}</td>
        </tr>
      ))}
      <SomethingPageNation data = {'posts'}/>
    </table>
  );
};
export default PostListPage;
