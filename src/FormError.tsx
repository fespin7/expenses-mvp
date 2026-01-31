export default function FormError({ message }: { message?: string }) {
  return <p className="form-field-error">{message}</p>;
}
