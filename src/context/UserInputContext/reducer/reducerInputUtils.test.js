import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addField, updateField, removeField } from './reducerInputUtils';

describe('reducerInputUtils', () => {
  // --- Setup for crypto.randomUUID ---
  beforeEach(() => {
    if (!window.crypto) {
      window.crypto = {};
    }
    if (!window.crypto.randomUUID) {
      window.crypto.randomUUID = vi.fn(() => 'mock-uuid-1234');
    }
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // --- Test addField ---
  it('adds a new field with generated ID and correct itemNumber', () => {
    const existingFields = [{ id: '1', itemNumber: 1, name: 'Item A' }];
    const newData = { name: 'Item B' };

    const result = addField(existingFields, newData);

    expect(result).toHaveLength(2);
    // Check first item remains untouched
    expect(result[0]).toEqual(existingFields[0]);

    // Check new item
    expect(result[1]).toMatchObject({
      itemNumber: 2,
      name: 'Item B',
    });
    // Check ID existence
    expect(result[1].id).toBeDefined();
  });

  // --- Test updateField ---
  it('updates the specific field matching the ID', () => {
    const existingFields = [
      { id: '1', name: 'Original Name' },
      { id: '2', name: 'Other Item' },
    ];
    const updatePayload = { id: '1', name: 'Updated Name' };

    const result = updateField(existingFields, updatePayload);

    expect(result[0].name).toBe('Updated Name');
    expect(result[1].name).toBe('Other Item');
  });

  it('does nothing if ID is not found', () => {
    const existingFields = [{ id: '1', name: 'A' }];
    const updatePayload = { id: '99', name: 'B' };

    const result = updateField(existingFields, updatePayload);

    expect(result).toEqual(existingFields);
  });

  // --- Test removeField ---
  it('removes a field and re-indexes itemNumber', () => {
    const existingFields = [
      { id: 'A', itemNumber: 1 },
      { id: 'B', itemNumber: 2 },
      { id: 'C', itemNumber: 3 },
    ];

    const result = removeField(existingFields, 'B');

    expect(result).toHaveLength(2);

    // Check remaining items
    expect(result[0].id).toBe('A');
    expect(result[0].itemNumber).toBe(1);

    expect(result[1].id).toBe('C');
    expect(result[1].itemNumber).toBe(2);
  });
});
