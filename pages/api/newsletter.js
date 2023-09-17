import { connectDatabase, insertDocument } from '../../helpers/db-util';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    //setup connection
    let client;
    try {
      client = await connectDatabase('emails');
    } catch (error) {
      // 500 = Internal Server Error
      res.status(500).json({ message: 'Connecting to database failed' });
    }

    //get database and insert email into emails collection
    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      //disconnect from client
      client.close();
    } catch (error) {
      // 500 = Internal Server Error
      res.status(500).json({ message: 'Inserting data failed' });
    }
    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
