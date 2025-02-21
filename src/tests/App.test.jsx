import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import App from "../App";
import { expect } from "vitest";
import { it } from "vitest";

describe("Testing App Component",()=>{

    it("Render the Component", ()=>{
        render(<App/>);

        screen.debug()
    })
    it("Render the Component 2 ",()=>{
        render(<App/>);
        expect(screen.getByRole("heading")).toBeInTheDocument();
    })
})