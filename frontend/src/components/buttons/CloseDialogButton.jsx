export default function CloseDialogButton({ handleClose }) {
  <button
    onClick={handleClose}
    className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600"
    aria-label="Close"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>;
}
