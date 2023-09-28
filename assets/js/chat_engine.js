class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // this.socket = io.connect('http://localhost:3000');
        this.socket = io('http://localhost:3000', { transports : ['websocket'] });
        if(this.userEmail){
            this.connectionHandler();
        }

    }
    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log("New connection established using sockets...");

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'lantern'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined', data);
            })

            
        })

        $('#send-message').click(function(){
            let msg = $('#chatting-textbox').val();
            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'lantern'
                })
            }
        })

        self.socket.on('receive_message', function(data){
            console.timeLog("message received", data.message);

            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }))

            newMessage.append( $('<sub>',{
                'html': data.user_email
            }))

            newMessage.addClass(messageType);
            $('#chatting-main').append(newMessage);
        })

    }
}