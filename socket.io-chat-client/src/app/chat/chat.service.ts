import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    sendMessage(message) {
        this.socket.emit('add-message', message);
    }

    getMessage() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);

            this.socket.on('server-message', (data) =>  {
                observer.next(data);
            });

            this.socket.on('broadcast', (data) =>  {
                observer.next(data);
            });

            // Socket events
            this.socket.on('connecting', () => {
                observer.next('Connecting...');
            });

            this.socket.on('connect', () => {
                observer.next('You\'re connected!!!');
            });

            this.socket.on('disconect', () => {
                observer.next('You\'re disconnected!!!');
            });

            this.socket.on('reconnecting', () => {
                observer.next('Reconnecting...');
            });

            this.socket.on('reconnect', () => {
                observer.next('Reconnected!!!');
            });

            this.socket.on('reconnect_failed', () => {
                observer.next('Reconnect failed!!!');
            });

            this.socket.on('error', () => {
                observer.next('An error event is sent from the server');
            });

            return () => {
                this.socket.disconnect();
            }
        });

        return observable;
    }
}