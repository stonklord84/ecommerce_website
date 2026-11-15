// Which homepage collection tab is open. Shared by the Collections tabs and the
// footer's collection links (components/CollectionLink.tsx).
//
// Remembered in sessionStorage (by collection slug, so reordering collections
// doesn't change it), so coming back from a product page reopens it.
// It's forgotten when the browser tab is closed.
const STORAGE_KEY = "collection";
const listeners = new Set<() => void>();

export function readTab(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveTab(slug: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, slug);
  } catch {
    // Storage blocked (e.g. private mode): the tab just won't be remembered.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeTab(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
