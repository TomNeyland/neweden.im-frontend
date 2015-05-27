// This code is very rough atm, just wanted to be a baseline example working
import angular from 'angular';
import 'angular-ui-utils';
import 'angular-ui-router';
import 'angular-material';
import io from 'socket.io-client';
import 'angular-socket-io';


var chatroomModule = angular.module('app.chatroom', ['ui.router', 'ui.keypress', 'ngMaterial', 'btford.socket-io']);


chatroomModule.factory('chatSocket', ['socketFactory', function(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('/api/chat'),
        room: 'notifications'
    });
}]);


chatroomModule.factory('ChatService', ['chatSocket', function(chatSocket) {
    return chatSocket;
}]);


class ChatroomCtrl {

    constructor($scope, $stateParams, chatSocket) {

        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.chatSocket = chatSocket;

        this.chatroom = $stateParams.chatroom;
        this.messages = [];
        this.members = {};
        this.currentMessage = '';

        // register socket event handlers
        chatSocket.on('connect', () => this.onConnect());
        chatSocket.on('message', (message) => this.onMessage(message));
        chatSocket.on('join chatroom', (room, characterData) => this.onJoinChatroom(room, characterData));

        window.Chatroom = this; // hahaha i am so lazy in CDT

        this.$scope.$on('$destroy', (evt, scope) => this.onDestroy(evt, scope));

        this.joinChatroom();
    }

    onConnect() {
        this.connected = true;
    }

    onDestroy(evt, scope) {
        this.leaveChatroom();
        this.chatSocket.removeListener('connect');
        this.chatSocket.removeListener('join chatroom');
        this.chatSocket.removeListener('leave chatroom');
        this.chatSocket.removeListener('message');
        console.log('onDestroy', arguments);
    }

    joinChatroom() {
        // send a message to the server attempting to join
        return this.chatSocket.emit('join chatroom', this.chatroom);
    }

    leaveChatroom() {
        // send a message to the server attempting to join
        return this.chatSocket.emit('leave chatroom', this.chatroom);
    }

    onJoinChatroom(characterData) {
        // server sent a message indicating someone joined
        console.log('join chatroom', characterData);
        this.members[characterData.CharacterID] = characterData;
    }

    onMessage(message) {
        // someone sent a message
        this.messages.push(message);
        this.$scope.$apply();
    }

    sendMessage() {
        // duh
        this.chatSocket.emit('message', {
            body: this.currentMessage,
            room: this.chatroom,
            type: 'basic'
        });
        this.currentMessage = '';
    }
}

ChatroomCtrl.$inject = ['$scope', '$stateParams', 'ChatService'];

chatroomModule.controller('ChatroomCtrl', ChatroomCtrl);


chatroomModule.config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('chatroom', {
        url: '/room/:chatroom',
        template: require('./_chatroom.html'),
        controller: 'ChatroomCtrl',
        controllerAs: 'Chatroom'
    });

}]);


export default chatroomModule;
