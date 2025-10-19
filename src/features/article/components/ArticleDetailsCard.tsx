"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/date";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { useGetArticleBySlugQuery } from "../article.api";
import { ArticleDetailsCardSkeleton } from "./ArticleDetailsCardSkeleton";

export const ArticleDetailsCard = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetArticleBySlugQuery(slug);
  const article = data?.data;

  return (
    <>
      {isLoading ? (
        <ArticleDetailsCardSkeleton />
      ) : isError ? (
        <Card className="w-full p-3.5 rounded-md shadow-none gap-9"></Card>
      ) : (
        <Card className="w-full p-3.5 rounded-md shadow-none gap-9">
          <div>
            <div className="overflow-hidden rounded lg:h-[438px] h-[280px]">
              <Image
                src={article?.coverImage || "/placeholder.png"}
                alt={article?.title || "Placeholder"}
                width={800}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center justify-between mt-3.5">
              <div className="flex items-center sm:gap-3 gap-2">
                <p className="text-light-muted md:text-base text-sm capitalize">
                  {formatDate(article?.createdAt)}
                </p>
                <span className="text-light-muted">•</span>
                <span className="text-light-muted md:text-base text-sm">
                  {article?.companyName}
                </span>
              </div>
              <div className="flex items-center sm:gap-5 gap-2">
                <p className="flex items-center gap-2 text-base">
                  <UserCircle size={18} />
                  {article?.user?.firstName} {article?.user?.lastName}
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-0 relative">
            <h2 className="sm:text-4xl text-xl mb-4 text-foreground font-bold leading-[120%] pb-5 border-b border-border">
              {article?.title || "No Title Found"}
            </h2>
            <div className="relative">
              <div
                className="text-foreground text-lg prose"
                dangerouslySetInnerHTML={{ __html: article?.body || "" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
