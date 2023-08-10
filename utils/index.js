// snake_case => camelCase
function convertSnakeToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertSnakeToCamel(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        newObj[camelKey] = convertSnakeToCamel(obj[key]);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

module.exports = {
  convertSnakeToCamel,
};
