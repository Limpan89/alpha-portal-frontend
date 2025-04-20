export const ModalButton = ({
  type,
  target,
  text,
}: {
  type: string;
  target: string;
  text: string;
}) => {
  return (
    <button
      type="button"
      data-modal="true"
      data-target={target}
      className={`btn btn-${type}`}
    >
      <span>{text}</span>
    </button>
  );
};
