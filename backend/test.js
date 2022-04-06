const orders = [
  {
    type: "hot",
    menu: "Americano",
    price: 12000,
    id: "6236f561e41d4403addc7b51",
    quantity: 2,
    variantWithID: "hot-6236f561e41d4403addc7b51",
  },
  {
    type: "hot",
    menu: "Americano",
    price: 12000,
    id: "6236f561e41d4403addc7b52",
    quantity: 2,
    variantWithID: "hot-6236f561e41d4403addc7b51",
  },
  {
    type: "hot",
    menu: "Americano",
    price: 12000,
    id: "6236f561e41d4403addc7b52",
    quantity: 2,
    variantWithID: "hot-6236f561e41d4403addc7b51",
  },
];

const Transaction = {
  price: 24000,
  paymentMehod: "GOPAY",
  discount: 0,
  promo: "",
};

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

  console.log(parsedData);
};

parseOrder(orders);
