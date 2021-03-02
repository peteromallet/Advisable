export function getType(schema, type) {
  return schema.types.find((t) => t.name === type);
}
