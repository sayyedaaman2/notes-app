import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react";
import { beforeEach } from "vitest";
import { afterEach } from "vitest";

beforeEach(()=>{
    console.log("Testing is running ............................................................")
})
afterEach(()=>{
    cleanup();
})