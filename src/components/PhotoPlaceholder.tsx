/** Placeholder until real project photography is supplied. No stock images are used. */
export default function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="photo" role="img" aria-label={`${label}. Photo to be supplied.`}>
      {label}
      <br />
      Photo to be supplied
    </div>
  );
}
