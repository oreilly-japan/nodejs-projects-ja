import { callMCPTool } from "../../client.js";

export async function navigate(url: string): Promise<string> {
  return callMCPTool("browser_navigate", { url });
}
