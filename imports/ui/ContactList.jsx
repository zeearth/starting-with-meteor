import { Meteor } from 'meteor/meteor'
import React, { memo, useState } from 'react'
import { ContactsCollection } from '../api/contacts/ContactsCollection'
import '../api/contacts/ContactsMethods'
import { useSubscribe, useFind } from 'meteor/react-meteor-data'
import { ErrorAlert } from './components/alert/ErrorAlert'
import { SuccessAlert } from './components/alert/SuccessAlert'

export const ContactList = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isLoading = useSubscribe('contacts')
  const contacts = useFind(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } })
  })

  if (isLoading()) {
    return (
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Loading ...
        </h3>
      </div>
    )
  }

  const showError = ({ message }) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 5000)
  }

  const showSuccess = ({ message }) => {
    setSuccess(message)
    setTimeout(() => {
      setSuccess('')
    }, 5000)
  }

  const ContactItem = memo(
    ({ contact }) => {
      return (
        <li className="py-4 flex items-center justify-between space-x-3">
          <div className="min-w-0 flex-1 flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={contact.imageUrl} alt=""/>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
              <p className="text-sm font-medium text-gray-500 truncate">{contact.email}</p>
            </div>
            <div>
              <a
                href="#"
                onClick={(event) => archiveContact(event, contact._id)}
                className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              >
                Archive
              </a>
            </div>
          </div>
        </li>
      )
    }
  )

  const archiveContact = (event, idContact) => {
    event.preventDefault()
    Meteor.call('contacts.archive', { contactId: idContact }, (errorResponse) => {
      if (errorResponse) {
        showError({ message: errorResponse.error })
      } else {
        showSuccess({ message: 'Contact removed.' })
      }
    })
  }

  return (
    <div>
      {error && <ErrorAlert message={error}/>}
      {success && <SuccessAlert message={success}/>}
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {contacts.map((person, personIdx) => (
            <ContactItem key={person._id} contact={person}/>
          ))}
        </ul>
      </div>
    </div>
  )
}