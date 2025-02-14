const formatCartToPayment = (cart) => {
  const transaction = {
    total: Number(cart.total?.toFixed(2)),
    products: cart.products.map((product) => ({
      title: product.title,
      quantity: product.quantity,
      price: product.price,
      total_price: product.total_price,
    })),
  };

  return {
    payment_id: `${Math.floor(Math.random() * 1000000)}`,
    transaction,
    status: 'APROBADO',
    creation_date: cart.payment_date,
  };
};

export default formatCartToPayment;
