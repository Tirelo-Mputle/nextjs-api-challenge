import { MongoClient } from 'mongodb';

export const connectDatabase = async (database) => {
  //setup connection
  const client = await MongoClient.connect(
    `mongodb+srv://Tirelo:Unw2eWUWmhBv0A7J@cluster0.7dgearf.mongodb.net/${database}?retryWrites=true&w=majority&appName=AtlasApp`
  );
  return client;
};

export const insertDocument = async (client, collection, document) => {
  //get database
  const db = client.db();
  //insert email into emails collection
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, sort) => {
  //get database
  const db = client.db();
  //get documents from collection
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
};
