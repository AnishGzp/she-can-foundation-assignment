import { contactModel } from "../models/contact.model.js";
import { AppError } from "../utils/handleError.js";

export class ContactService {
  async create(input) {
    try {
      const contact = new contactModel({
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
      });

      return await contact.save();
    } catch (error) {
      throw error;
    }
  }

  async get() {
    return await contactModel.find({}).sort({ createdAt: -1 });
  }

  async delete(id) {
    try {
      const contact = await contactModel.findByIdAndDelete(id);
      if (!contact) {
        throw new AppError(404, "Contact details not found");
      }

      return contact;
    } catch (error) {
      throw error;
    }
  }
}

export const contactService = new ContactService();
