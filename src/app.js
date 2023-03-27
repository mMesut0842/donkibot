import fs from 'fs'
import tmi from 'tmi.js'
import { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN, GAMBA_EMOTES, JOKER, MENU} from './constants.js';

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: CHANNEL_NAME
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	message = message.trim()
	if(self) return;
	message = message.toLowerCase()
	if(message.substring(0, 5) != 'donki') return;
	var spaceIndex = message.search(' ')
	if(spaceIndex == -1){spaceIndex = message.length}
	var command = message.substring(5, spaceIndex)
	switch(command){
		case 'hello':
			client.say(channel, `@${tags.username}, heya! Sippin`);
			break;
		case 'gamba':
			message = message.replaceAll(" ", "")
			var raised = message.substring(10)
			raised = parseInt(raised)
			if(isNaN(raised) || raised == 0){
				client.say(channel, `@${tags.username}, Donk Tssk parasiz ayi oynmaz`)
				return
			}
			if(raised < 0){
				client.say(channel, `@${tags.username}, kandirabileceğini mi sandin pepePoint `)
				return
			}
			var RNG = Math.random() * 400
			var slots = []
			fs.readFile('usernames.txt', 'utf8', function(err, data){
				var index = data.indexOf("@" + String(tags.username))
				var pointsIndex = data.indexOf('♦', index)
				var preData = data.substring(0, pointsIndex + 1)
				var postData = data.substring(data.indexOf("♦", pointsIndex + 1))
				var points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
				points = parseInt(points)
				console.log(RNG)
				if(raised > points || index == -1){
					client.say(channel, `@${tags.username}, o kadar paran yok ki Ulan`)
				}
				else if(RNG < 1){
					raised *= 49
					points += raised
					fs.writeFile("usernames.txt",preData + points + postData, (err) => {
						if (err)
						console.log(err);
						else {
						console.log("File written successfully\n");
						console.log("The written has the following contents:");
						client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${JOKER} | ${JOKER} | ${JOKER} | sonucunu aldi. Bu puanini 50'ye katladigi anlamina geliyor. Artik hesabinda ${points} puani var yoooo`)
						}})

				}
				else if(RNG < 15){
					var emoteNumber = Math.floor((RNG - 1) * (3/14))
					slots = [GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber]]
					raised *= 9
					points += raised
					fs.writeFile("usernames.txt",preData + points + postData, (err) => {
						if (err)
						console.log(err);
						else {
						console.log("File written successfully\n");
						console.log("The written has the following contents:");
						client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanini 10'a katladigi anlamina geliyor. Artik hesabinda ${points} puani var Pog`)
						}})

				}
				else if(RNG < 40){
					var jokerPosition = Math.floor((RNG - 15) * (3/25))
					RNG = RNG - Math.floor(RNG)
					RNG *= 10
					var emoteNumber = RNG * (5/10)
					emoteNumber = Math.floor(emoteNumber)
					slots = [GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber]]
					slots[jokerPosition] = JOKER
					raised *= 4
					points += raised
					fs.writeFile("usernames.txt",preData + points + postData, (err) => {
						if (err)
						console.log(err);
						else {
						console.log("File written successfully\n");
						console.log("The written has the following contents:");
						client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanini 5'e katladigi anlamina geliyor. Artik hesabinda ${points} puani var baseg`)
						}})
				}
				else if(RNG < 115){
					var jokerPosition1 = Math.floor((RNG - 40) * (3 / 75))
					RNG = RNG - Math.floor(RNG)
					RNG *= 10
					var jokerPosition2 = Math.floor(RNG * (2/10))
					if(jokerPosition1 <= jokerPosition2){jokerPosition2++}
					RNG = RNG - Math.floor(RNG)
					RNG *= 10
					var emoteNumber = Math.floor(RNG * (5/10))
					slots = [GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber]]
					slots[jokerPosition1] = JOKER
					slots[jokerPosition2] = JOKER
					raised *= 1
					points += raised
					fs.writeFile("usernames.txt",preData + points + postData, (err) => {
						if (err)
						console.log(err);
						else {
						console.log("File written successfully\n");
						console.log("The written has the following contents:");
						client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanini 2'ye katladigi anlamina geliyor. Artik hesabinda ${points} puani var FeelsGoodMan`)
						}})
				}
				else{
					var emoteNumber = (RNG - 115) * (6 / 285)
					emoteNumber = Math.floor(emoteNumber)
					console.log(emoteNumber + " first emote number")
					var combo = false
					var comboemote
					if(emoteNumber <= 4){slots[0] = GAMBA_EMOTES[emoteNumber];comboemote = emoteNumber; var preslot = emoteNumber}
					else{slots[0] = JOKER; combo = true}
					RNG = RNG - Math.floor(RNG)
					RNG *= 10
					if(combo){emoteNumber = RNG * (5 / 10)}
					else{emoteNumber = RNG * (6 / 10)}
					emoteNumber = Math.floor(emoteNumber)
					console.log(emoteNumber + " second emote number")
					// iki gus gelemez
					if(emoteNumber <= 4){
						slots[1] = GAMBA_EMOTES[emoteNumber]
						if(emoteNumber == comboemote || combo){
							combo = true
							comboemote = emoteNumber
						}
					}
					else{slots[1] = JOKER; combo = true; comboemote = preslot}
					RNG = RNG - Math.floor(RNG)
					RNG *= 10
					if(combo){
						emoteNumber = RNG * (4 / 10)
						emoteNumber = Math.floor(emoteNumber)
						if(emoteNumber >= comboemote){emoteNumber++}
						slots[2] = GAMBA_EMOTES[emoteNumber]
					}
					else{
						emoteNumber = RNG * (6 / 10)
						emoteNumber = Math.floor(emoteNumber)
						slots[2] = GAMBA_EMOTES[emoteNumber]
						if(emoteNumber == 5){slots[2] = JOKER}
					}
					
					console.log(emoteNumber + " thirt emote number")

					points -= raised
					fs.writeFile("usernames.txt",preData + points + postData, (err) => {
						if (err)
						console.log(err);
						else {
						console.log("File written successfully\n");
						console.log("The written has the following contents:");
						client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanlarini kaybettiği anlamina geliyor. Artik hesabinda ${points} puani var anani`)
						}})
				}
			})
			break;
		case 'yenigun':
			fs.readFile('usernames.txt', 'utf8', function(err, data){
				var index = data.indexOf("@" + String(tags.username))
				var current = new Date
				var checkDate = String(current.getFullYear()) + '/' + String(current.getMonth() + 1) + '/' + String(current.getDate())
				if(index != -1){
					var dateIndex = data.indexOf('?', index) + 1
					var dateEnding = data.indexOf('♦', dateIndex)
					var lastdate = data.substring(dateIndex, dateEnding)
					
					if(lastdate != checkDate ){
						console.log(lastdate + " - " + checkDate)
						var preData = data.substring(0, index)
						var postData = data.substring(data.indexOf("\n", index))
						var pointsIndex = data.indexOf('♦', index)
						var points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
						points = parseInt(points)
						fs.writeFile("usernames.txt", preData + `@${tags.username}?${checkDate}♦${points + 1000}♦` + postData, (err) => {
							if (err)
							  console.log(err);
							else {
							  console.log("File written successfully\n");
							  console.log("The written has the following contents:");
							  //console.log(fs.readFileSync("usernames.txt", "utf8"));
							  client.say(channel, `@${tags.username}, günlük 1000 puanini aldin DonkApproved`);
							}})
					}
					else{
						client.say(channel, `@${tags.username}, ama zaten günlük puan hakkini kullandin ki Donk`)
					}
				}
				else{
					fs.writeFile("usernames.txt", data + `@${tags.username}?${checkDate}♦${1000}♦\n`, (err) => {
						if (err)
						  console.log(err);
						else {
						  console.log("File written successfully\n");
						  console.log("The written has the following contents:");
						  //console.log(fs.readFileSync("usernames.txt", "utf8"));
						  client.say(channel, `@${tags.username}, günlük 1000 puanini aldin DonkApproved`);
						}})
				}
			})
			break;
		case 'puan':
			fs.readFile('usernames.txt', 'utf8', function(err, data){
				var index = data.indexOf("@" + String(tags.username))
				var pointsIndex = data.indexOf('♦', index)
				if(index == -1){
					client.say(channel, `@${tags.username}, 0 DonkApproved`)
				}
				else{
				var points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
				points = parseInt(points)
				client.say(channel, `@${tags.username}, ${points} DonkApproved`)
				}
			})
			break;
		case 'ode':
			var amount
			var person
			var isAmountWritten = false
			for(let i = spaceIndex + 1; i <= message.length; i++){
				if(message[i] != " "){
					if(isAmountWritten){
						var end = message.indexOf(" ", i)
						if(end == -1)(end = message.length)
						person = message.substring(i, end)
						i = message.length
					}
					else{
						var end = message.indexOf(" ", i)
						amount = parseInt(message.substring(i, end))
						isAmountWritten = true
						i = end
					}
				}
			}
			if(person == undefined){client.say(channel, `@${tags.username}, kime ödeme yapacaksin ppL`)}
			else if (isNaN(amount)){client.say(channel, `@${tags.username}, ne kadar puan odiyecegini belirtmen lazim Donk`)}
			else if(amount == 0){client.say(channel, `@${tags.username}, 0 puan odeyemeszin Awkward`)}
			else if(amount < 0){client.say(channel, `@${tags.username}, başkalarinin hesabindan puan alabileceğini mi düşündün Awkward`)}
			else{
				if(person[0] == '@'){person = person.substring(1)}
				var index
				var postData
				var pointsIndex
				var preData
				var points
				var data = fs.readFileSync('usernames.txt', 'utf8')
				index = data.indexOf("@" + String(tags.username))
				postData = data.substring(data.indexOf("\n", index))
				pointsIndex = data.indexOf('♦', index)
				preData = data.substring(0, pointsIndex)
				points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
				points = parseInt(points)
				if(amount > points || index == -1){
					client.say(channel, `@${tags.username}, o kadar paran yok ki Ulan`)
					return
				}
				data = preData + `♦${points - amount}♦` + postData
				index = data.indexOf("@" + person)
				postData = data.substring(data.indexOf("\n", index))
				pointsIndex = data.indexOf('♦', index)
				preData = data.substring(0, pointsIndex)
				points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
				points = parseInt(points)
				fs.writeFile("usernames.txt", preData + `♦${points + amount}♦` + postData, (err) => {
					if (err)
					console.log(err);
					else {
					console.log("File written successfully\n");
					console.log("The written has the following contents:");
					}})
				client.say(channel, `@${person}, kisisine ${amount} puan ödendi`)
				}
			break;
		case 'market':
			console.log("market açildi")
			var good
			var person
			var isGoodWritten = false
			for(let i = spaceIndex + 1; i <= message.length; i++){
				if(message[i] != " " || message[i] != "󠀀"){
					if(isGoodWritten){
						var end = message.indexOf(" ", i)
						if(end == -1)(end = message.length)
						person = message.substring(i, end)
						i = message.length
					}
					else{
						var end = message.indexOf(" ", i)
						if(end == -1)(end = message.length)
						good = message.substring(i, end)
						isGoodWritten = true
						i = end
						console.log(end)
					}
				}
			}
			console.log(good, "-", person)
			var menu = ""
			if (good == undefined){
				for (var key in MENU){
					menu += key + ":" + MENU[key] + " | "
				}
				client.say(channel, menu)}
			else if(person == undefined){
				var price = MENU[good]
				if(price == undefined){
					client.say(channel, `@${tags.username}, boyle bir sey satin alamazsin`)
				}
				else{
					var index
					var postData
					var pointsIndex
					var preData
					var points
					var data = fs.readFileSync('usernames.txt', 'utf8')
					index = data.indexOf("@" + String(tags.username))
					postData = data.substring(data.indexOf("\n", index))
					pointsIndex = data.indexOf('♦', index)
					preData = data.substring(0, pointsIndex)
					points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
					points = parseInt(points)
					if(price > points || index == -1){
						client.say(channel, `@${tags.username}, o kadar paran yok ki Ulan`)
						return
					}
					fs.writeFile("usernames.txt", preData + `♦${points - price}♦` + postData, (err) => {
						if (err)
						console.log(err)})
					client.say(channel, `@${tags.username}, bir adet ${good} satin aldi`)
				}
			}
			else{
				var price = MENU[good]
				if(price == undefined){
					client.say(channel, `@${tags.username}, boyle bir sey satin alamazsin`)
				}
				else{
					var index
					var postData
					var pointsIndex
					var preData
					var points
					var data = fs.readFileSync('usernames.txt', 'utf8')
					index = data.indexOf("@" + String(tags.username))
					postData = data.substring(data.indexOf("\n", index))
					pointsIndex = data.indexOf('♦', index)
					preData = data.substring(0, pointsIndex)
					points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
					points = parseInt(points)
					if(price > points || index == -1){
						client.say(channel, `@${tags.username}, o kadar paran yok ki Ulan`)
						return
					}
					fs.writeFile("usernames.txt", preData + `♦${points - price}♦` + postData, (err) => {
						if (err)
						console.log(err)})
					client.say(channel, `@${tags.username}, ${person} kisisine bir adet ${good} aldi`)
				}
			break;
	}
	if(message.toLowerCase().substring(0, 7) === '#/hello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
}})
	// else if(message.toLowerCase().substring(0, 10) === 'donkigamba' && ( message.length == 10  || message[10] == ' ' )) {
	// 	var RNG = Math.random() * 400
	// 	var slots = []
	// 	message = message.toLowerCase().replaceAll(" ", "")
	// 	var raised = message.substring(10)
	// 	raised = parseInt(raised)
	// 	if(isNaN(raised) || raised == 0){
	// 		client.say(channel, `@${tags.username}, Donk Tssk parasiz ayi oynmaz `)
	// 	}
	// 	else{
	// 		fs.readFile('usernames.txt', 'utf8', function(err, data){
	// 			var index = data.indexOf("@" + String(tags.username))
	// 			var pointsIndex = data.indexOf('♦', index)
	// 			var preData = data.substring(0, pointsIndex + 1)
	// 			var postData = data.substring(data.indexOf("♦", pointsIndex + 1))
	// 			var points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
	// 			points = parseInt(points)
	// 			console.log(RNG)
	// 			if(raised > points || index == -1){
	// 				client.say(channel, `@${tags.username}, o kadar paran yok ki Ulan`)
	// 			}
	// 			else if(RNG < 1){
	// 				raised *= 49
	// 				points += raised
	// 				fs.writeFile("usernames.txt",preData + points + postData, (err) => {
	// 					if (err)
	// 					console.log(err);
	// 					else {
	// 					console.log("File written successfully\n");
	// 					console.log("The written has the following contents:");
	// 					console.log(fs.readFileSync("usernames.txt", "utf8"));
	// 					client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${JOKER} | ${JOKER} | ${JOKER} | sonucunu aldi. Bu puanini 50'ye katladigi anlamina geliyor. Artik hesabinda ${points} puani var yoooo`)
	// 					}})

	// 			}
	// 			else if(RNG < 15){
	// 				var emoteNumber = Math.floor((RNG - 1) * (3/14))
	// 				slots = [GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber]]
	// 				raised *= 9
	// 				points += raised
	// 				fs.writeFile("usernames.txt",preData + points + postData, (err) => {
	// 					if (err)
	// 					console.log(err);
	// 					else {
	// 					console.log("File written successfully\n");
	// 					console.log("The written has the following contents:");
	// 					console.log(fs.readFileSync("usernames.txt", "utf8"));
	// 					client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanini 10'a katladigi anlamina geliyor. Artik hesabinda ${points} puani var Pog`)
	// 					}})

	// 			}
	// 			else if(RNG < 40){
	// 				var jokerPosition = Math.floor((RNG - 15) * (3/25))
	// 				RNG = RNG - Math.floor(RNG)
	// 				RNG *= 10
	// 				var emoteNumber = RNG * (5/10)
	// 				emoteNumber = Math.floor(emoteNumber)
	// 				slots = [GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber]]
	// 				slots[jokerPosition] = JOKER
	// 				raised *= 4
	// 				points += raised
	// 				fs.writeFile("usernames.txt",preData + points + postData, (err) => {
	// 					if (err)
	// 					console.log(err);
	// 					else {
	// 					console.log("File written successfully\n");
	// 					console.log("The written has the following contents:");
	// 					console.log(fs.readFileSync("usernames.txt", "utf8"));
	// 					client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanini 5'e katladigi anlamina geliyor. Artik hesabinda ${points} puani var baseg`)
	// 					}})
	// 			}
	// 			else if(RNG < 115){
	// 				var jokerPosition1 = Math.floor((RNG - 40) * (3 / 75))
	// 				RNG = RNG - Math.floor(RNG)
	// 				RNG *= 10
	// 				var jokerPosition2 = Math.floor(RNG * (2/10))
	// 				if(jokerPosition1 <= jokerPosition2){jokerPosition2++}
	// 				RNG = RNG - Math.floor(RNG)
	// 				RNG *= 10
	// 				var emoteNumber = Math.floor(RNG * (5/10))
	// 				slots = [GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber], GAMBA_EMOTES[emoteNumber]]
	// 				slots[jokerPosition1] = JOKER
	// 				slots[jokerPosition2] = JOKER
	// 				raised *= 1
	// 				points += raised
	// 				fs.writeFile("usernames.txt",preData + points + postData, (err) => {
	// 					if (err)
	// 					console.log(err);
	// 					else {
	// 					console.log("File written successfully\n");
	// 					console.log("The written has the following contents:");
	// 					console.log(fs.readFileSync("usernames.txt", "utf8"));
	// 					client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanini 2'ye katladigi anlamina geliyor. Artik hesabinda ${points} puani var FeelsGoodMan`)
	// 					}})
	// 			}
	// 			else{
	// 				// var jokerPosition = Math.floor((RNG - 107) * (4 / 293))
	// 				// for(let i = 0; i <= 2; i++){
	// 				// 	if(i == jokerPosition){slots[i] = JOKER;continue;}
	// 				// 	RNG = RNG - Math.floor(RNG)
	// 				// 	RNG *= 10
	// 				// 	var emoteNumber = RNG * (5/10)
	// 				// 	emoteNumber = Math.floor(emoteNumber)
	// 				// 	slots[i] = GAMBA_EMOTES[emoteNumber]
	// 				// }
	// 				var emoteNumber = (RNG - 115) * (6 / 285)
	// 				emoteNumber = Math.floor(emoteNumber)
	// 				console.log(emoteNumber + " first emote number")
	// 				var combo = false
	// 				var comboemote
	// 				if(emoteNumber <= 4){slots[0] = GAMBA_EMOTES[emoteNumber];comboemote = emoteNumber; var preslot = emoteNumber}
	// 				else{slots[0] = JOKER; combo = true}
	// 				RNG = RNG - Math.floor(RNG)
	// 				RNG *= 10
	// 				if(combo){emoteNumber = RNG * (5 / 10)}
	// 				else{emoteNumber = RNG * (6 / 10)}
	// 				emoteNumber = Math.floor(emoteNumber)
	// 				console.log(emoteNumber + " second emote number")
	// 				// iki gus gelemez
	// 				if(emoteNumber <= 4){
	// 					slots[1] = GAMBA_EMOTES[emoteNumber]
	// 					if(emoteNumber == comboemote || combo){
	// 						combo = true
	// 						comboemote = emoteNumber
	// 					}
	// 				}
	// 				else{slots[1] = JOKER; combo = true; comboemote = preslot}
	// 				RNG = RNG - Math.floor(RNG)
	// 				RNG *= 10
	// 				if(combo){
	// 					emoteNumber = RNG * (4 / 10)
	// 					emoteNumber = Math.floor(emoteNumber)
	// 					if(emoteNumber >= comboemote){emoteNumber++}
	// 					slots[2] = GAMBA_EMOTES[emoteNumber]
	// 				}
	// 				else{
	// 					emoteNumber = RNG * (6 / 10)
	// 					emoteNumber = Math.floor(emoteNumber)
	// 					slots[2] = GAMBA_EMOTES[emoteNumber]
	// 					if(emoteNumber == 5){slots[2] = JOKER}
	// 				}
					
	// 				console.log(emoteNumber + " thirt emote number")

	// 				points -= raised
	// 				fs.writeFile("usernames.txt",preData + points + postData, (err) => {
	// 					if (err)
	// 					console.log(err);
	// 					else {
	// 					console.log("File written successfully\n");
	// 					console.log("The written has the following contents:");
	// 					console.log(fs.readFileSync("usernames.txt", "utf8"));
	// 					client.say(channel, `@${tags.username} slot makinesini çaliştirdi ve | ${slots[0]} | ${slots[1]} | ${slots[2]} | sonucunu aldi. Bu puanlarini kaybettiği anlamina geliyor. Artik hesabinda ${points} puani var anani`)
	// 					}})
	// 			}
	// 		})
	// 	}
	// }
	// else if(message.toLowerCase().substring(0, 13) === 'donkiyenigun'){
	// 	//client.say(channel, `@${tags.username}, bu komut şu anda yapim aşamasindadir BoschDrill`);
	// 	fs.readFile('usernames.txt', 'utf8', function(err, data){
	// 		var index = data.indexOf("@" + String(tags.username))
	// 		var current = new Date
	// 		var checkDate = String(current.getFullYear()) + '/' + String(current.getMonth() + 1) + '/' + String(current.getDate())
	// 		if(index != -1){
	// 			var lastdate = data.substr(data.indexOf('?', index) + 1, 10)
				
	// 			if(lastdate != checkDate ){
	// 				var preData = data.substring(0, index)
	// 				var postData = data.substring(data.indexOf("\n", index))
	// 				var pointsIndex = data.indexOf('♦', index)
	// 				var points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
	// 				points = parseInt(points)
	// 				fs.writeFile("usernames.txt", preData + `@${tags.username}?${checkDate}♦${points + 1000}♦` + postData, (err) => {
	// 					if (err)
	// 					  console.log(err);
	// 					else {
	// 					  console.log("File written successfully\n");
	// 					  console.log("The written has the following contents:");
	// 					  console.log(fs.readFileSync("usernames.txt", "utf8"));
	// 					  client.say(channel, `@${tags.username}, günlük 1000 puanini aldin DonkApproved`);
	// 					}})
	// 			}
	// 			else{
	// 				client.say(channel, `@${tags.username}, ama zaten günlük puan hakkini kullandin ki Donk`)
	// 			}
	// 		}
	// 		else{
	// 			fs.writeFile("usernames.txt", data + `@${tags.username}?${checkDate}♦${1000}♦\n`, (err) => {
	// 				if (err)
	// 				  console.log(err);
	// 				else {
	// 				  console.log("File written successfully\n");
	// 				  console.log("The written has the following contents:");
	// 				  console.log(fs.readFileSync("usernames.txt", "utf8"));
	// 				  client.say(channel, `@${tags.username}, günlük 1000 puanini aldin DonkApproved`);
	// 				}})
	// 		}
	// 	})
	// }
	// else if (message.toLowerCase().substring(0, 9) === 'donkipuan'){
	// 	fs.readFile('usernames.txt', 'utf8', function(err, data){
	// 		var index = data.indexOf("@" + String(tags.username))
	// 		var pointsIndex = data.indexOf('♦', index)
	// 		if(index == -1){
	// 			client.say(channel, `@${tags.username}, 0 DonkApproved`)
	// 		}
	// 		else{
	// 		var points = data.substring(pointsIndex + 1, data.indexOf('♦', pointsIndex + 1))
	// 		points = parseInt(points)
	// 		client.say(channel, `@${tags.username}, ${points} DonkApproved`)
	// 		}
	// 	})
	// }
	//});}