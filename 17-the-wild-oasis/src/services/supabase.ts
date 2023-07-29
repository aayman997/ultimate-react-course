import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";

export const supabaseUrl: string = "https://chnnozetrcnmyuvhjyql.supabase.co";
const supabaseKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNobm5vemV0cmNubXl1dmhqeXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MjQyNzEsImV4cCI6MjAwNjIwMDI3MX0.VNkx8i9Ar2VDLQm8xCQAvLyCnaF4OwPhfjksozqed_0";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
