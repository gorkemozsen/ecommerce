const { Op } = require("sequelize");
const { Address, Sequelize } = require("../models");
const { default: axios } = require("axios");
const asyncHandler = require("../utilities/asyncHandler");
const addressApiClient = require("../utilities/axiosAddressInstance");

exports.getAllAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.findAll();
  res.status(200).json(addresses);
});

exports.createAddress = asyncHandler(async (req, res) => {
  // Token'dan gelen userId
  const userId = req.user.id;

  // İstekten gelen adres bilgileri
  const {
    addressTitle,
    city,
    district,
    neighborhood,
    street,
    addressLine1,
    addressLine2,
  } = req.body;

  // Kullanıcının mevcut adreslerini kontrol et
  const existingAddresses = await Address.findAll({ where: { userId } });

  // Eğer kullanıcının hiç adresi yoksa, isDefault zorunlu olarak true olacak
  const isDefault = existingAddresses.length === 0;

  // Yeni adres oluştur
  const newAddress = await Address.create({
    addressTitle,
    city,
    district,
    neighborhood,
    street,
    addressLine1,
    addressLine2,
    userId,
    isDefault, // Zorunlu olarak true olacak ya da mevcut default adres durumuna bağlı kalacak
  });

  res.status(201).json({
    message: "Address created successfully.",
    address: newAddress,
  });
});

exports.updateAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Token'dan gelen userId
  const addressId = req.params.addressId; // Güncellenecek adres ID
  const {
    addressTitle,
    city,
    district,
    neighborhood,
    street,
    addressLine1,
    addressLine2,
    isDefault,
  } = req.body;

  // Güncellenmek istenen adresi getir
  const address = await Address.findByPk(addressId);
  if (!address) {
    return res.status(404).json({ message: "Address not found." });
  }

  // Kullanıcı yetkisi kontrolü
  if (address.userId !== userId) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this address." });
  }

  // Eğer isDefault: false yapılmak isteniyorsa bunu engelle
  if (address.isDefault === true && isDefault === false) {
    return res.status(400).json({
      message:
        "You cannot unset the default address directly. Set another address as default instead.",
    });
  }

  // Eğer isDefault: true yapılmak isteniyorsa, diğer adreslerin isDefault'unu false yap
  if (isDefault === true) {
    await Address.update(
      { isDefault: false },
      { where: { userId, id: { [Op.ne]: addressId } } } // Diğer adresler
    );
  }

  // Güncellenecek alanları belirle
  const updateFields = {
    addressTitle,
    city,
    district,
    neighborhood,
    street,
    addressLine1,
    addressLine2,
  };
  if (isDefault !== undefined) {
    updateFields.isDefault = isDefault;
  }

  // Adresi güncelle
  await address.update(updateFields);

  res.status(200).json({
    message: "Address updated successfully.",
    address,
  });
});

exports.getMyAddresses = asyncHandler(async (req, res) => {
  // Token'dan gelen userId
  const userId = req.user.id;

  // Kullanıcıya ait adresleri getir
  const addresses = await Address.findAll({
    where: { userId },
  });

  if (!addresses.length) {
    return res
      .status(404)
      .json({ message: "No addresses found for this user." });
  }

  res.status(200).json({
    message: "Addresses fetched successfully.",
    addresses,
  });
});

exports.getAddressesByUserId = asyncHandler(async (req, res) => {
  // Route parametrelerinden userId'yi al
  const { userId } = req.params;

  // Kullanıcıya ait adresleri getir
  const addresses = await Address.findAll({
    where: { userId },
  });

  if (!addresses.length) {
    return res
      .status(404)
      .json({ message: "No addresses found for this user." });
  }

  res.status(200).json({
    message: "Addresses fetched successfully.",
    addresses,
  });
});

exports.deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Token'dan gelen userId
  const userRole = req.user.role; // Token'dan gelen rol
  const addressId = req.params.addressId; // Silinmek istenen adres ID

  // Silinmek istenen adresi bul
  const address = await Address.findByPk(addressId);
  if (!address) {
    return res.status(404).json({ message: "Address not found." });
  }

  // Admin değilse ve adresin sahibi değilse izin verme
  if (userRole !== "admin" && address.userId !== userId) {
    return res.status(403).json({
      message: "You are not authorized to delete this address.",
    });
  }

  // Adres defaultsa, diğer adreslerden en düşük id'ye sahip olanı default yap
  if (address.isDefault) {
    const nextDefaultAddress = await Address.findOne({
      where: {
        userId: address.userId, // Aynı kullanıcıya ait adresler
        id: { [Sequelize.Op.ne]: addressId }, // Silinmekte olan adresi hariç tut
      },
      order: [["id", "ASC"]], // En düşük id'ye sahip adresi al
    });

    if (nextDefaultAddress) {
      nextDefaultAddress.isDefault = true;
      await nextDefaultAddress.save();
    }
  }

  // Adresi sil
  await address.destroy();

  res.status(200).json({ message: "Address deleted successfully." });
});

exports.getCities = async (req, res) => {
  try {
    const response = await addressApiClient.get("/iller");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

exports.getDistricts = async (req, res) => {
  const city = req.params.cityName;
  try {
    const response = await addressApiClient.get(`/ilceler`, {
      params: { iladi: city },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch districts" });
  }
};

exports.getNeighborhoods = async (req, res) => {
  const city = req.params.cityName;
  const district = req.params.districtName;
  try {
    const response = await addressApiClient.get(`/mahalleler`, {
      params: { iladi: city, ilce: district },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch neighborhoods" });
  }
};

exports.getStreets = async (req, res) => {
  const city = req.params.cityName;
  const neighborhood = req.params.neighborhoodName;

  try {
    const response = await addressApiClient.get(`/sokaklar`, {
      params: { iladi: city, mahalle: neighborhood },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch streets" });
  }
};
