export interface IPollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface IPollCategories {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPoll {
  id: string;
  userId: string;
  categoryId: string;
  question: string;
  slug: string;
  coverImage: string;
  companyName: string;
  options: IPollOption[];
  createdAt: string;
  updatedAt: string;
  totalVotes: number;
}

export interface IPollDetails extends Omit<IPoll, "userId" | "categoryId"> {
  options: IPollOption[];
  category: string | null;
  feedbacks: string;
}

export interface IPollProps {
  data: IPoll | IPollDetails;
}
