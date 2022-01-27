/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION', 'pg'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | PostgreSQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for PostgreSQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i pg
    |
    */
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST', '127.0.0.1') as string,
        port: Number(Env.get('DB_PORT', 5433)),
        user: Env.get('DB_USER', 'postgres') as string,
        password: Env.get('DB_PASSWORD', '1234') as string,
        database: Env.get('DB_NAME', 'postgres') as string,
      },
      healthCheck: false,
      debug: false,
    },

    tenant_system_saude_bd27f4cb16de4faea772cfd142a4a5a5: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST_SYSTEM_SAUDE', '127.0.0.1') as string,
        port: Number(Env.get('DB_PORT_SYSTEM_SAUDE', 5433)),
        user: Env.get('DB_USER_SYSTEM_SAUDE', 'postgres') as string,
        password: Env.get('DB_PASSWORD_SYSTEM_SAUDE', '1234') as string,
        database: Env.get('DB_NAME_SYSTEM_SAUDE', 'postgres') as string,
      },
      healthCheck: false,
      debug: false,
    },

    tenant_lab_saude_e9f897a87275c33d48261bebdac1b0f9: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST_LAB_SAUDE', '127.0.0.1') as string,
        port: Number(Env.get('DB_PORT_LAB_SAUDE', 5434)),
        user: Env.get('DB_USER_LAB_SAUDE', 'postgres') as string,
        password: Env.get('DB_PASSWORD_LAB_SAUDE', '1234') as string,
        database: Env.get('DB_NAME_LAB_SAUDE', 'postgres') as string,
      },
      healthCheck: false,
      debug: false,
    },
  },

  /*
  |--------------------------------------------------------------------------
  | ORM Configuration
  |--------------------------------------------------------------------------
  |
  | Following are some of the configuration options to tweak the conventional
  | settings of the ORM. For example:
  |
  | - Define a custom function to compute the default table name for a given model.
  | - Or define a custom function to compute the primary key for a given model.
  |
  */
  orm: {},
}

export default databaseConfig
