import React, { useState } from 'react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>

      {submitted && (
        <p style={styles.successMessage}>Thanks for reaching out We’ll get back to you soon</p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Your full name"
          />
        </label>

        <label style={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="you@example.com"
          />
        </label>

        <label style={styles.label}>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={styles.textarea}
            placeholder="Write your message here"
          />
        </label>

        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '60px auto',
    padding: 30,
    fontFamily: "'Poppins', sans-serif",
    background: 'rgba(0, 0, 0, 0.75)',
    color: '#fff',
    borderRadius: 16,
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
    backdropFilter: 'saturate(180%) blur(10px)',
    WebkitBackdropFilter: 'saturate(180%) blur(10px)'
  },
  heading: {
    fontSize: '2.8rem',
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center'
  },
  successMessage: {
    backgroundColor: '#28a745',
    padding: '12px 20px',
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '1.1rem',
    marginBottom: 12,
    fontWeight: '600'
  },
  input: {
    marginTop: 6,
    padding: '10px 14px',
    borderRadius: 8,
    border: 'none',
    fontSize: '1rem',
    outline: 'none'
  },
  textarea: {
    marginTop: 6,
    padding: '10px 14px',
    borderRadius: 8,
    border: 'none',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical'
  },
  button: {
    marginTop: 20,
    padding: '14px 0',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(0,123,255,0.7)',
    transition: 'background-color 0.3s ease'
  }
}

export default ContactUs
