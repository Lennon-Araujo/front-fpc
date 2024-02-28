import { Pencil, Trash } from "phosphor-react";


export function TransactionSkeletonLoading() {
  return (
    <div className="shadow p-3 bg-primary justify-center h-auto rounded-2xl">
      <div className="animate-pulse flex flex-col">
        <header className="flex">
          <div className="w-1/3 h-4 bg-basic/40 rounded"></div>
          <div className="w-2/3 text-basic flex justify-end gap-2">
            <button>
              <Pencil size={20} />
            </button>
            <button>
              <Trash size={20} />
            </button>
          </div>
        </header>
        <div className="flex justify-between mt-2">
          <div className="w-1/2">
            <div className="h-4 bg-basic/40 rounded"></div>
            <div className="h-4 bg-basic/40 rounded mt-2"></div>
          </div>
          <div className="w-1/2 flex justify-end items-end">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
            </span>
            <div className="ml-1 h-4 w-1/5 bg-basic/40 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
