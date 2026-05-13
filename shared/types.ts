/**
 * Shared state shape for the Calculator app.
 *
 * Both the Pi extension and the Sero web UI read/write
 * a JSON file matching this shape.
 */

export interface HistoryEntry {
  id: number;
  expression: string;
  result: string;
  createdAt: string; // ISO string
}

export interface CalcState {
  /** Current display value */
  display: string;
  /** Full expression being built */
  expression: string;
  /** Calculation history (most recent first) */
  history: HistoryEntry[];
  /** Auto-increment ID for history entries */
  nextId: number;
}

export const DEFAULT_CALC_STATE: CalcState = {
  display: '0',
  expression: '',
  history: [],
  nextId: 1,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeHistory(value: unknown): HistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is HistoryEntry => {
    if (!isRecord(entry)) return false;
    return typeof entry.id === 'number'
      && typeof entry.expression === 'string'
      && typeof entry.result === 'string'
      && typeof entry.createdAt === 'string';
  });
}

export function normalizeCalcState(value: unknown): CalcState {
  if (!isRecord(value)) return { ...DEFAULT_CALC_STATE };
  const history = normalizeHistory(value.history);
  const nextId = typeof value.nextId === 'number'
    ? value.nextId
    : history.reduce((max, entry) => Math.max(max, entry.id + 1), 1);
  return {
    display: typeof value.display === 'string' ? value.display : DEFAULT_CALC_STATE.display,
    expression: typeof value.expression === 'string' ? value.expression : DEFAULT_CALC_STATE.expression,
    history,
    nextId,
  };
}
