export default function Settings({ closeDialog, onSubmit }) {
  // const { data: session } = useSession();

  function sendForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { firstName, lastName, babyName, babyBirthday, email } = Object.fromEntries(formData);
    onSubmit({ firstName, lastName, babyName, babyBirthday, email });
    event.target.reset();
    closeDialog();
  }

  return (
    <dialog open>
      <p>Hello</p>
      <form onSubmit={sendForm}>
        <input type="text" name="firstName" placeholder="Your First Name" />
        <input type="text" name="lastName" placeholder="Your Last Name" />
        <input type="text" name="babyName" placeholder="Your Baby's Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="date" name="babyBirthday" placeholder="Your Baby's Birthday" />
        <button>Close Dialog</button>
      </form>
    </dialog>
  );
}
