// Private R2 audio API. Firebase verifies the bearer token on every request.
export default {async fetch(request, env) {
 const origin=request.headers.get("Origin");
 const cors={"Access-Control-Allow-Origin":env.ALLOWED_ORIGIN,"Access-Control-Allow-Methods":"GET, PUT, OPTIONS","Access-Control-Allow-Headers":"Authorization, Content-Type, Range","Access-Control-Expose-Headers":"Content-Range, Accept-Ranges, Content-Length","Vary":"Origin","Cache-Control":"private, no-store"};
 const reply=(body,status=200,headers={})=>new Response(body,{status,headers:{...cors,...headers}});
 if(origin && origin!==env.ALLOWED_ORIGIN)return reply("Forbidden",403);
 if(request.method==="OPTIONS")return reply(null,204);
 if(!env.FIREBASE_API_KEY||!env.ALLOWED_UID)return reply("Server not configured",503);
 const token=request.headers.get("Authorization")?.match(/^Bearer (\S+)$/)?.[1];
 if(!token)return reply("Unauthorized",401);
 try {
 const check=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key="+encodeURIComponent(env.FIREBASE_API_KEY),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({idToken:token})});
 if(!check.ok)return reply("Unauthorized",401);
 const user=(await check.json()).users?.[0];
 if(!user||user.localId!==env.ALLOWED_UID||user.disabled)return reply("Forbidden",403);
 const url=new URL(request.url), prefix=user.localId+"/";
 if(url.pathname==="/tracks"&&request.method==="GET"){
 const page=await env.MUSIC.list({prefix,limit:100,include:["customMetadata"],cursor:url.searchParams.get("cursor")||undefined});
 return reply(JSON.stringify({tracks:page.objects.map(o=>({id:o.key.slice(prefix.length),size:o.size,...o.customMetadata})),cursor:page.truncated?page.cursor:null}),200,{"Content-Type":"application/json"});
 }
 const id=url.pathname.match(/^\/tracks\/([a-f0-9-]{36})$/i)?.[1];
 if(!id)return reply("Not found",404);
 const key=prefix+id;
 if(request.method==="PUT"){
 const type=request.headers.get("Content-Type")||"";
 const size=Number(request.headers.get("Content-Length"));
 if(!type.startsWith("audio/")||!Number.isFinite(size)||size<=0||size>50*1024*1024)return reply("Invalid audio or size",400);
 await env.MUSIC.put(key,request.body,{httpMetadata:{contentType:type},onlyIf:{etagDoesNotMatch:"*"}}).then(o=>{if(!o)throw new Error("exists")});
 return reply(null,201);
 }
 if(request.method==="GET"){
 const object=await env.MUSIC.get(key);
 if(!object)return reply("Not found",404);
 return reply(object.body,200,{"Content-Type":object.httpMetadata?.contentType||"application/octet-stream","Content-Length":String(object.size)});
 }
 return reply("Method not allowed",405);
 }catch(error){return reply(error.message==="exists"?"Already uploaded":"Request failed",error.message==="exists"?409:502)}
}};
