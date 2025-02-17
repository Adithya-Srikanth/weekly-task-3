export interface Config {
  port: string | undefined;
  pgHost: string | undefined;
  pgDatabase: string | undefined;
  pgUser: string | undefined;
  pgPassword: string | undefined;
}

export const config: Config = {
  port: process.env.PORT,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgUser: process.env.PGUSER,
  pgPassword: process.env.PGPASSWORD,
};
