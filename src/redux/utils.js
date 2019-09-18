export const dataToJsonApiFormat = (type, data) => {
  var dashCasedData = {};
  for(var propertyName in data) {
    dashCasedData[camelCaseToDashCase(propertyName)] = data[propertyName];
  }

  return {
    data: {
      type: camelCaseToDashCase(type),
      attributes: dashCasedData
    }
  }

}

export const camelCaseToDashCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([^0-9])/g, '$1-$2')
    .replace(/([^0-9])([0-9])/g, '$1-$2')
    .replace(/-+/g, '-')
    .toLowerCase();
}
