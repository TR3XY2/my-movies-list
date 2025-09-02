type MovieDetailsProps = {
  selectedId: string;
};

export function MovieDetails({ selectedId }: MovieDetailsProps) {
  return <div className="details">{selectedId}</div>;
}
