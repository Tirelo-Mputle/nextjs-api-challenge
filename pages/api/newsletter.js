import { MongoClient } from 'mongodb';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    MongoClient.connect(
      'mongodb+srv://Tirelo:Unw2eWUWmhBv0A7J@cluster0.7dgearf.mongodb.net/newsletter?retryWrites=true&w=majority&appName=AtlasApp'
    );
    console.log('User email correct', userEmail);
    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
