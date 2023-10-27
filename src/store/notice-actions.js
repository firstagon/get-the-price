import { noticeActions as state } from "./notice-slice";

export const showNotice = (str) => {
    return (dispatch) => {
        const m = {
            'loading': { message: "Идет поиск товара", title: "Sending request" },
            'complete': { message: "Товар успешно добавлен", title: "Complete", status: 'complete' },
            'loaded': { message: 'Загрузка завершена', title: 'Complete', status: 'complete' },
            'error': { message: "Ошибка подключения к серверу", title: "Error", status: 'error' },
            'errorLink': { message: "Проверьте ссылку на товар", title: "Error", status: 'error' },
            'errorToFavorite': { message: "Ошибка добавления", title: "Error", status: 'error' },
            'loadiingFeed': { message: "Загрузка ленты товаров", title: "Loading", status: '' },
            'loadedFeed': { message: "С возвращением", title: "Loading", status: 'complete' },
            'unknown': { message: 'unknown', title: 'not handled' }
        }

        dispatch(state.show({
            ...(!!m[str] ? m[str] : m['unknown'])
        }))
    };
};

export const hideNotice = (dispatch) => {
    dispatch(state.hide());
}

