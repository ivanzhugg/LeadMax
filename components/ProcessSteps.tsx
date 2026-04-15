import type { ProcessStep } from "@/types/content";

type ProcessStepsProps = {
  steps: ProcessStep[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="surface-card relative overflow-hidden p-6">
          <span className="absolute right-5 top-4 text-5xl font-bold text-moss/10">0{index + 1}</span>
          <span className="text-sm font-bold text-leaf">0{index + 1}</span>
          <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
