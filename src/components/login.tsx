"use client"

import { supabase } from "@/lib/supabase"

export default function Login(){

async function login(){

await supabase.auth.signInWithOAuth({
provider:"github"
})

}

return(

<button onClick={login}>
Login with GitHub
</button>

)

}