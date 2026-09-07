const MAX_SEARCH_LENGTH = 200;

export function validateSearchInput(value: string): string | undefined {
  const normalized = value.trim();
  if (normalized.length === 0) return 'Enter a search term';
  if (normalized.length > MAX_SEARCH_LENGTH) return 'Search term is too long';
  return undefined;
}
