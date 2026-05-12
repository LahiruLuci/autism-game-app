/**
 * ml-api.ts
 * Standalone helper for the FastAPI ML prediction API.
 * Re-exports from lib/api.ts for convenience and adds
 * the exact payload shape documented in AGENTS.md.
 */

export type { PredictionResponse, MLApiError } from "./api";
export { predictSupportLevel } from "./api";
