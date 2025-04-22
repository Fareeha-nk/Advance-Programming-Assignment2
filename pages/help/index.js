import React from 'react';

export default function index() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Help & Support</h1>
      <p style={styles.text}>
        Welcome to <strong>Movie House</strong>! Need assistance navigating the app or finding your favorite movies?
      </p>
      <p style={styles.text}>
        • Browse genres to explore collections.<br />
        • Click on any movie for detailed info.<br />
        • Visit the director's page for their biography and filmography.<br />
        • Use the home page to check out trending top-rated titles.
      </p>
      <p style={styles.note}>For more info or bug reports, contact us at <em>support@moviehouse.com</em></p>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px 30px',
    backgroundColor: '#1c1c1c',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ff4c4c',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#ccc',
    marginBottom: '20px',
  },
  note: {
    fontSize: '0.95rem',
    fontStyle: 'italic',
    color: '#999',
  },
};
