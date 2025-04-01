import cron from "cron";
import https from "https";

// send GET request every 14 mintues so API via Render.com stays active
const job = new cron.CronJob("*/14 * * * *", function (){
	https.get(process.env.API_URL, (res) => {
    if(res.statusCode === 200) console.log("GET request sent successfully");
		else console.log("GET request failed", res.statusCode);
  }).on("error", (error) => {
    console.error("Error while sending request", error);
  });
})

export default job;