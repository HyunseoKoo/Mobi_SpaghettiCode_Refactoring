export default function listReducer(list, action) {
    switch (action.type) {
        case 'moveToBlog' : {
            const modal = {
                ...list,
                type: action.payload.type,
                text: "정말로 페이지를 이동하겠습니까",
                isOpen: true 
            };

            modal.onConfirm = async () => {
                if(action.payload.state) {modal.isOpen = false};
                window.location.href = action.payload.urlEndPoint;
            }
            return modal;
        };

        case 'keepPrevDialogAttribute' : {
            return {
                ...list,
                ...action.payload,
            }
        };

        case 'onCloseDialog' : {
            return {
                ...list,
                isOpen: false,
            }
        };
    }
}