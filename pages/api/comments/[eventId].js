const handler = (req, res) => {
  const eventId = req.query.eventId;

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
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: 'Added comment', Comment: newComment });
  }
  if (req.method === 'GET') {
    console.log('getting');
    const dummyList = [
      { id: 'c1', name: 'Max', text: 'First comment' },
      { id: 'c1', name: 'Manu', text: 'Second comment' },
    ];
    res.status(200).json({ comments: dummyList });
  }
};

export default handler;
