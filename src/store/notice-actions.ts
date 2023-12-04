import { noticeActions as state } from "./notice-slice";
import type { AppDispatch } from "./store";

type Tm = {
  [key: string]: {
    message: string;
    title: string;
    status?: string;
  };
};

export const showNotice = (str: string) => {
  return (dispatch: AppDispatch) => {
    const m: Tm = {
      loading: { message: "Идет поиск товара", title: "Sending request" },
      complete: { message: "Товар успешно добавлен", title: "Complete", status: "complete" },
      loaded: { message: "Загрузка завершена", title: "Complete", status: "complete" },
      error: { message: "Ошибка подключения к серверу", title: "Error", status: "error" },
      errorLink: { message: "Проверьте ссылку на товар", title: "Error", status: "error" },
      errorToFavorite: { message: "Ошибка добавления", title: "Error", status: "error" },
      loadiingFeed: { message: "Загрузка ленты товаров", title: "Loading", status: "" },
      loadedFeed: { message: "С возвращением", title: "Loading", status: "complete" },
      unknown: { message: "unknown", title: "not handled" },
    };

    dispatch(
      state.show({
        ...(!!m[str] ? m[str] : m["unknown"]),
      })
    );
  };
};

export const hideNotice = (dispatch: AppDispatch) => {
  dispatch(state.hide());
};
