import { toast } from 'react-toastify';

export function notify(message: string) {
  toast(message);
}

export function error(message: string) {
  toast.error(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}

export function success(message: string) {
  toast.success(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}

export function loading() {
  return toast.loading("Aguarde um momento...");
}

export function updateSuccessToast(loading: number, message = "Processo concluído com sucesso!") {
  toast.update(loading, {
    render: message,
    type: 'success',
    isLoading: false,
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })
}

export function updateErrorToast(loading: number, message = "Ocorreu um erro inesperado.") {
  toast.update(loading, {
    render: message,
    type: 'error',
    isLoading: false,
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })
}
