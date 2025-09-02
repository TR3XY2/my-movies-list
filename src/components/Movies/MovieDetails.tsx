type MovieDetailsProps = {
  selectedId: string;
  onCloseMovie: React.MouseEventHandler<HTMLButtonElement>;
};

export function MovieDetails({ selectedId, onCloseMovie }: MovieDetailsProps) {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
}
