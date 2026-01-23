import { db } from '../../DB/conncetion.db.js';

export const createBooksCollection = async () => {
  await db.createCollection('books', {
    validator: {
      $jsonSchema: {
        required: ['title'],
        properties: {
          title: {
            bsonType: 'string',
            minLength: 1
          }
        }
      }
    }
  });
};

export const createAuthorsCollection = async () => {
  await db.authors.insertOne({name:"Author1",nationality:"British"});
};

export const createLogsCapped = async () => {
  await db.createCollection("logs",{capped:true,size:1024*1024})
};

export const createBooksIndex = async () => {
  await db.collection('books').createIndex({ title: 1 });
};
