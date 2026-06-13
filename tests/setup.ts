import { vi } from "vitest";

// Mock server-only to allow importing server files in tests
vi.mock("server-only", () => ({}));

// Add global mocks if needed (e.g. Supabase, fetch, etc.)
// Next.js Request/Response polyfills are sometimes needed in node environment,
// but modern Node.js versions (v18+) support Fetch/Request/Response globally.

// Ensure console.error does not pollute clean test runs if expected
// vi.spyOn(console, 'error').mockImplementation(() => {});
