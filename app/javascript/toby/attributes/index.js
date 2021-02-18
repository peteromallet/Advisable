import id from "./id";
import string from "./string";
import belongsTo from "./belongsTo";
import number from "./number";

const attributes = {
  IdColumn: id,
  StringColumn: string,
  NumberColumn: number,
  BelongsToColumn: belongsTo,
};

export function getColumnHandler(type) {
  return attributes[type];
}

export function getColumnRenderComponent(column) {
  return attributes[column.__typename].render;
}

export function getColumnInputComponent(column) {
  if (column.readonly) return getColumnRenderComponent(column);
  return attributes[column.__typename].input;
}

export function getColumnInputValue(record, column) {
  return record[column.field];
}

export default attributes;
