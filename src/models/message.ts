export interface Message {
    
    isAccepted?: boolean ; 
    level?: string;
    message?: string;
    place?: string;
    topic?: string;
    subject?: string;
    reciever?: string;
    recieverfname?: string;
    senderfname?: string;
    sender?: string;
    isRead? : boolean;
    senderphotoURL?: string;
    recieverphotoURL?: string;
    timestamp?: any;
    isBuddies?: boolean;

}