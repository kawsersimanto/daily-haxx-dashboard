src
│
├── app
│ ├── (marketing)
│ │ ├── page.tsx // Home page
│ │ ├── newsletter/page.tsx
│ │ ├── articles/page.tsx
│ │ ├── articles/[slug]/page.tsx
│ │ ├── polls/page.tsx
│ │ └── polls/[id]/page.tsx
│ │
│ ├── (auth)
│ │ └── login/page.tsx
│ │
│ └── layout.tsx // Global layout (providers, styles)
│
├── features
│ ├── articles
│ │ ├── components
│ │ │ └── ArticleCard.tsx
│ │ ├── hooks
│ │ │ └── useArticles.ts
│ │ ├── store
│ │ │ └── articleStore.ts
│ │ ├── api.ts
│ │ └── types.ts
│ │
│ ├── newsletter
│ │ ├── components
│ │ │ └── NewsletterCard.tsx
│ │ ├── hooks
│ │ │ └── useNewsletter.ts
│ │ ├── store
│ │ │ └── newsletterStore.ts
│ │ ├── api.ts
│ │ └── types.ts
│ │
│ ├── polls
│ │ ├── components
│ │ │ └── PollCard.tsx
│ │ ├── hooks
│ │ │ └── usePolls.ts
│ │ ├── store
│ │ │ └── pollStore.ts
│ │ ├── api.ts
│ │ └── types.ts
│ │
│ └── auth
│ ├── components
│ │ └── OTPForm.tsx
│ ├── hooks
│ │ └── useAuth.ts
│ ├── store
│ │ └── authStore.ts
│ ├── api.ts
│ └── types.ts
│
├── components
│ ├── ui // shadcn/ui components
│ ├── layout // Header, Sidebar variants
│ └── common // Buttons, Skeletons
│
├── lib
│ ├── apiClient.ts
│ ├── react-query/
│ │ └── queryClient.ts
│ ├── zustand/
│ │ └── createSelectors.ts
│ ├── validators/
│ │ └── articleSchema.ts
│ ├── utils.ts
│ └── constants.ts
│
├── providers
│ ├── QueryProvider.tsx
│ ├── ZustandProvider.tsx
│ └── ThemeProvider.tsx
│
├── styles
│ └── globals.css
│
└── types
└── index.ts
