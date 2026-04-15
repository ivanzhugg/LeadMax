type Stat = {
  value: string;
  label: string;
};

type StatsProps = {
  items: Stat[];
};

export function Stats({ items }: StatsProps) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="surface-card p-6">
          <dt className="text-sm text-muted">{item.label}</dt>
          <dd className="mt-2 text-3xl font-bold text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
