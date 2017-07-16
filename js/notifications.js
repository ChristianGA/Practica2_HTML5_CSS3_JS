function sendNotification (msg, body) { 
    var notification = Notification || mozNotification || webkitNotification;

    if (body) {
        var options = {
            body: body
        };
    }

    if (typeof notification === 'undefined') {
        alert("Notificaciones no soportadas");
    } else {
        notification.requestPermission(function (permission) {
            if (Notification.permission === 'granted') {
                new Notification(msg, options);
            }
        });
    }
}