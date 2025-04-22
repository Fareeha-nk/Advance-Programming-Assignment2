import { useRouter } from 'next/router';
import React from 'react';

export default function index() {
  const r = useRouter();
  const { slug } = r.query;
  const last = slug?.[slug.length - 1] || "loading...";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎥 Help Topic</h1>
      <p style={styles.message}>This is the <strong>{last}</strong> page</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px 30px',
    backgroundColor: '#111',
    color: '#f0f0f0',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#e50914',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.3rem',
    color: '#ccc',
  },
};
