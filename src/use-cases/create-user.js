import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    // @TODO: Validar se e-mail já existe no banco de dados
    const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const userEmailAlreadyExists = postgresGetUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (userEmailAlreadyExists) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

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
