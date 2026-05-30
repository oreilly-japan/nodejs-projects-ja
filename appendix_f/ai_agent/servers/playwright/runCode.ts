import { callMCPTool } from "../../client.js";

// Invoke Playwright MCP's `browser_evaluate` tool and return the parsed
// evaluation result (expected to be a JSON-serializable value).
// `code` should be a function literal to evaluate on the page
// (e.g. `() => document.title`).
export async function runCode<T>(code: string): Promise<T> {
  const text = await callMCPTool("browser_evaluate", { function: code });
  return extractResult<T>(text);
}

// Example response from `browser_evaluate`:
//
//   ### Result
//   [{"title":"...","url":"..."}]
//   ### Ran Playwright code
//   ```js
//   await page.evaluate(...)
//   ```
//
// Extract the body of the `### Result` section and parse it as JSON.
function extractResult<T>(text: string): T {
  const match = text.match(/###\s*Result\s*\n([\s\S]*?)(?=\n###\s|\n?$)/);
  if (!match) {
    throw new Error(`Failed to extract result from browser_evaluate: ${text}`);
  }
  const body = match[1].trim();
  try {
    return JSON.parse(body) as T;
  } catch {
    return body as unknown as T;
  }
}
