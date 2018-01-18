'use strict';


    const socket = io();
    $('.chat-form').submit(function() {
        socket.emit('chat:message', $('input').val());
        $('input').val('');
        return false;
    });

    socket.on('chat:message', (msg) => {
        $('ul').append($('<li>').text(msg));
    });



