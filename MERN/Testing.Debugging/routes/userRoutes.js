// server/routes/userRoutes.js
const logger = require('../utils/logger');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    logger.info('Fetched users successfully');
    res.json(users);
  } catch (err) {
    logger.error('Error fetching users', { error: err.message });
    res.status(500).send('Server Error');
  }
});
