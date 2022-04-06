const parseOrder = (data) => {
  let parsedData = [];

  if (!Array.isArray(data)) return;

  const a = data.map((val, i) => {
    if (!parsedData[val.id]) {
      delete val.variantWithID;
      delete val.type;
      parsedData[val.id] = {
        ...val,
      };
    } else {
      parsedData[val.id].quantity += val.quantity;
    }
  });

  return parsedData;
};

module.exports = { parseOrder };
