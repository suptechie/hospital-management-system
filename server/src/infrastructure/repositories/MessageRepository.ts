import IMessage from "../../domain/entities/IMessage";
import IMessageRepository from "../../domain/interface/repositories/IMessageRepository";
import { PaginatedResult } from "../../types";
import MessageModel from "../model/Message";
import { getPaginatedResult } from "./getPaginatedResult";

export default class MessageRepository implements IMessageRepository {
    model = MessageModel;
    async create(message: IMessage): Promise<void> {
        await this.model.create(message)
    }
    async findById(_id: string): Promise<IMessage | null> {
        return await this.model.findById(_id)
    }
    async findByChatId(chatId: string, limit: number, offset: number): Promise<PaginatedResult<IMessage>> {
        const totalItems = await this.model.countDocuments({ chatId });
        const items = await this.model.find({ chatId }).limit(limit);
        return getPaginatedResult(totalItems, offset, limit, items);
    }
    async markAsRead(messageId: string): Promise<void> {
        await this.model.findByIdAndUpdate(messageId, { isReceived: true });
    }
    async getUnreadMessageCountGroupedByChat(receiverId: string): Promise<{ _id: string, count: number }[]> {
        return await this.model.aggregate([
            { $match: { receiverId, isReceived: false } },  
            { $group: { _id: "$chatId", count: { $sum: 1 } } }  
        ]);
    }
    
}