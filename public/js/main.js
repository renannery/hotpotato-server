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
            secondsToBurn: Math.floor(Math.random() * (60 - 10 + 1)) + 10
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
        getRandomUser(message);

    }

    function createUser() {
        $.ajaxSetup({
            headers: {
                "Authorization": "koNH9NW6U11Ws23g",
                "Content-Type": "application/json"
            }
        });

        var user = '{"username": "teste10","password": "p4ssword"}';

        $.ajax({
            url: 'http://54.94.241.117:9090/plugins/restapi/v1/users',
            type: "POST",
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            data: JSON.stringify(user),
            success: function(data) {
                console.log("JSON Data: " + data + " status " + status);
            }
        });
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
