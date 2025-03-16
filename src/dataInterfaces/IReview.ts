import { IUser } from "./IUser";

export interface IReview {
    reviewId: string;
    title: string;
    comment: string;
    stars: number;
    likes: number;
    user: IUser;
    createdAt: string;
}
