import config from "./config"
import { env } from "./lib/env"
import {logger} from "./lib/logger";
import db from "./lib/database"
export default function loadGlobal() {
  global.$config = config;
  global.$env = env;
  global.$logger = logger;
  global.$db = db;
}
