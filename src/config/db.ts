import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import CONFIG from "./index";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: CONFIG.DATABASE.DB_HOST,
  port: Number(CONFIG.DATABASE.DB_PORT),
  username: CONFIG.DATABASE.DB_USER,
  password: CONFIG.DATABASE.DB_PASSWORD,
  database: CONFIG.DATABASE.DB_NAME,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});
