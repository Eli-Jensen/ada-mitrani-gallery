'use client';

import { useState, useTransition } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { sendContactEmail } from '../actions/sendContactEmail';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    userEmail: '',
    message: '',
  });
  const [isPending, startTransition] = useTransition();
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await sendContactEmail(formData);
        setMessageSent(true);
        setFormData({ name: '', userEmail: '', message: '' });
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message.');
      }
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: { xs: '90vw', sm: '70vw', md: '60vw' }, // Responsive width based on screen size
        margin: '0 auto',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Contact
      </Typography>
      {messageSent && <Typography color="success.main">Message sent successfully!</Typography>}
      <TextField
        label="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Your Email"
        name="userEmail"
        type="email"
        value={formData.userEmail}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Your Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </Box>
  );
};

export default ContactForm;
