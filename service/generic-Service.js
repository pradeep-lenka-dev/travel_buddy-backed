
const Anthropic = require('@anthropic-ai/sdk').Anthropic;
const envFile = require('dotenv').config();




const apiKey = process.env.API_KEY
const apiUrl = process.env.API_URL 
i = 0
async function callopenApi(params) {
    try {
    
        var content
         var location = params.location
         if(params.location){
            content = `Suggest me destinations near ${location} within 500 km with travel routes.`
         }
         if(params.destinationName){
            let destinationName = params.destinationName
            content = `please give me the cheapest travel mode, hotels, famous food & locations to watch at ${destinationName}`
         }
        const anthropic = new Anthropic({
            apiKey: apiKey
          });
          const msg = await anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1024,
            messages: [{ role: "user", content: content }],
          });
          this.i ++
          return msg
    
    } catch (error) {
      //console.log("🚀 ~ error:", error)
      console.error("Error in fetchData:", error);
      //res.status(500).json({ error: "Internal server error" });

    }
}


  module.exports = {
    callopenApi,
  };
//module.export = new genericService()