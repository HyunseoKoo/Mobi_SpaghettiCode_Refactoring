export default function listReducer(list, action) {
    switch (action.type) {
        case 'moveToBlog' : {
            const modal = {
                ...list,
                type: action.payload.type,
                text: action.payload.text,
                isOpen: true 
            };

            modal.onConfirm = async () => {
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