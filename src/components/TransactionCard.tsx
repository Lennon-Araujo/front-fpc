import { Pencil, Trash, Users } from "phosphor-react";

export function TransactionCard() {
  return (
    <div className="flex gap-3 p-3 bg-primary flex-1 h-auto rounded-2xl">
      <div className="w-2/3 flex flex-col gap-1 text-left">
        <span className="text-sm text-basic mb-1">Supermercado</span>
        <p className="text-xs text-basic">Alimentação</p>
        <p className="text-xs text-basic">Em: 11/08/2023</p>
      </div>
      <div className="w-full text-right flex flex-col gap-1">
        <div className="text-xs text-basic flex justify-end gap-2">
          <Pencil size={20} />
          <Trash size={20} />
        </div>
        <div className="text-xs text-primary flex justify-end">
          <span className="w-fit  bg-secondary rounded-full p-0.5">
            <Users size={20} />
          </span>
        </div>
        <p className="text-sm text-basic">R$ 123,45</p>
      </div>
    </div>
  )
}