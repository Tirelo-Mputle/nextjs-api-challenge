import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  //setup connection
  let client;
  try {
    client = await connectDatabase('events');
  } catch (error) {
    res.status(500).json({ message: 'Connecting to database failed.' });
    return;
  }
  if (req.method === 'POST') {
    //server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      //disconnect from client
      client.close();
      return;
    }
    const newComment = {
      comment: {
        eventId,
        email,
        name,
        text,
      },
    };
    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment', Comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed.' });
    }
  }
  if (req.method === 'GET') {
    //get documents from database
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      console.log('document', documents);
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Fetching comments failed' });
    }
  }
  //disconnect from client
  client.close();
};

export default handler;
