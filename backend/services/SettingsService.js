const Settings = require("../models/settings.js");

class SettingsService {
  async getSettings() {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        restaurantName: "My Restaurant",
        address: "",
        phone: "",
        email: "",
      });
    }

    return settings;
  }

  async updateSettings(updateData) {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(updateData);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, updateData, {
        new: true,
      });
    }

    return settings;
  }

  async updateRestaurantInfo(restaurantInfo) {
    return await this.updateSettings({
      restaurantName: restaurantInfo.name,
      address: restaurantInfo.address,
      phone: restaurantInfo.phone,
      email: restaurantInfo.email,
    });
  }

  async updateOperatingHours(hours) {
    const settings = await Settings.findOne();
    return await Settings.findByIdAndUpdate(
      settings._id,
      { operatingHours: hours },
      { new: true },
    );
  }

  async updateOrderSettings(orderSettings) {
    const settings = await Settings.findOne();
    return await Settings.findByIdAndUpdate(
      settings._id,
      { orderSettings },
      { new: true },
    );
  }

  async updateNotifications(notifications) {
    const settings = await Settings.findOne();
    return await Settings.findByIdAndUpdate(
      settings._id,
      { notifications },
      { new: true },
    );
  }

  async updateLogo(logoUrl) {
    const settings = await Settings.findOne();
    return await Settings.findByIdAndUpdate(
      settings._id,
      { logoUrl },
      { new: true },
    );
  }
}

module.exports = new SettingsService();
