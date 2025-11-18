import { IArticleCategory } from "@/features/article-category/article-category.interface";
import { IUser } from "@/features/user/user.interface";

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
