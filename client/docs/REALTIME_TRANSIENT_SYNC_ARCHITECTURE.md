# Realtime Transient Sync Architecture (Board Drag / Multi-Select)

## Why This Document Exists

This is a short reference on **how to correctly design realtime drag synchronization** (especially for multi-select),
to avoid returning to the following problems:

- loss of some transient updates on the remote client;
- choppy rendering of remote shapes during group drag;
- desynchronization between shapes within the same drag group.

---

## The Problem Already Observed

During group dragging, the update stream is very frequent. If events are sent in the format
`1 shape = 1 transient message`, several systemic effects appear:

1. too many small messages and overhead;
2. some events may be dropped in non-blocking pub/sub;
3. the remote client applies patches one by one instead of per frame;
4. visually this looks like jitter/stuttering.

---

## Core Architectural Principle

Split into two independent streams:

1. **Transient stream** (high frequency, lossy is acceptable)
   - only x/y/width/height and service fields;
   - used only for “live” movement.

2. **Persisted stream** (reliable, business-critical)
   - final shape commit after drag/resize completes;
   - used as the source of truth.

In other words, transient is for UX responsiveness, persisted is for consistent state.

---

## Target Protocol Model (Recommended)

### 1) Batch Format for Transient

Instead of the single-shape API:

- `moveShapeTransient(boardId, shape, clientID)`
- `shapeMoved(boardId): TransientShape`

use batching:

- `moveShapesTransient(boardId, shapes[], clientID, dragSessionId, seq, sentAt)`
- `shapesMoved(boardId): ShapesMovedEvent { clientID, dragSessionId, seq, sentAt, shapes[] }`

Benefits:

- frame atomicity (all group shapes arrive together);
- less overhead;
- easier to render with a single redraw.

### 2) Frame Ordering

Add `dragSessionId + seq`:

- `dragSessionId` — identifier of a specific drag gesture;
- `seq` — monotonically increasing frame number within the drag session.

On the receiving side, ignore frames with `seq <= lastSeq` for that session.

### 3) Client Application — Batched

Apply the received frame as a list of patches with **one** redraw after all changes are applied.

---

## Handling Backpressure

For the transient stream, a controlled lossy mode is acceptable:

- bounded subscriber buffer;
- coalescing by `shape.id` within a frame;
- under overload, it is better to drop an outdated transient frame than to block the stream;
- persisted events must never be dropped.

---

## Compatibility and Migration (No Downtime)

1. Add new batch operations to the schema (mutation + subscription).
2. Keep old single-shape operations as deprecated.
3. Migrate the client behind a feature flag:
   - new client: reads batch;
   - old client: continues reading single-shape.

4. After stabilization, remove the legacy branch.

---

## Practical Rules for the Team

- transient must not mutate the domain “truth” in storage;
- persisted update always finalizes the state;
- do not mix responsibilities: transient = UX, persisted = truth;
- for multi-drag, treat the frame as the atomic unit of transmission.

---

## Minimal Pre-Release Checklist

- [ ] group drag is transmitted without losing shapes;
- [ ] the remote client does not render shapes “one by one” within a single frame;
- [ ] out-of-order frames do not roll positions backward;
- [ ] persisted state matches correctly after drag completes;
- [ ] legacy single-shape mode works until migration is finished.

---

## Summary

The correct long-term architecture for realtime shape movement:

- **batch transient on the wire** + **single redraw per frame** + **seq/session ordering**,
- while the persisted channel remains separate, reliable, and defines the final state.

This minimizes jitter, reduces network/CPU load, and makes multi-select behavior predictable.
