import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import styled from 'styled-components';
import { getAllDays } from '../services/dayService';

import { CardContainer } from '../components/CardContainer';
import Card from '../components/Card';
import { Button } from '../components/Button';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const days = await getAllDays(session.user.email);
    return {
      props: { days: JSON.parse(JSON.stringify(days)) },
    };
  } else
    return {
      props: {},
    };
}

export default function SettingsPage() {
  const { data: session } = useSession();

  function sendForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { firstName, lastName, babyName, babyBirthday, email } = Object.fromEntries(formData);
    onSubmit({ firstName, lastName, babyName, babyBirthday, email });
    event.target.reset();
  }

  const [attributes, setAttributes] = useState({
    firstName: 'Tim',
    lastName: 'Smith',
    dateOfBirth: '1990-01-01',
    email: 'tim.smith@example.com',
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
  });

  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (
      inputValues.firstName !== attributes.firstName ||
      inputValues.lastName !== attributes.lastName ||
      inputValues.dateOfBirth !== attributes.dateOfBirth
    ) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [inputValues, attributes]);

  const handleEditClick = (attribute) => {
    setInputValues((prev) => ({ ...prev, [attribute]: attributes[attribute] }));
    setEditMode((prev) => ({ ...prev, [attribute]: true }));
  };

  const handleInputChange = (e, attribute) => {
    setInputValues((prev) => ({ ...prev, [attribute]: e.target.value }));
  };

  const handleSaveClick = () => {
    setAttributes(inputValues);
    setEditMode({
      firstName: false,
      lastName: false,
      dateOfBirth: false,
    });
    setIsModified(false);
  };

  if (session) {
    return (
      //   <>
      //     <p>Hello</p>
      //     <FormElement onSubmit={sendForm}>
      //       <StyledInput type="text" name="firstName" placeholder="Your First Name" />
      //       <StyledInput type="text" name="lastName" placeholder="Your Last Name" />
      //       <StyledInput type="text" name="babyName" placeholder="Your Baby's Name" />
      //       <StyledInput type="email" name="email" placeholder="Your Email" />
      //       <StyledInput type="date" name="babyBirthday" placeholder="Your Baby's Birthday" />
      //       <CheckButton aria-label="save data">SAVE</CheckButton>
      //     </FormElement>
      //   </>
      <StyledDiv>
        <h2>Settings</h2>
        <span>{attributes.firstName}</span>
        {Object.entries(attributes).map(([attribute, value]) => (
          <div key={attribute}>
            <span>{`${attribute[0].toUpperCase() + attribute.slice(1)}: `}</span>
            {!editMode[attribute] ? (
              <>
                <span>{value}</span>
                {attribute !== 'email' && <button onClick={() => handleEditClick(attribute)}>Edit</button>}
              </>
            ) : (
              <input type="text" value={inputValues[attribute]} onChange={(e) => handleInputChange(e, attribute)} />
            )}
          </div>
        ))}
        <button
          style={{ backgroundColor: isModified ? 'green' : 'grey' }}
          onClick={handleSaveClick}
          disabled={!isModified}
        >
          Save
        </button>
      </StyledDiv>
    );
  }
  return <></>;
}

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

//isalreeady used in FormDB -> export &import
const CheckButton = styled(Button)`
  position: absolute;
  bottom: -3em;
  font-size: 2em;
  background-color: var(--background-primary);
  padding: 0.2em 1em;
  border-radius: 1em;
  border: 0.1em var(--text-secondary) solid;
  box-shadow: var(--shadow-elevation);
`;

const StyledDiv = styled.div`
  background: var(--background-secondary-blur);
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  border-radius: 2em;
  box-shadow: var(--shadow-elevation);
  backdrop-filter: blur(10px);
  height: 50%;
  width: 100%;
  gap: 0 0.5em;
  margin: 2em 1em 6em 1em;
  padding-top: 1em;
`;
