// Shared by the account forms (AccountView, ResetPasswordForm, UpdatePasswordForm).
export const authStyles = {
  label: "mb-2 block text-[11px] font-semibold uppercase tracking-[1.5px] text-ink",
  field:
    "w-full rounded-sm border border-line-dark bg-white p-3.5 text-[13px] outline-none transition duration-300 focus:border-gold",
  primary:
    "cursor-pointer bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-white transition duration-300 ease-silk hover:bg-gold disabled:cursor-wait disabled:opacity-60",
  secondary:
    "cursor-pointer border border-ink bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-ink transition duration-300 ease-silk hover:bg-ink hover:text-white",
  link: "text-[11px] uppercase tracking-[1.5px] text-muted underline-offset-4 transition duration-300 hover:text-gold hover:underline",
  error: "text-[13px] leading-[1.6] text-[#9b3b2f]",
};
