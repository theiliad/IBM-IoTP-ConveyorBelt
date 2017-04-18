$(function() {
    console.log( "ready!" );

    $("g.iot-box")
        .delay(0)
        .velocity({ translateY: -252 }, {
            duration: 0, 
            easing: "linear"
        })
        .velocity({ translateY: 0 }, {
            duration: 250, 
            easing: "easeInQuad"
        })
        .velocity({ translateX: 575 }, {
            duration: 2000, 
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
        });

    $("line#rotator")
        .delay(0)
        .velocity({ rotateZ: 360 }, {
            duration: 2000, 
            easing: "linear",
            loop: true
        });
});