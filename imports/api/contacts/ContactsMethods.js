import { ContactsCollection } from './ContactsCollection'

Meteor.methods(
  {
    'contacts.insert': ({ name, email, imageUrl }) => {
      if (!name) {
        throw new Meteor.Error("Name is required")
      }
      if (!email) {
        throw new Meteor.Error("Email is required")
      }
      if (!imageUrl) {
        throw new Meteor.Error("ImageUrl is required")
      }
      return ContactsCollection.insert({ name, email, imageUrl })
    }
  }
)