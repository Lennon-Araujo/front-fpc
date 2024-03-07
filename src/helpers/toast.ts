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
    theme: "light",
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
    theme: "light",
    });
}

export function loading(message = "Aguarde um momento...") {
  return toast.loading(message);
}

export function updateSuccessToast(loading: number, message = "Processo concluído com sucesso!", autoClose = 1000) {
  toast.update(loading, {
    render: message,
    type: 'success',
    isLoading: false,
    position: "top-right",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}

export function updateErrorToast(loading: number, message = "Ocorreu um erro inesperado.", autoClose = 1000) {
  toast.update(loading, {
    render: message,
    type: 'error',
    isLoading: false,
    position: "top-right",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}
