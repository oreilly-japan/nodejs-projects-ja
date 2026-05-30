import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let clientPromise: Promise<Client> | null = null;

function getClient(): Promise<Client> {
  if (!clientPromise) {
    clientPromise = (async () => {
      const transport = new StdioClientTransport({
        command: "npx",
        args: ["-y", "@playwright/mcp@latest", "--headless", "--isolated"],
      });
      const client = new Client({
        name: "ai-agent-example",
        version: "1.0.0",
      });
      await client.connect(transport);
      return client;
    })();
  }
  return clientPromise;
}

export async function callMCPTool(
  name: string,
  args: Record<string, unknown>,
): Promise<string> {
  const client = await getClient();
  const result = await client.callTool({ name, arguments: args });
  if (result.isError) {
    throw new Error(`MCP tool "${name}" returned an error: ${stringify(result.content)}`);
  }
  const content = (result.content ?? []) as Array<{ type: string; text?: string }>;
  return content
    .filter((c) => c.type === "text" && typeof c.text === "string")
    .map((c) => c.text as string)
    .join("\n");
}

export async function closeMCPClient(): Promise<void> {
  if (!clientPromise) return;
  const client = await clientPromise;
  await client.close();
  clientPromise = null;
}

function stringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
