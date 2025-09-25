import { SubscriptionMetrics } from "@/features/dashboard/components/SubscriptionMetrics";

export const Dashboard = () => {
  const userChart = [
    { x: 0, y: 40 },
    { x: 20, y: 55 },
    { x: 40, y: 50 },
    { x: 60, y: 70 },
    { x: 80, y: 65 },
    { x: 100, y: 80 },
  ];

  const subsChart = [
    { x: 0, y: 30 },
    { x: 20, y: 20 },
    { x: 40, y: 40 },
    { x: 60, y: 35 },
    { x: 80, y: 45 },
    { x: 100, y: 50 },
  ];

  const revenueChart = [
    { x: 0, y: 20 },
    { x: 20, y: 40 },
    { x: 40, y: 60 },
    { x: 60, y: 55 },
    { x: 80, y: 75 },
    { x: 100, y: 90 },
  ];

  return (
    <section className="pt-6.5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SubscriptionMetrics
          title="Users"
          value="1,200"
          percentageChange={8}
          period="this week"
          chartData={userChart}
        />
        <SubscriptionMetrics
          title="Subscriptions"
          value="450"
          percentageChange={-3}
          period="this week"
          chartData={subsChart}
        />
        <SubscriptionMetrics
          title="Revenue"
          value="$3,250.75"
          percentageChange={12}
          period="this week"
          chartData={revenueChart}
        />
      </div>
    </section>
  );
};
