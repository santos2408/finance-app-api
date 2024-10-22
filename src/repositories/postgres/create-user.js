import { PostgresHelper } from "../../database/postgres/helper.js";

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    await PostgresHelper.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    const [createdUser] = await PostgresHelper.query("SELECT * FROM users WHERE email = $1", [
      createUserParams.email,
    ]);

    return createdUser;
  }
}
