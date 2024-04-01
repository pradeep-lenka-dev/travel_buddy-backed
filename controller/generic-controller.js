const genericService = require("../service/generic-Service")
class genericController {


    async fetchData(req, res) {
        var params = req.body
        console.log("🚀 ~ genericController ~ fetchData ~ params:", params)
        // var params = {
        //     "name": "Pranjal Abrol",
        //     "location": "himachal",
        //     "budget": "200",
        //     "days": "1"
        // }

        try {
            const result = await genericService.callopenApi(params)
            const destinations = result.content
            const destinationsList = [];
            const finalres = []
            const regex = /\d+\.\s+([A-Za-z\s]+)/g;
            let count = 0
            // if(result.content[0].text.length < 600 ){
            //     res.status(400).json(result.content[0].text)
            // }
            for (const destination of destinations) {
                const text = destination.text;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    destinationsList.push(match[1].trim());
                    count++
                    if (count == 2) break
                }
                if (count == 2) break
            }
            await Promise.all(destinationsList.map(async eachdestination => {
                let params = {
                    'destinationName': eachdestination
                };
                const result = await genericService.callopenApi(params);

                finalres.push(result);
            }));
            // if(finalres.length != 0){
            //     res.status(400).json(result.content[0].text)
            // }
            //console.log("🚀 ~ genericController ~ callopenApi ~ finalres:", finalres)
            res.status(200).json({ destinationsList, finalres })
        } catch (error) {
            console.log("🚀 ~ genericController ~ callopenApi ~ error:", error)

        }
    }
}
module.exports = new genericController()