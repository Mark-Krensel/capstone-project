export default function Settings({ closeDialog }) {
  return (
    <dialog open>
      <p>Hello</p>
      <button
        onClick={() => {
          closeDialog;
        }}
      >
        Close Dialog
      </button>
    </dialog>
  );
}
