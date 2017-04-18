$(function() {
    console.log( "ready!" );

    function dropbox() {
        $("path#belt").before(`
        <g id="XMLID_23_" class="iot-box">
            <path id="XMLID_63_" style="fill:#FDBB50;" d="M265.521,351.98v113.38c0,6.6-5.4,12-12,12h-113.37c-6.6,0-12-5.4-12-12V351.98
                c0-6.6,5.4-12,12-12h113.37C260.121,339.98,265.521,345.38,265.521,351.98z"/>
            <path id="XMLID_53_" style="fill:#FFFFFF;" d="M265.521,399.21v5.67h-34.72c-1.57,0-2.84,1.27-2.84,2.83v22.43
                c0,0.78-0.32,1.5-0.83,2.01c-0.51,0.51-1.22,0.83-2,0.83c-1.56,0-2.83-1.27-2.83-2.84v-28.09c0-1.57,1.27-2.84,2.83-2.84H265.521z"
                />
            <path id="XMLID_54_" style="fill:#FFFFFF;" d="M171.641,364.82v20.85c0,0.79-0.31,1.49-0.83,2c-0.51,0.51-1.22,0.83-2,0.83
                c-1.56,0-2.83-1.26-2.83-2.83v-15.18c0-1.57-1.27-2.83-2.84-2.83h-34.99v-5.67h40.66C170.381,361.99,171.641,363.26,171.641,364.82
                z"/>
            <rect id="XMLID_47_" x="127.642" y="419.527" style="fill:#FFFFFF;" width="62.403" height="5.667"/>
            <path id="XMLID_56_" style="fill:#FFFFFF;" d="M248.191,363.86c0,1.56-1.27,2.83-2.83,2.83h-46.12c-1.56,0-2.83-1.27-2.83-2.83
                v-23.88h5.66v18.21c0,1.57,1.27,2.84,2.84,2.84h40.45c0.78,0,1.49,0.32,2,0.83S248.191,363.08,248.191,363.86z"/>
            <path id="XMLID_58_" style="fill:#FFFFFF;" d="M211.631,453.68v23.68h-5.67v-23.68c0-1.57,1.27-2.84,2.84-2.84
                C210.361,450.84,211.631,452.11,211.631,453.68z"/>
            <path id="XMLID_57_" style="fill:#FFFFFF;" d="M265.521,383.03v5.67h-14.49c-1.57,0-2.84-1.27-2.84-2.84
                c0-1.56,1.27-2.83,2.84-2.83H265.521z"/>
            <circle id="XMLID_49_" style="fill:#EE302F;" cx="248.194" cy="363.86" r="10.617"/>
            <circle id="XMLID_48_" style="fill:#EE302F;" cx="190.045" cy="422.361" r="10.617"/>
            <rect id="XMLID_60_" x="158.191" y="447.13" style="fill:#FFFFFF;" width="5.67" height="30.23"/>
            <circle id="XMLID_45_" style="fill:#EE302F;" cx="161.024" cy="447.133" r="10.617"/>
            <circle id="XMLID_44_" style="fill:#EE302F;" cx="168.812" cy="388.505" r="10.617"/>
            <circle id="XMLID_43_" style="fill:#EE302F;" cx="225.169" cy="432.977" r="10.617"/>
        </g>`);

        $("div#svg-container").html($("div#svg-container").html());
        initialize();

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
                easing: "linear",
                complete: function() { 
                    dropbox();
                }
            });
    }

    dropbox();

    function initialize() {
        $("line#rotator")
            .delay(0)
            .velocity({ rotateZ: 360 }, {
                duration: 2000, 
                easing: "linear",
                loop: true
            });
    }
});