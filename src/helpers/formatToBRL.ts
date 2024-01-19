export function formatToBRL(value: number) {
  return `R$ ${(value/100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}