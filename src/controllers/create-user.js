import validator from "validator";

import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, serverError } from "./helpers.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
      }

      const isAValidPassword = params.password.length >= 6;

      if (!isAValidPassword) {
        return badRequest({ message: "Password must be at least 6 characters" });
      }

      const isAValidEmail = validator.isEmail(params.email);

      if (!isAValidEmail) {
        return badRequest({ message: "Invalid e-mail. Please provide a valid one" });
      }

      const createUserUseCase = new CreateUserUseCase();
      const createdUser = await createUserUseCase.execute(params);

      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.error(error);
      return serverError();
    }
  }
}
