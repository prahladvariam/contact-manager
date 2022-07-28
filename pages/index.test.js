import Home from "./index";
import ContactPage from "./contacts";
import React from 'react';
import { shallow } from "enzyme"

describe("Testing .....", () => {
    it("component rendering", () => {
        const component = shallow(<ContactPage />)
        const listExist = component.find("h1").exists()
        expect(listExist).toBe(true)
    });
})