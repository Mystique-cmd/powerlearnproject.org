// Basic CRUD operations
db.books.find({genre: 'Romance'})

db.books.find({published_year: { $gt : 1847}})

db.books.find({author: 'George Orwell'})

db.books.updateOne({title: 'Animal Farm'},{$set: {price: 50.00}})

db.books.deleteOne({title: 'Dystopian'})

//Advanced Queries
db.books.find(
  { inStock: true, year: { $gt: 2010 } }
)

db.books.find(
  { inStock: true, year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
)

db.books.find(
  { inStock: true, year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 })

db.books.find(
  { inStock: true, year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: -1 })

db.books.find(
  { inStock: true, year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 }).limit(5).skip(10)


//Aggregation Pipeline
db.books.aggregate([
  {
    $group: {
      _id: "$genre",                  // group by genre
      averagePrice: { $avg: "$price" } // calculate average price
    }
  },
  {
    $sort: { averagePrice: -1 }       // optional: sort by average price descending
  }
])

db.books.aggregate([
  {
    $group: {
      _id: "$author",                 // group by author
      totalBooks: { $sum: 1 }         // count books
    }
  },
  {
    $sort: { totalBooks: -1 }         // sort by count descending
  },
  {
    $limit: 1                         // keep only the top author
  }
])

db.books.aggregate([
  {
    $project: {
      decade: { $multiply: [ { $floor: { $divide: ["$year", 10] } }, 10 ] }
      // e.g. 2017 → floor(2017/10)=201 → 201*10=2010
    }
  },
  {
    $group: {
      _id: "$decade",                 // group by decade
      count: { $sum: 1 }              // count books in that decade
    }
  },
  {
    $sort: { _id: 1 }                 // sort by decade ascending
  }
])

//Indexing
db.books.createIndex({ title: 1 })

db.books.createIndex({ author: 1, published_year: -1 })

db.books.find({ title: "Dystopian" }).explain("executionStats")
