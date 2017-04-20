var stop = false;
var animationSpeed = 1.0;
var durationMultiplier = 1.0;

$(function() {
    console.log( "ready!" );

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

    rotator();
    dropbox("1");
    
    $("a.btn.start").addClass("disabled");
    

    function rotator() {
        $("line#rotator")
            .delay(0)
            .velocity({ rotateZ: 360 }, {
                duration: durationMultiplier * 2000, 
                easing: "linear",
                loop: true
            });
    }

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