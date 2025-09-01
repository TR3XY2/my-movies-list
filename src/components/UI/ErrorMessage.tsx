type ErrorMessageType = {
  message: string;
}

export function ErrorMessage({ message } : ErrorMessageType) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}
