import { test, expect } from "@playwright/test";

test("a shape drawn in one client is broadcast to another", async ({
  browser,
}) => {
  const contextA = await browser.newContext();
  const contextB = await browser.newContext();
  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();

  // B should receive the shape event over its websocket. Attach before goto so
  // the listener is in place when Apollo opens the subscription socket.
  const shapeEventOnB = new Promise<void>((resolve) => {
    pageB.on("websocket", (ws) => {
      ws.on("framereceived", (frame) => {
        const data = typeof frame.payload === "string" ? frame.payload : "";
        if (data.includes("shapeEvents")) resolve();
      });
    });
  });

  await pageA.goto("/test");
  await pageB.goto("/test");
  await expect(pageA.getByText("Realtime Board")).toBeVisible();
  await expect(pageB.getByText("Realtime Board")).toBeVisible();

  await pageA.getByTitle("Rectangle").click();
  await expect(pageA.getByText("Fill color")).toBeVisible();
  await pageA.mouse.move(520, 300);
  await pageA.mouse.down();
  await pageA.mouse.move(660, 420, { steps: 8 });
  await pageA.mouse.up();

  await shapeEventOnB;

  await contextA.close();
  await contextB.close();
});
