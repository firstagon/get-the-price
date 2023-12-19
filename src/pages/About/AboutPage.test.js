import React from "react";
import "@testing-library/jest-dom";

import AboutPage from "./AboutPage";

import { render, screen } from "@testing-library/react";

const techs = ['React', 'React router', 'Scss', "mongodb", 'puppeteer']

test('looking for all techs', () => {
    render(<AboutPage> </AboutPage>)

    for (let tech of techs) {
        expect(screen.getAllByText(new RegExp(tech, 'i'))[0]).toBeInTheDocument();
    }
})