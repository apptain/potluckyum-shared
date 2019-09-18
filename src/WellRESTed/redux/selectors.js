export const getDoc = (state, schemaName, id) =>
  (state.docs[schemaName] ? state.docs[schemaName][id] : null);
