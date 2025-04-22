import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 404 - Page Not Found</h1>
      <p style={styles.message}>Oops! We couldn't find what you were looking for.</p>
      <Link href="/">
        <button style={styles.button}>🎥 Back to Home</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px',
    backgroundColor: '#0d0d0d',
    color: '#fff',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#ff4c4c',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#ccc',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#ff4c4c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};
