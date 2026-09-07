import type { SearchCase } from '../../types/search';

export const searchCases: readonly SearchCase[] = [
  {
    name: 'benefits topic',
    value: 'health care',
    valid: true,
  },
  {
    name: 'empty input',
    value: '',
    valid: false,
    expectedMessage: 'Enter a search term',
  },
  {
    name: 'whitespace-only input',
    value: '   ',
    valid: false,
    expectedMessage: 'Enter a search term',
  },
  {
    name: 'long but bounded input',
    value: 'veteran benefits eligibility information '.repeat(4).trim(),
    valid: true,
  },
];
