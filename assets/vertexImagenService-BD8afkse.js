var j=(c,e,o)=>new Promise((R,h)=>{var l=n=>{try{u(o.next(n))}catch(m){h(m)}},d=n=>{try{u(o.throw(n))}catch(m){h(m)}},u=n=>n.done?R(n.value):Promise.resolve(n.value).then(l,d);u((o=o.apply(c,e)).next())});function C(R,h){return j(this,arguments,function*(c,e,o={}){var g,A,T,E,O,y,k,f;if(!e.projectId||e.projectId.trim().length===0)throw new Error("❌ Project ID is required for Vertex AI Imagen");if(!e.accessToken||e.accessToken.trim().length===0)throw new Error("❌ OAuth Access Token is required for Vertex AI Imagen");if(e.projectId.includes("...")||e.projectId.includes("…"))throw new Error(`❌ PROJECT ID IS TRUNCATED

Your project ID appears to be cut off: "${e.projectId}"

Please enter your COMPLETE Google Cloud Project ID.
You can find it at: https://console.cloud.google.com/home/dashboard`);if(e.projectId.length<6)throw new Error(`❌ PROJECT ID TOO SHORT

The project ID "${e.projectId}" seems incomplete.

A valid Google Cloud Project ID is typically 20-30 characters.
Please check and enter the complete project ID.`);if(e.accessToken.length<20)throw new Error(`❌ OAUTH TOKEN TOO SHORT

The OAuth token appears incomplete (${e.accessToken.length} characters).

A valid OAuth token is typically hundreds of characters long.
Please regenerate and copy the complete token.`);const l=e.location||"us-central1",d=e.model||"imagen-4.0-ultra-generate-001",u=`https://${l}-aiplatform.googleapis.com/v1/projects/${e.projectId}/locations/${l}/publishers/google/models/${d}:predict`,n=o.outputMimeType||"image/png",m=o.compressionQuality||100,p={instances:[{prompt:c}],parameters:{aspectRatio:o.aspectRatio||"1:1",sampleCount:o.sampleCount||1,sampleImageSize:o.sampleImageSize||"2048",negativePrompt:o.negativePrompt||"",enhancePrompt:o.enhancePrompt||!1,personGeneration:o.personGeneration||"allow_adult",safetySetting:o.safetySetting||"block_few",addWatermark:o.addWatermark!==void 0?o.addWatermark:!1,includeRaiReason:o.includeRaiReason!==void 0?o.includeRaiReason:!0,language:o.language||"auto",outputOptions:{mimeType:n,compressionQuality:m}}};console.log("🎨 Vertex AI Imagen Generation:",{endpoint:u,model:d,location:l,projectId:e.projectId,projectIdLength:e.projectId.length,aspectRatio:p.parameters.aspectRatio,sampleCount:p.parameters.sampleCount,sampleImageSize:p.parameters.sampleImageSize,outputOptions:p.parameters.outputOptions,tokenLength:e.accessToken.length,tokenPrefix:e.accessToken.substring(0,20)+"..."}),console.log("📋 Full request parameters:",JSON.stringify(p.parameters,null,2));try{const s=yield fetch(u,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.accessToken}`},body:JSON.stringify(p)});if(!s.ok){const t=yield s.json().catch(()=>({error:{message:`HTTP ${s.status}`}}));console.error("❌ Vertex AI Imagen Error:",t);let r=`Vertex AI Imagen Error (${s.status}): `;if(s.status===403){const i=((g=t==null?void 0:t.error)==null?void 0:g.message)||"";i.includes("Permission")&&i.includes("denied")?r=`🔒 VERTEX AI PERMISSION DENIED (403)

❌ Your OAuth token doesn't have permission to access Vertex AI Imagen.

🔍 Project ID: ${e.projectId}
📍 Location: ${l}
🎨 Model: ${d}

✅ REQUIRED IAM ROLES:
  1. Vertex AI User (roles/aiplatform.user)
  2. Service Usage Consumer (roles/serviceusage.serviceUsageConsumer)

📝 HOW TO FIX:
  1. Go to: https://console.cloud.google.com/iam-admin/iam?project=${e.projectId}
  2. Find your account in the IAM table
  3. Click the Edit icon (pencil) next to your account
  4. Click "ADD ANOTHER ROLE"
  5. Search for and add "Vertex AI User"
  6. Click "ADD ANOTHER ROLE" again
  7. Search for and add "Service Usage Consumer"
  8. Click "SAVE"
  9. Wait 1-2 minutes for permissions to propagate
  10. Regenerate your OAuth token

💡 TIP: Make sure your project ID is complete (not truncated)

📋 Full error: ${i}`:r+=i||"Forbidden - Check your project ID and OAuth token"}else if(s.status===401)r=`🔐 AUTHENTICATION FAILED (401)

❌ Your OAuth token is invalid or expired.

📝 HOW TO FIX:
  1. Regenerate your OAuth token
  2. Update it in your settings

📋 Full error: ${((A=t==null?void 0:t.error)==null?void 0:A.message)||"Unauthorized"}`;else if(s.status===404)r=`🔍 NOT FOUND (404)

❌ The Vertex AI endpoint or model was not found.

🔍 Check your settings:
  • Project ID: ${e.projectId}
  • Location: ${l}
  • Model: ${d}

💡 Make sure:
  1. Your project ID is complete and correct
  2. Vertex AI API is enabled in your project
  3. The model name is correct

📋 Full error: ${((T=t==null?void 0:t.error)==null?void 0:T.message)||"Not Found"}`;else if(s.status===429){const i=((E=t==null?void 0:t.error)==null?void 0:E.message)||"";r=`⏱️ QUOTA EXCEEDED (429)

❌ You've exceeded your quota for model: ${d}

🔄 AUTOMATIC FALLBACK OPTIONS:
  • Imagen 4.0 Ultra (imagen-4.0-ultra-generate-001)
  • Imagen 4.0 Fast (imagen-4.0-fast-generate-001)

💡 TIP: The system will automatically try alternative models

📋 Full error: ${i}`}else r+=((O=t==null?void 0:t.error)==null?void 0:O.message)||"Unknown error";throw new Error(r)}const a=yield s.json();console.log("✅ Vertex AI Response received:",{hasPredictions:!!a.predictions,predictionCount:((y=a.predictions)==null?void 0:y.length)||0,fullResponse:a});const I=[];if(a.predictions&&Array.isArray(a.predictions))for(let t=0;t<a.predictions.length;t++){const r=a.predictions[t];if(console.log(`🔍 Prediction ${t} structure:`,{keys:Object.keys(r),hasBytesBase64Encoded:!!r.bytesBase64Encoded,bytesLength:((k=r.bytesBase64Encoded)==null?void 0:k.length)||0,prediction:r}),r.bytesBase64Encoded){const i=r.bytesBase64Encoded;console.log(`📦 Image data length: ${i.length} bytes`),I.push(i)}else r.mimeType&&r.bytesBase64Encoded&&I.push(r.bytesBase64Encoded)}if(I.length===0){if(a.predictions&&((f=a.predictions[0])!=null&&f.raiFilteredReason)){const t=a.predictions[0].raiFilteredReason;throw new Error(`Blocked by safety filters: ${t}`)}throw new Error("No images returned from Vertex AI Imagen. Check safety filters or request format.")}return console.log(`✅ Successfully generated ${I.length} image(s) with Vertex AI Imagen`),I}catch(s){throw console.error("❌ Vertex AI Imagen generation failed:",s),s}})}function D(c){return["1:1","3:4","4:3","9:16","16:9"].includes(c)?c:{square:"1:1",portrait:"3:4",landscape:"4:3",vertical:"9:16",horizontal:"16:9","3:5":"3:4","2:3":"3:4","16:10":"16:9","21:9":"16:9"}[c]||"1:1"}export{C as generateWithVertexImagen,D as mapAspectRatioForVertex};
