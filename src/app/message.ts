export interface Message {
    userIdTo: number
    userIdFrom: number
    messageBody: string
    attachmentUrl: string
    datetime: Date
}