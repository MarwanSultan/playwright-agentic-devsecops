import { describe, expect, it } from 'vitest';

import { searchCases } from '../data/ui/search-cases';
import { validateSearchInput } from '../utils/validation/search-input';

describe('validateSearchInput', () => {
  it.each(searchCases)('handles $name', ({ value, expectedMessage }) => {
    expect(validateSearchInput(value)).toBe(expectedMessage);
  });

  it('rejects values above the supported boundary', () => {
    expect(validateSearchInput('a'.repeat(201))).toBe('Search term is too long');
  });
});
