import { createClient } from "@supabase/supabase-js";
import { database_secret, database_url } from "./db_credentials";

export const supabase = createClient(database_url, database_secret);
