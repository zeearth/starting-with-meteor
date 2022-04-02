import React, { useState } from 'react'
import { ContactsCollection } from '../api/ContactsCollection'

export const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const changeValue = (event) => {
    const value = event.target.value
    switch (event.target.name) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'imageUrl':
        setImageUrl(value)
        break
      default:
        console.log('should not be happen')
    }
  }

  const cleanForm = () => {
    setName('')
    setEmail('')
    setImageUrl('')
  }

  const saveContact = () => {
    console.log({name, email, imageUrl})
    ContactsCollection.insert({name, email, imageUrl})
    cleanForm()
  }

  return (
    <form>
      <div>
        <label htmlFor={'name'}>
          Name
        </label>
        <input id={'name'} name={'name'} type={'text'} onChange={changeValue} value={name}/>
      </div>
      <div>
        <label htmlFor={'email'}>
          Email
        </label>
        <input id={'email'} name={'email'}  type={'text'} onChange={changeValue} value={email}/>
      </div>
      <div>
        <label htmlFor={'imageUrl'}>
          Image Url
        </label>
        <input id={'imageUrl'} name={'imageUrl'} type={'text'} onChange={changeValue} value={imageUrl}/>
      </div>
      <div>
        <button type={'button'} onClick={saveContact}>Save Contact</button>
      </div>
    </form>
  )
}