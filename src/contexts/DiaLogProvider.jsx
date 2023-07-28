import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import Dialog from "../components/Dialog";
import listReducer from "../reducer/list-reducer";

export const DialLogState = {
  ALERT: "ALERT",
  CONFIRM: "CONFIRM",
};

const initialDiaLogAttribute = {
  type: DialLogState.ALERT,
  text: "",
  isOpen: false,
  onConfirm: () => {},
  onCancel: () => {},
  position: {
    x: 50,
    y: 10,
  }
};

const DiaLogContext = createContext();

export const useDiaLogStore = () => useContext(DiaLogContext);
const DiaLogProvider = ({ children }) => {
  const diaLogRef = useRef();

  // useReducer 리팩터링`
  const [diaLogAttribute, dispatch] = useReducer(listReducer, initialDiaLogAttribute);

  useEffect(() => {
    if (diaLogAttribute.isOpen) return diaLogRef.current.showModal();
    diaLogRef.current.close();
  }, [diaLogAttribute.isOpen]);

  // useReducer 적용 리팩터링
  const setKeepPrevDialogAttribute = async (args) => {
    dispatch({type: 'keepPrevDialogAttribute', payload: args});
  };

  // useReducer 적용 리팩터링
  const onCloseDiaLog = () => {
    dispatch({type: 'onCloseDialog'});
  };

  return (
    <DiaLogContext.Provider
      value={[diaLogAttribute, setKeepPrevDialogAttribute, dispatch]}
    >
      {children}
      <Dialog
        {...{ ...diaLogAttribute }}
        ref={diaLogRef}
        onClose={onCloseDiaLog}
      />
    </DiaLogContext.Provider>
  );
};
export default DiaLogProvider;
