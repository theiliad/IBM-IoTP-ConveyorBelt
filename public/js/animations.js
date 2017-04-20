    var stop = false;

$(function() {
    console.log( "ready!" );

    function dropbox(index) {
        if (!stop) {
            $("g#box-" + index)
                .delay(0)
                .velocity({ translateY: -252 }, {
                    duration: 0, 
                    easing: "linear"
                })
                .velocity({ translateY: 0 }, {
                    duration: 250, 
                    easing: "easeInQuad"
                })
                .velocity({ translateX: 237.5 }, {
                    duration: 1000, 
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
                    duration: 1000, 
                    easing: "linear"
                })
                .velocity({ translateX: 630, translateY: 15, rotateZ: 30 }, {
                    duration: 300, 
                    easing: "linear"
                })
                .velocity({ translateX: 715, translateY: 150, rotateZ: 85 }, {
                    duration: 300, 
                    easing: "linear"
                })
                .velocity({ translateY: 400, rotateZ: 100 }, {
                    duration: 300, 
                    easing: "linear"
                })
                .velocity({ translateY: -252, translateX: 0, rotateZ: 0 }, {
                    duration: 0
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
                duration: 2000, 
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
});