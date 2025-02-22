import "@testing-library/jest-dom"
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from "@testing-library/react";
import { expect, afterEach, beforeEach, beforeAll, afterAll } from "vitest";
import { toast } from '../hooks/useNotification'
import server from "./mock-api-server";

expect.extend(matchers);

beforeEach(() => {
    console.log("BeforeEach.....")
    toast.remove();
})

beforeAll(() => server.listen());

afterEach(() => {
    server.resetHandlers();
    cleanup();
});
afterAll(() => server.close());

const matchMediaMock = vi.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  vi.stubGlobal("matchMedia", matchMediaMock);