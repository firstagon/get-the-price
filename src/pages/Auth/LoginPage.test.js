import React from "react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen, getByRole, getByText, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";

import { Provider, createStore } from 'react-redux';
import store from "../../store/store";
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve({
            isAuth: true,
            token: 'sometoken',
            authLoading: false,
            userId: 'user_id',
            name: "user_name",
        })
    });
});

jest.mock('react-router-dom', () => {
    return {
        Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
    };
});

beforeEach(() => {
    fetch.mockClear();
});

describe("testing login page", () => {

    it('rebdering login form', async () => {
        render(<Provider store={store}><LoginPage /></Provider>);
        expect(screen.getByText(/Быстрый вход/i)).toBeInTheDocument();
        expect(screen.getByText(/\?/i)).toBeInTheDocument();
        expect(screen.getByText(/Войти/i)).toBeInTheDocument();

        // fireEvent.mouseOver(screen.getByText('?'));
        userEvent.hover(screen.getByText('?'));

        await waitFor(() => {
            expect(screen.getByText(/вход под тестовой почтой/i)).toBeInTheDocument();
        })

    })

    test('checking inputs', async () => {
        const user = userEvent.setup()
        render(
                <Provider store={store}>
                    <LoginPage />
                </Provider>
        );
        const login = screen.getByRole('textbox', { id: 'email' });
        const password = screen.getByRole('textbox', { id: 'password' });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            user.type(login, 'firstagon@gmail.com');
            user.type(password, '123456');
            fireEvent.click(screen.getByText('Войти'));
        })
    })

})



