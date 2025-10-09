import { IUser } from "@/features/user/user.interface";

export interface IArticleCategory {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface IArticle {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  slug: string;
  coverImage: string;
  body: string;
  companyName: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  category: IArticleCategory;
  user: IUser;
}
