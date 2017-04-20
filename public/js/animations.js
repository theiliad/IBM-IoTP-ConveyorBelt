$(function() {
    console.log( "ready!" );

    function dropbox(index) {
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

    rotator();
    dropbox("1");
    

    function rotator() {
        $("line#rotator")
            .delay(0)
            .velocity({ rotateZ: 360 }, {
                duration: 2000, 
                easing: "linear",
                loop: true
            });
    }
});