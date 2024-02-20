import { X } from "phosphor-react";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

interface ModalTitlePropsType {
  handleFinishUpdatingTransaction: () => void;
  closeModal: () => void;
}

export function ModalTitle({ handleFinishUpdatingTransaction, closeModal }: ModalTitlePropsType) {
  const {updatingTransaction} = useContext(TransactionContext)

  return (
    <header className="p-5 bg-primary w-full flex justify-between">
    <h2 className="font-serif text-secondary text-3xl">
      {updatingTransaction ? "Atualizar Transação" : "Nova Transação"}
    </h2>
    <X onClick={updatingTransaction ? handleFinishUpdatingTransaction : closeModal} size={38} className="text-secondary hover:text-primary hover:bg-secondary transition cursor-pointer rounded-sm" />
  </header>
  )
}