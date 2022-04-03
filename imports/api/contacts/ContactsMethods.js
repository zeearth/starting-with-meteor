import { check } from 'meteor/check'
import { Meteor} from 'meteor/meteor'
import { ContactsCollection } from './ContactsCollection'

Meteor.methods(
  {
    'contacts.insert': ({ name, email, imageUrl }) => {
      check(name, String)
      check(email, String)
      check(imageUrl, String)
      if (!name) {
        throw new Meteor.Error('Name is required')
      }
      if (!email) {
        throw new Meteor.Error('Email is required')
      }
      if (!imageUrl) {
        throw new Meteor.Error('ImageUrl is required')
      }
      return ContactsCollection.insert({ name, email, imageUrl })
    },
    'contacts.remove': ({ contactId }) => {
      check(contactId, String)
      return ContactsCollection.remove(contactId)
    },
    'contacts.archive': ({ contactId }) => {
      check(contactId, String)
      return ContactsCollection.update({ _id: contactId }, {$set: {archived: true}})
    }
  }
)