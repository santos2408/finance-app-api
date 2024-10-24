import { badRequest, ok, serverError } from "./helpers.js";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import validator from "validator";

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isAValidId = validator.isUUID(httpRequest.params.userId);

      if (!isAValidId) {
        return badRequest({ message: "The provided 'id' is not valid" });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);
      return ok(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
