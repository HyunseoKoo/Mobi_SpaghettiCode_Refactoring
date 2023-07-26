export default function listReducer(list, action) {
    switch (action.type) {
        case 'movePage' : {
            return {
                ...list,
                text: "정말로 이동하겠습니다!",
                isOpen: true,
                onConfirm: async() => {
                    window.location.href = `/post-detail/${postId}`;
                }
            }
        };
        case 'cancelMovePage' : {
            return {
                ...list,
                isOpen: false,
            }
        }
    }
}