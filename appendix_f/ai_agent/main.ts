import { closeMCPClient } from "./client.js";
import { navigate } from "./servers/playwright/navigate.js";
import { runCode } from "./servers/playwright/runCode.js";

try {
  await navigate("https://news.ycombinator.com/");

  const top5 = await runCode<{ title: string; url: string }[]>(`
    () =>
      Array.from(document.querySelectorAll(".titleline > a"))
        .slice(0, 5)
        .map((a) => ({
          title: (a.textContent ?? "").trim(),
          url: a.href,
        }))
  `);

  console.log(top5);
} finally {
  await closeMCPClient();
}
