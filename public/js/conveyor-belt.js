var stop = false;
var animationSpeed = 1.0;
var durationMultiplier = 1.0;
var deviceInfo = {
    // You can onfigure these to your liking, or automate the generation of them
    deviceId: "belt1",
    typeId: "iot-conveyor-belt",
    password: "test123pass"
};

var client;
var iot_host;
var iot_port;
var iot_clientid;
var iot_username;
var iot_password;
var topic;

var isConnected = false;
window.msgCount = 0;

// ********** TABLE OF CONTENTS **********
/*
   1. IoT Platform Device
   2. MQTT
   3. Animations/Interactions
*/
// ********** TABLE OF CONTENTS - END ********** //


// ********************************** //
// ***** 1. IoT Platform Device ***** //

// Initialize the application
// Getting the VCAP_SERVICES credentials from the backend
function init() {
    $.ajax({
        url: "/credentials",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            console.log(response);

            // Set necessary fields for the MQTT Connection to the IoT Platform
            window.iot_host = response.org + ".messaging.internetofthings.ibmcloud.com";
            window.iot_port = 1883;
            window.iot_clientid = "d:" + response.org+ ":" + deviceInfo.typeId + ":" + deviceInfo.deviceId;
            window.client = new Paho.MQTT.Client(window.iot_host, window.iot_port, window.iot_clientid);
            window.apiToken = response.apiToken;

            registerDevice();
        },
        error: function(xhr, status, error) {
            console.error("Could not fetch organization information.");
        }
    });
}

// Register the device through the backend to the IoT Platform
// (1st. creates device type, then the actual device, all values configured at the top of this file)
function registerDevice() {
    console.log("Attempting to Register the Device");

    // Make an AJAX call to the backend
    $.ajax({
        url: "/api/registerDevice",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(deviceInfo),
        success: function(response) {
            console.log("Attempting connect");

            // After registration is successful, attempt connecting to MQTT
            connectDevice();
            
            // Publish every 100 milliseconds
            setInterval(publish, 100);
        },
        error: function(xhr, status, error) {
            if (xhr.status === 403) {
                // Authentication check succeeded and told us we're invalid
                console.error("Incorrect code!");
            } else {
                // Something else went wrong
                console.error("Failed to authenticate! " + error);
            }
        }
    });
}



// ******************* //
// ***** 2. MQTT ***** //

// Once connected, this functions is called to publish MQTT events to the IoT Platform
function publish() {
    // We only attempt to publish if we're actually connected, saving CPU and battery
    if (isConnected) {
        // The payload that will be sent (all fields go in here)
        var payload = {
            "d": {
                "id": deviceInfo.deviceId,
                "ts": (new Date()).getTime(),
                "rpm": animationSpeed
            }
        };

        // Create an MQTT message object from the payload
        var message = new Paho.MQTT.Message(JSON.stringify(payload));
        message.destinationName = topic;
        try {
            window.client.send(message);
            window.msgCount += 1;
            $("#msgCount").html(window.msgCount);
            
            console.log("[%s] Published", new Date().getTime());
        } catch (err) {
            console.error(err);

            // If there is an error, set the "connection" indicator on the screen to "Disconnected"
            isConnected = false;
            changeConnectionStatusImage("images/disconnected.svg");
            document.getElementById("connection").innerHTML = "Disconnected";
            setTimeout(connectDevice(), 1000);
        }
    }
}

// Once MQTT Connects
function onConnectSuccess() {
    // The device connected successfully
    console.log("Connected Successfully!");

    isConnected = true;
    changeConnectionStatusImage("images/connected.svg");
    document.getElementById("connection").innerHTML = "Connected";
}

// Once MQTT Fails
function onConnectFailure(error) {
    console.error(error);

    // The device failed to connect. Let's try again in one second.
    console.log("Could not connect to IBM Watson IoT Platform! Trying again in one second.");

    // Try connecting after 1000 milliseconds
    setTimeout(connectDevice(), 1000);
}


// Connect to MQTT
function connectDevice() {
    topic = "iot-2/evt/sensorData/fmt/json";
    $("#deviceId").html(deviceInfo.deviceId);

    // Update connection status on screen to "Connecting"
    changeConnectionStatusImage("images/connecting.svg");
    document.getElementById("connection").innerHTML = "Connecting";
    console.log("Connecting device to IBM Watson IoT Platform...");

    // Initiate the MQTT connection using the password set above in line 8
    window.client.connect({
        onSuccess: onConnectSuccess,
        onFailure: onConnectFailure,
        userName: "use-token-auth",
        password: deviceInfo.password
    });
}



// ************************************** //
// ***** 3. Animations/Interactions ***** //
function dropbox(index) {
    if (!stop) {
        $("g#box-" + index)
            .delay(0)
            .velocity({ translateY: -252 }, {
                duration: durationMultiplier * 0, 
                easing: "linear"
            })
            .velocity({ translateY: 0 }, {
                duration: durationMultiplier * 250, 
                easing: "easeInQuad"
            })
            .velocity({ translateX: 237.5 }, {
                duration: durationMultiplier * 1000, 
                easing: "linear",
                complete: function() { 
                    if (index === "1") {
                        dropbox("2");
                    } else if (index === "2") {
                        dropbox("1");
                    }
                }
            })
            .velocity({ translateX: 575 }, {
                duration: durationMultiplier * 1000, 
                easing: "linear"
            })
            .velocity({ translateX: 630, translateY: 15, rotateZ: 30 }, {
                duration: durationMultiplier * 300, 
                easing: "linear"
            })
            .velocity({ translateX: 715, translateY: 150, rotateZ: 85 }, {
                duration: durationMultiplier * 300, 
                easing: "linear"
            })
            .velocity({ translateY: 400, rotateZ: 100 }, {
                duration: durationMultiplier * 300, 
                easing: "linear"
            })
            .velocity({ translateY: -252, translateX: 0, rotateZ: 0 }, {
                duration: durationMultiplier * 0
            });
    }
}

function rotator() {
    $("line#rotator")
        .delay(0)
        .velocity({ rotateZ: 360 }, {
            duration: durationMultiplier * 2000, 
            easing: "linear",
            loop: true
        });
}

// Update connection status image on screen
function changeConnectionStatusImage(image) {
    document.getElementById("connectionImage").src = image;
}

$(document).ready(function() {
    init();

    rotator();
    dropbox("1");

    $("a.btn.start").addClass("disabled");

    $("a.stop").click(function() {
        console.log("STOP Clicked");

        stop = true;

        if ($("a.btn.start").hasClass("disabled")) {
            $("a.btn.start").removeClass("disabled");
        }

        if (!$("a.btn.stop").hasClass("disabled")) {
            $("a.btn.stop").addClass("disabled");
        }
    });

    $("a.start").click(function() {
        console.log("START Clicked");

        stop = false;
        dropbox("1");

        if ($("a.btn.stop").hasClass("disabled")) {
            $("a.btn.stop").removeClass("disabled");
        }

        if (!$("a.btn.start").hasClass("disabled")) {
            $("a.btn.start").addClass("disabled");
        }
    });

    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    function updateSpeedOnScreen() {
        $("span#speed-value").html(round(animationSpeed, 1) + "x");
    }

    $("a.speed-down").click(function() {
        console.log("SPEED DOWN Clicked");
        
        durationMultiplier += 0.1;
        animationSpeed -= 0.1;
        
        rotator();
        updateSpeedOnScreen();

        console.log(animationSpeed);
    });

    $("a.speed-up").click(function() {
        console.log("SPEED UP Clicked");
        
        durationMultiplier -= 0.1;
        animationSpeed += 0.1;

        rotator();
        updateSpeedOnScreen();

        console.log(animationSpeed);
    });
});