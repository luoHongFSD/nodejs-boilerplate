import { env } from "../lib/env"



export default {
  authMode:'jwt',
  /**
   *  Application port.
   */
  port: parseInt(env.PORT) || 3000,

  /**
   * JWT Secret
   */
  jwtSecret: env.JWT_SECRET,

  /**
   * MongoDB connection options.
   */
  database: {
    type: env.TYPEORM_CONNECTION as any,
    /**
     * Connection url where perform connection to.
     */
    url: env.TYPEORM_HOST,
    /**
     * Database host.
     */
    host: env.TYPEORM_HOST,
    /**
     * Database host port.
     */
    // tslint:disable-next-line: radix
    port: Number.parseInt(env.TYPEORM_PORT),
    /**
     * Database username.
     */
    username: env.TYPEORM_USERNAME,
    /**
     * Database password.
     */
    password: env.TYPEORM_PASSWORD,
    /**
     * Database name to connect to.
     */
    database: env.TYPEORM_DATABASE,
    synchronize:env.TYPEORM_SYNCHRONIZE,
  },

 
};
