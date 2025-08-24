import { Metadata } from "next";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Daily Haxx";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const APP_DESCRIPTION =
  "Insight you can trust, trusted by professionals worldwide.";
const APP_IMAGE = "/social.png";

export const getDefaultMetadata = (overrides?: Partial<Metadata>): Metadata => {
  const title = overrides?.title ?? APP_NAME;

  return {
    title: {
      default: APP_NAME,
      template: `%s | ${APP_NAME}`,
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    description: overrides?.description ?? APP_DESCRIPTION,
    openGraph: {
      title,
      description: overrides?.description ?? APP_DESCRIPTION,
      url: APP_URL,
      siteName: APP_NAME,
      images: [
        {
          url: APP_IMAGE,
          width: 1200,
          height: 630,
          alt: APP_NAME,
        },
      ],
      locale: "en_US",
      type: "website",
      ...overrides?.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: overrides?.description ?? APP_DESCRIPTION,
      images: [APP_IMAGE],
      ...overrides?.twitter,
    },
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: APP_URL,
      ...overrides?.alternates,
    },
    ...overrides,
  };
};
