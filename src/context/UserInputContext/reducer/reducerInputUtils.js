export const addField = (fields, newFieldData) => {
  const newField = {
    id: crypto.randomUUID(),
    itemNumber: fields.length + 1,
    ...newFieldData,
  };
  return [...fields, newField];
};

export const updateField = (fields, updatedField) => {
  return fields.map((field) =>
    field.id === updatedField.id ? { ...field, ...updatedField } : field,
  );
};

export const removeField = (fields, idToRemove) => {
  const filtered = fields.filter((field) => field.id !== idToRemove);
  return filtered.map((field, idx) => ({ ...field, itemNumber: idx + 1 }));
};
