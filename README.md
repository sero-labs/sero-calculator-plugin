# @sero-ai/plugin-calc

Modern calculator app for Sero — a standard Pi extension with an optional web UI.

## Sero Plugin Install

Install in **Sero → Admin → Plugins** with:

```text
git:https://github.com/monobyte/sero-calculator-plugin.git
```

Sero clones the source repo, installs its dependencies locally, builds the UI,
and then hot-loads the plugin into the sidebar.

## Pi CLI Usage

Install as a Pi package:

```bash
pi install git:https://github.com/monobyte/sero-calculator-plugin.git
```

The agent gains a `calc` tool (evaluate, history, clear) and a `/calc`
command.

## Sero Usage

When loaded in Sero, the web UI mounts in the main app area and watches
the same state file. Changes from the agent or the UI are reflected
instantly in both directions.

## Tools

| Action     | Description                                |
| ---------- | ------------------------------------------ |
| `evaluate` | Evaluate a math expression (e.g. `2+2*3`) |
| `history`  | Show recent calculation history            |
| `clear`    | Reset the calculator state                 |

Supports standard arithmetic (`+`, `-`, `*`, `/`), parentheses, modulo (`%`),
and exponentiation (`^`).

## Commands

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `/calc`        | Show recent calculation history      |
| `/calc <expr>` | Evaluate expression via the agent    |

## State File

This is a **global-scoped** app — state is stored per-user, not per-workspace:

- **Sero:** `~/.sero-ui/apps/calc/state.json`
- **Pi CLI:** `<workspace>/.sero/apps/calc/state.json`

```json
{
  "display": "42",
  "expression": "6*7",
  "history": [
    {
      "id": 1,
      "expression": "6*7",
      "result": "42",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "nextId": 2
}
```

## Development

```bash
npm install
npm run build      # Build extension + UI
npm run typecheck  # Type-check the UI
npm run dev        # Vite dev server (HMR)
```
