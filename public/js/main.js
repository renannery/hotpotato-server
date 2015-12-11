window.onload = function() {
    // TODO:: Do your initialization job

    var jid;
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName == "back")
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
    });

    $('#btn-send-potato').click(function() {
        for (var i = 1; i <= 3; i++) {
            setTimeout(createPotatoAndSend, 5000 * i);
        }
    });

    function createPotatoAndSend() {

        dpd.potatoes.post({
            name: "NameTest",
            enable: true,
            secondsToBurn: Math.floor(Math.random() * 60) + 10
        }, function(result, error) {
            if (error) {
                // An error could be either the err.message property, or err.errors.title, so we account for either case
                alert(err.message || (err.errors && err.errors.title));
                return;
            }
            connect(result.id);
        });
        return false;
    }

    function connect(message) {

        jid = "renannery10"
        var password = "Senha2015"
        var messageTo = "";

        //An example of bosh server. This site is working but it can change or go down.
        //If you are going to have a production site, you must install your own BOSH server
        var url = "http://jabber.rootbash.com:7070/http-bind/";
        $.xmpp.connect({
            url: url,
            jid: jid,
            password: password,
            onConnect: function() {
                alert("Connected " + message);
                sendMessage(message);
                $.xmpp.setPresence(null);
            },
            onPresence: function(presence) { },
            onDisconnect: function() {
                alert("Disconnected");
            },

            onMessage: function(message) {
                var user = message.from.split("@", 1);
                alert(user + "\n" + message.body);
            },
            onError: function(error) {
                alert(error.error);
            }
        });
    }

    function sendMessage(message) {
        var messageTo;
        messageTo = "ursinho@jabber.rootbash.com";
        // if (jid == "renannery10") {
            
        // } else {
        //     messageTo = "renannery10@jabber.rootbash.com";
        // }

        $.xmpp.sendMessage({
            body: message,
            to: messageTo
        });
    }
};
