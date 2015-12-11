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
        createPotatoAndSend();
    });

    function createPotatoAndSend() {

        dpd.potatoes.post({
            name: "RandomPotato",
            enable: true,
            secondsToBurn: Math.floor(Math.random() * 60) + 10
        }, function(result, error) {
            if (error) {
                alert(err.message || (err.errors && err.errors.title));
                return;
            }
            connect(result.id);
        });
        return false;
    }

    function connect(message) {

        jid = "jean10"
        var password = "Senha2015"

        var url = "http://jabber.rootbash.com:7070/http-bind/";
        $.xmpp.connect({
            url: url,
            jid: jid,
            password: password,
            onConnect: function() {

                sendMessage(message);
                $.xmpp.setPresence(null);
            },
            onPresence: function(presence) {},
            onDisconnect: function() {
                alert("Disconnected");
            },

            onMessage: function(message) {},
            onError: function(error) {
                alert(error.error);
            }
        });
    }

    function sendMessage(message) {
        //TODO How can I deal with callbacks
        getRandomUser(message);

    }

    function getRandomUser(message) {
        dpd.users.get(function(users, error) {
            if (error) {
                alert(error.message);
                return;
            }

            var index = Math.floor(Math.random() * users.length) + 0;
            var username = users[index].chatUsername;
            var messageTo = username + "@jabber.rootbash.com";
            alert("Send " + message + " to " + username);
            $.xmpp.sendMessage({
                body: message,
                to: messageTo
            });
        });
    }
};
