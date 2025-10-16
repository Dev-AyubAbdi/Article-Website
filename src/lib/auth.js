import supabase from "./supabase";

export async function signUp(email, password, username = "") {
  let data = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  console.log(data);
}
