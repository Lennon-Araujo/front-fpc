import { X } from "phosphor-react";

interface ModalTitlePropsType {
  handleFinishUpdatingTransaction: () => void;
}

export function ModalTitle({handleFinishUpdatingTransaction}: ModalTitlePropsType) {
  return (
    <header className="p-5 bg-primary w-full flex justify-between">
    <h2 className="font-serif text-secondary text-3xl">
      Atualizar Transação
    </h2>
    <X onClick={handleFinishUpdatingTransaction} size={38} className="text-secondary hover:text-primary hover:bg-secondary transition cursor-pointer rounded-sm" />
  </header>
  )
}