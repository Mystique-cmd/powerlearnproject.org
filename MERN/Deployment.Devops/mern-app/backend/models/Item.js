// backend/models/Item.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// Export as default so routes/items.js can import it
export default mongoose.model('Item', ItemSchema);
