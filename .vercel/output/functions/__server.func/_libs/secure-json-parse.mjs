import { g as getDefaultExportFromCjs } from "./react.mjs";
var secureJsonParse = { exports: {} };
var hasRequiredSecureJsonParse;
function requireSecureJsonParse() {
  if (hasRequiredSecureJsonParse) return secureJsonParse.exports;
  hasRequiredSecureJsonParse = 1;
  const hasBuffer = typeof Buffer !== "undefined";
  const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
  const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function _parse(text, reviver, options) {
    if (options == null) {
      if (reviver !== null && typeof reviver === "object") {
        options = reviver;
        reviver = void 0;
      }
    }
    if (hasBuffer && Buffer.isBuffer(text)) {
      text = text.toString();
    }
    if (text && text.charCodeAt(0) === 65279) {
      text = text.slice(1);
    }
    const obj = JSON.parse(text, reviver);
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    const protoAction = options && options.protoAction || "error";
    const constructorAction = options && options.constructorAction || "error";
    if (protoAction === "ignore" && constructorAction === "ignore") {
      return obj;
    }
    if (protoAction !== "ignore" && constructorAction !== "ignore") {
      if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
        return obj;
      }
    } else if (protoAction !== "ignore" && constructorAction === "ignore") {
      if (suspectProtoRx.test(text) === false) {
        return obj;
      }
    } else {
      if (suspectConstructorRx.test(text) === false) {
        return obj;
      }
    }
    return filter(obj, { protoAction, constructorAction, safe: options && options.safe });
  }
  function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
    let next = [obj];
    while (next.length) {
      const nodes = next;
      next = [];
      for (const node of nodes) {
        if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
          if (safe === true) {
            return null;
          } else if (protoAction === "error") {
            throw new SyntaxError("Object contains forbidden prototype property");
          }
          delete node.__proto__;
        }
        if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
          if (safe === true) {
            return null;
          } else if (constructorAction === "error") {
            throw new SyntaxError("Object contains forbidden prototype property");
          }
          delete node.constructor;
        }
        for (const key in node) {
          const value = node[key];
          if (value && typeof value === "object") {
            next.push(value);
          }
        }
      }
    }
    return obj;
  }
  function parse(text, reviver, options) {
    const stackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return _parse(text, reviver, options);
    } finally {
      Error.stackTraceLimit = stackTraceLimit;
    }
  }
  function safeParse(text, reviver) {
    const stackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return _parse(text, reviver, { safe: true });
    } catch (_e) {
      return null;
    } finally {
      Error.stackTraceLimit = stackTraceLimit;
    }
  }
  secureJsonParse.exports = parse;
  secureJsonParse.exports.default = parse;
  secureJsonParse.exports.parse = parse;
  secureJsonParse.exports.safeParse = safeParse;
  secureJsonParse.exports.scan = filter;
  return secureJsonParse.exports;
}
var secureJsonParseExports = requireSecureJsonParse();
const SecureJSON = /* @__PURE__ */ getDefaultExportFromCjs(secureJsonParseExports);
export {
  SecureJSON as S
};
