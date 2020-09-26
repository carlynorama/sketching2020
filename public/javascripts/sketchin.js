function isNumeric(value) {
        return /^-?\d+$/.test(value);
}

function sumLetters(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str[i];
    }
    return sum;
};

var getFrequency = function(message) {
	if (isNumeric(message)) {
		return 20+5*Math.abs(Math.floor(message))%127;
	} else {
		return sumLetters(messages)%655
	}
}


$("#run-button").click(function() {

	$("#incoming-label").show()

	requirejs(["Tone"], function(Tone) {
		const synth = new Tone.Synth().toDestination();

		requirejs(["mqtt"], function(mqtt) {
			var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
		  		clientId: 'agent.p'
			});

			client.on('connect', function(){
			  console.log('client has connected!');

			  client.subscribe('/try/table_7/#');
			  
			  // client.unsubscribe('/example');
			  // setInterval(function(){
			  //   client.publish('/try/table_7/alek', (Math.random() < 0.5 ) ? "BLEEP" : "BLOOP");
			  // }, 2000);

			});

			client.on('message', function(topic, message) {
				console.log('new message:', topic, message.toString());
			  if (Math.random() < 0.1) {
			  	$("#messages").empty()
			  }
			  $("#messages").append('<div class="msg">' + topic.split("/").slice(-1)[0] + " " + message.toString() + " = " + (20+5*message) + "Hz" + '</div>')
			  try {
			  	synth.triggerAttackRelease(getFrequency(message), "8n");
			  } catch (err) { }
			});

		});


	});	
})

