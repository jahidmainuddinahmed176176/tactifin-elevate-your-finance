import { c as createSsrRpc } from "./createSsrRpc-DGpMxpJ_.mjs";
import { a as createServerFn } from "./server-BXa69LoB.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-8W3DX73W.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const listThreads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ebbbc99857ac917fa22c2b1d438323ae8fd03205b61e4f2e84e349f57ca98c3c"));
const createThread = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  title: stringType().min(1).max(120).optional()
}).parse(d)).handler(createSsrRpc("67dca520864171111cdf48efef1043d4a0da2d685a1c0b4280bd5013be4b79c9"));
const deleteThread = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("568557aff3b98c509b2e18e3b33bc94e0f42eaf3bf5efa80b0f9c8e64ed87602"));
const getMessages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  threadId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("47486d30f097d8c063c6524c7acf474c3dc33bde29bc270e20e66c205643db72"));
export {
  createThread as c,
  deleteThread as d,
  getMessages as g,
  listThreads as l
};
