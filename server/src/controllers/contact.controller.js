import { contactService } from "../services/contact.services.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { AppError } from "../utils/handleError.js";
import { validationErrorHandle } from "../utils/validationErrorHandler.js";

export class ContactController {
  async create(req, res, next) {
    try {
      validationErrorHandle(req);

      const input = req.body;

      const data = await contactService.create(input);

      sendSuccess(res, "Contact details send successfully");
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError(401, "The contact id is required");
      }

      const data = await contactService.delete(id);

      sendSuccess(res, "Contact deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const contactController = new ContactController();
