import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);
    const user = {
      ...createUserParams,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = postgresCreateUserRepository.execute(user);
    return createdUser;
  }
}
