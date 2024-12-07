const fs = require("fs");

const {
  User,
  Address,
  Categories,
  Products,
  Comment,
  Order,
  sequelize,
} = require("../models");

async function loadUsers(users) {
  await User.bulkCreate(users, {
    ignoreDuplicates: true, // Var olan birincil anahtar çakışmalarını atlar
  });
  console.log("Users loaded successfully.");
}

async function loadAddresses(addresses) {
  await Address.bulkCreate(addresses);
  console.log("Addresses loaded successfully.");
}

async function loadCategories(categories) {
  await Categories.bulkCreate(categories);
  console.log("Categories loaded successfully.");
}

async function loadProducts(products) {
  for (const product of products) {
    const { categories, ...productData } = product;
    const createdProduct = await Products.create(productData);
    if (categories && categories.length) {
      await createdProduct.addCategories(categories); // Many-to-many relationship
    }
  }
  console.log("Products loaded successfully.");
}

async function loadComments(comments) {
  await Comment.bulkCreate(comments);
  console.log("Comments loaded successfully.");
}

async function loadOrders(orders) {
  for (const order of orders) {
    const { items, ...orderData } = order;
    const createdOrder = await Order.create(orderData);
    createdOrder.items = items;
    await createdOrder.save();
  }
  console.log("Orders loaded successfully.");
}

async function loadData() {
  const data = JSON.parse(
    fs.readFileSync("./updated_coffee_shop_products.json", "utf-8")
  );

  try {
    await loadUsers(data.users);
    await loadAddresses(data.addresses);
    await loadCategories(data.categories);
    await loadProducts(data.products);
    await loadComments(data.comments);
    await loadOrders(data.orders);

    console.log("All data loaded successfully!");
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

loadData();
