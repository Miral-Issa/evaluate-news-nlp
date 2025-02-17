/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

beforeAll(() => {
    // Load the actual HTML file into Jest's DOM
    const html = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');
    document.body.innerHTML = html;
});

let isValidUrl; // Declare as 'let' to allow assignment in beforeAll

beforeAll(async () => {
    const module = await import('../src/client/js/formHandler'); // Dynamic import
    isValidUrl = module.isValidUrl; // Assign only the function we need
});

describe('isValidUrl', () => {
      test('should return true for a valid URL', () => {
          expect(isValidUrl('https://example.com')).toBe(true);
          expect(isValidUrl('http://google.com')).toBe(true);
          expect(isValidUrl('https://sub.domain.com/path?query=123')).toBe(true);
      });
  
      test('should return false for an invalid URL', () => {
          expect(isValidUrl('invalid-url')).toBe(false);
          expect(isValidUrl('www.missing-protocol.com')).toBe(false);
          expect(isValidUrl('')).toBe(false);
      });
  });