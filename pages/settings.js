import { useEffect, useState, useRef } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import styled from 'styled-components';
import { getUserSettings } from '../services/userService';
import { CardContainer } from '../components/CardContainer';
// import { Dialog, Switch } from '@headlessui/react';
// import { Bars3Icon } from '@heroicons/react/20/solid';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const fetchedUser = await getUserSettings(session.user.email);
    let user = { id: '', firstName: '', lastName: '', email: session.user.email, babyName: '', babyBirthday: '' }; // default user
    let userExists = true; //use flag to decide later if PUT or POST request needs to be triggered
    if (!fetchedUser) {
      userExists = false;
    } else {
      user = fetchedUser;
    }
    console.log('user: ', user);
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        // user: user,
        userExists: userExists,
      },
    };
  } else
    return {
      props: {},
    };
}
export default function Settings({ user, userExists: initialUserExists }) {
  // const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);

  //----- Session -----
  const { data: session } = useSession();

  const [userExists, setUserExists] = useState(initialUserExists);

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    babyName: '',
    babyBirthday: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        babyName: user.babyName,
        babyBirthday: user.babyBirthday ? user.babyBirthday : '',
      });
    } else if (session) {
      setFormData((currentData) => ({ ...currentData, email: session.user.email }));
      console.log('currentData:', currentData);
    }
  }, [user, session]);

  const [editing, setEditing] = useState(null);
  const [originalData, setOriginalData] = useState(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (field) => {
    setOriginalData(formData);
    setEditing(field);
  };

  const handleCancel = async () => {
    setFormData(originalData);
    setEditing(null);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/Users', {
        method: userExists ? 'PUT' : 'POST', // decide on method based on whether user exists or not
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          id: formData.id, // the user _id is included here
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          babyName: formData.babyName,
          babyBirthday: formData.babyBirthday,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('data:', data);

        if (!userExists) {
          // Update userExists to true after creating a new user
          setUserExists(true);
          setFormData((prevData) => ({ ...prevData, id: data.newUser._id })); // assuming the id comes as _id in the response
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setEditing(null); // stop editing after saving
  };

  if (session) {
    return (
      <CardContainer>
        <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
          <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  This information will be displayed publicly so be careful what you share.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      {editing === 'fullName' ? (
                        <>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                          <button
                            type="button"
                            onClick={handleSave}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-900">{`${formData.firstName} ${formData.lastName}`}</div>
                          <button
                            type="button"
                            onClick={() => handleUpdate('fullName')}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Update
                          </button>
                        </>
                      )}
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Babys Name</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      {editing === 'babyName' ? (
                        <>
                          <input type="text" name="babyName" value={formData.babyName} onChange={handleChange} />

                          <button
                            type="button"
                            onClick={handleSave}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-900">{formData.babyName}</div>
                          <button
                            type="button"
                            onClick={() => handleUpdate('babyName')}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Update
                          </button>
                        </>
                      )}
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Babys Birthday</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      {editing === 'babyBirthday' ? (
                        <>
                          <input
                            type="date"
                            name="babyBirthday"
                            value={formData.babyBirthday}
                            onChange={handleChange}
                          />

                          <button
                            type="button"
                            onClick={handleSave}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-900">
                            {formData.babyBirthday ? new Date(formData.babyBirthday).toISOString().split('T')[0] : ''}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleUpdate('babyBirthday')}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Update
                          </button>
                        </>
                      )}
                    </dd>
                  </div>

                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{user.email}</div>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Bank accounts</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">Connect bank accounts to your account.</p>

              <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">TD Canada Trust</div>
                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Update
                  </button>
                </li>
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">Royal Bank of Canada</div>
                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Update
                  </button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <button type="button" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  <span aria-hidden="true">+</span> Add another bank
                </button>
              </div>
            </div> */}

              {/* <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Choose what language and date format to use throughout your account.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">English</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">DD-MM-YYYY</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            </div> */}
            </div>
          </main>
        </div>
      </CardContainer>
    );
  }
  return (
    <CardContainer>
      <StyledText>You are not signed in</StyledText>
    </CardContainer>
  );
}

const StyledText = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: 2em;
`;
