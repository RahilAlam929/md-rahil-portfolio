const channel = supabase
.channel("chat-room")

channel.on(
"postgres_changes",
{
event:"INSERT",
schema:"public",
table:"messages"
},
(payload)=>{
console.log(payload)
}
)

channel.subscribe()