export default function AdminBreadcumb({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-amber-500">{title}</h2>
      <p className="text-zinc-500 mt-1">{subtitle}</p>
    </div>
  );
}
