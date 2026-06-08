export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-7">
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-[#0F766E]/30 bg-[#0F766E]/10 px-4 py-2 text-xs font-black text-[#0F766E]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0B172A] md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm font-bold leading-8 text-[#66758A]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
