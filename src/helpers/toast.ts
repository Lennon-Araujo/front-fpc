import { toast } from 'react-toastify';

export function notify(message: string) {
  toast(message);
}

export function error(message: string) {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
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
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}

export function loading(message: string) {
  return toast.loading(message);
}

export function updateToast(loading: number) {
  toast.update(loading, {
    render: "Transação deletada com sucesso!",
    type: 'success',
    isLoading: false,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })
}
