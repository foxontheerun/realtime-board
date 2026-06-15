import { describe, it, expect } from "vitest";
import { EntityManager, type RemoteShape } from "./EntityManager";

const remote = (over: Partial<RemoteShape> & { id: string }): RemoteShape => ({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  ...over,
});

// replaceAll gives the instance its own array with a known state,
// instead of the shared module-level defaults.
const managerWith = (shapes: RemoteShape[]) => {
  const em = new EntityManager();
  em.replaceAll(shapes);
  return em;
};

describe("EntityManager.findShapeAt", () => {
  it("returns the topmost shape when shapes overlap", () => {
    const em = managerWith([
      remote({ id: "low", x: 0, y: 0, width: 100, height: 100, zIndex: 0 }),
      remote({ id: "high", x: 0, y: 0, width: 100, height: 100, zIndex: 5 }),
    ]);

    expect(em.findShapeAt({ x: 50, y: 50 })?.id).toBe("high");
  });

  it("returns null when the point is outside every shape", () => {
    const em = managerWith([remote({ id: "a", x: 0, y: 0, width: 100, height: 100 })]);

    expect(em.findShapeAt({ x: 500, y: 500 })).toBeNull();
  });

  it.todo("includes points within the margin");
});

describe("EntityManager.findShapesInRect", () => {
  it.todo("returns shapes fully inside the rect");
  it.todo("returns shapes partially overlapping the rect");
  it.todo("excludes shapes outside the rect");
  it.todo("works regardless of drag direction (rect with negative size)");
});

describe("EntityManager.applyShapeEvent", () => {
  it("removes a shape on DELETED", () => {
    const em = managerWith([remote({ id: "a" }), remote({ id: "b" })]);

    em.applyShapeEvent({ type: "DELETED", shape: remote({ id: "a" }) });

    expect(em.getById("a")).toBeNull();
    expect(em.getById("b")).not.toBeNull();
  });

  it.todo("adds a new shape on CREATED");
  it.todo("merges into the existing shape on UPDATED");
  it.todo("resets remote-dragging back to static on UPDATED");
});

describe("EntityManager.applyTransientPatch", () => {
  it.todo("updates the shape position from the patch");
  it.todo("returns becameRemote=true on the first transition to remote-dragging");
  it.todo("returns becameRemote=false while already remote-dragging");
  it.todo("returns becameRemote=false for an unknown id");
});

describe("EntityManager z-index", () => {
  it("getMaxZIndex returns the highest zIndex", () => {
    const em = managerWith([
      remote({ id: "a", zIndex: 2 }),
      remote({ id: "b", zIndex: 7 }),
      remote({ id: "c", zIndex: 4 }),
    ]);

    expect(em.getMaxZIndex()).toBe(7);
  });

  it("getMinZIndex returns the lowest zIndex", () => {
    const em = managerWith([
      remote({ id: "a", zIndex: 2 }),
      remote({ id: "b", zIndex: 7 }),
      remote({ id: "c", zIndex: 4 }),
    ]);

    expect(em.getMinZIndex()).toBe(2);
  });
});
