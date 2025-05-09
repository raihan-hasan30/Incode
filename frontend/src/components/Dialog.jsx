function Dialog({ open, onClose, title, children, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-all">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-amber-500 text-xl font-bold focus:outline-none"
          aria-label="Close dialog"
        >
          ×
        </button>
        {title && <h2 className="text-xl font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">{title}</h2>}
        <div className="mb-6 text-zinc-200">{children}</div>
        {actions && <div className="flex justify-end gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export default Dialog;
