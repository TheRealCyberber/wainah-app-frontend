import React from 'react'

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Wainah is a digital social platform for lost & found items. We created Wainah because we saw a real need in our community for a reliable platform where lost and found items can be shared and reunited with their owners
      </p>
      <p style={styles.paragraph}>
        This is a social community initiative — a place where neighbors, friends, and strangers can come together to help each other out. 
        Too often, people lose important stuff and have nowhere to turn. Wainah is here to fix that.
      </p>
      <p style={styles.paragraph}>
        Our mission is to build trust and connection through something as simple as finding lost belongings. Because sometimes, it's the little things that matter the most.
      </p>
    </div>
  )
}

const styles = {
    container: {
      maxWidth: 700,
      margin: '60px auto',
      padding: 40,
      fontFamily: "'Poppins', sans-serif",
      color: '#fff',                      
      textAlign: 'center',
      background: 'rgba(0, 0, 0, 0.75)',   
      borderRadius: 16,
      boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
      backdropFilter: 'saturate(180%) blur(10px)',
      WebkitBackdropFilter: 'saturate(180%) blur(10px)',
    },
    heading: {
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: 20,
    },
    paragraph: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
      marginBottom: 20,
    },
  }

export default AboutUs
