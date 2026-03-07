"use client"

import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function CreateProject(){

const [title,setTitle] = useState("")
const [desc,setDesc] = useState("")

async function create(){

await supabase
.from("projects")
.insert([
{
title:title,
description:desc,
created_by:"Rahil"
}
])

}

return(

<div>

<input
placeholder="Project Title"
onChange={(e)=>setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
onChange={(e)=>setDesc(e.target.value)}
/>

<button onClick={create}>
Create Project
</button>

</div>

)

}