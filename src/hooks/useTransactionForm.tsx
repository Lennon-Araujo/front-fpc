import { useState } from "react"

export function useTransactionForm(step) {
  const [currentStep, setCurrentStep] = useState(0)

  return {
    currentStep,
    currentComponent: step[currentStep]
  }

}