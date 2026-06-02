type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-lg border border-gold/15 bg-surface/82 shadow-soft ${className}`}>{children}</div>;
}
