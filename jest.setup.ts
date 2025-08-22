import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "@jest/globals";
import { setupServer } from "msw/node";

// This is the MSW server instance that will be used across all tests
// Start with no handlers, tests will add specific handlers as needed
export const server = setupServer();

// Establish API mocking before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished
afterAll(() => {
  server.close();
});
