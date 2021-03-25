export default {
  render: function Boolean({ record, field }) {
    return record[field.name] ? "✅" : "❌";
  },
};
