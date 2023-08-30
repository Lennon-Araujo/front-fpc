import { Pencil, Trash, Users } from "phosphor-react";

export function TransactionCard() {
  return (
    <div className="flex gap-3 p-3 bg-primary flex-1 justify-between h-auto rounded-2xl">
      <div className="w-2/3 flex flex-col justify-between text-left">
        <span className="text-md text-basic">Supermercado</span>
        <div>
          <p className="text-sm text-basic font-light">Alimentação</p>
          <p className="text-sm text-basic font-light">Em: 11/08/2023</p>
        </div>
      </div>
      <div className="w-full text-right flex flex-col justify-between">
        <div className="text-basic flex justify-end gap-2">
          <Pencil size={20} />
          <Trash size={20} />
        </div>
        <p className="text-md text-basic :">
          <Users size={20} className="inline text-primary bg-secondary rounded-full p-0.5 align-sub mr-2" />
           R$ 123,45
        </p>
      </div>
    </div>
  )
}