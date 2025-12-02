export interface IUsers {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface sqlConfiguration {
  host: string;
  user?: string;
  password?: string;
  database?: string;
  waitForConnections: boolean;
  connectionLimit: number;
  maxIdle: number;
  idleTimeout: number;
  queueLimit: number;
  enableKeepAlive: boolean;
  keepAliveInitialDelay: number;
}
