import { CheckCircle } from "phosphor-react";

export function TransactionsTable() {
  return (
    <table className="rounded-2xl overflow-hidden w-full border-spacing-y-2">
      <caption className="h-8 pt-1 caption-bottom text-zinc-50 text-xs font-sans font-light rounded-b-3xl bg-basic/20 border-secondary border-t">
        <CheckCircle size={20} className="p-0.5 mb-0.5 mr-0.5 inline-block text-secondary" />
        indica que o custo é compartilhado.
      </caption>
      <thead className="bg-secondary h-12">
        <tr className=''>
          <th className="text-primary font-sans font-normal py-4 px-4 text-left">Transação</th>
          <th className="text-primary font-sans font-normal py-4 px-4 text-left">Custo</th> 
          <th className="text-primary font-sans font-normal py-4 px-4 text-left">Categoria</th>
          <th className="text-primary font-sans font-normal py-4 px-4 text-left">Data</th>
          <th className="text-primary font-sans font-normal py-4 px-4 text-left">Ações</th>
        </tr>
      </thead>
      <tbody className="bg-basic p-10">
        <tr className="bg-primary/80">
          <td className="text-basic font-sans font-light py-4 px-4">
            Sempre Aki
            <CheckCircle alt='Indica que o custo é compartilhado' className="text-secondary inline-block ms-1 mb-0.5" />
          </td>
          <td className="text-basic font-sans font-light py-4 px-4">R$ 78,90</td>
          <td className="text-basic font-sans font-light py-4 px-4">Alimentação</td>
          <td className="text-basic font-sans font-light py-4 px-4">11/08/2023</td>
          <td className="text-basic font-sans font-light py-4 px-4">Ações</td>
        </tr>

        <tr className="bg-primary/80">
          <td className="text-basic font-sans font-light py-4 px-4">Luz</td>
          <td className="text-basic font-sans font-light py-4 px-4">R$ 168,90</td>
          <td className="text-basic font-sans font-light py-4 px-4">Moradia</td>
          <td className="text-basic font-sans font-light py-4 px-4">11/08/2023</td>
          <td className="text-basic font-sans font-light py-4 px-4">Ações</td>
        </tr>

        <tr className="bg-primary/80">
          <td className="text-basic font-sans font-light py-4 px-4">Fifa 23</td>
          <td className="text-basic font-sans font-light py-4 px-4">R$ 600,00</td>
          <td className="text-basic font-sans font-light py-4 px-4">Lazer</td>
          <td className="text-basic font-sans font-light py-4 px-4">11/08/2023</td>
          <td className="text-basic font-sans font-light py-4 px-4">
            Ações
          </td>
        </tr>
      </tbody>
    </table>
  )
}