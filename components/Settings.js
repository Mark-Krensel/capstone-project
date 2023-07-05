import styled from 'styled-components';
import { Button } from '../components/Button';

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
    <StyledDialog>
      <p>Hello</p>
      <form onSubmit={sendForm}>
        <StyledInput type="text" name="firstName" placeholder="Your First Name" />
        <StyledInput type="text" name="lastName" placeholder="Your Last Name" />
        <StyledInput type="text" name="babyName" placeholder="Your Baby's Name" />
        <StyledInput type="email" name="email" placeholder="Your Email" />
        <StyledInput type="date" name="babyBirthday" placeholder="Your Baby's Birthday" />
        <CloseButton>Close Dialog</CloseButton>
      </form>
    </StyledDialog>
  );
}

const StyledDialog = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: var(--not-white);
  padding: 20px;
  border-radius: 9px;
`;

const StyledInput = styled.input`
  width: 8em;
  max-height: 2em;
  border-radius: 0.5em;
  font-size: var(--form-fontSize);
  font-family: 'Noto Sans';
  color: var(--not-black);
  margin: 0.5em 0.5em;
  padding: 0 0.2em;

  ::placeholder {
    text-align: center;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  bottom: -3em;
  font-size: 2em;
  background-color: var(--background-primary);
  padding: 0.2em 1em;
  border-radius: 1em;
  border: 0.1em var(--text-secondary) solid;
  box-shadow: var(--shadow-elevation);
`;
