export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Replace this with your actual logic to send the maintenance alert
      // You might use a third-party service, send an email, etc.
      // For simplicity, we're just logging a message here.
      console.log('Maintenance alert sent');
  
      res.status(200).json({ message: 'Maintenance alert sent successfully' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }