// server/routes/productRoutes.js
const monitorExecution = require('../utils/performance');

router.get('/products', async (req, res) => {
  const products = await monitorExecution('Fetch Products', () => Product.find());
  res.json(products);
});
