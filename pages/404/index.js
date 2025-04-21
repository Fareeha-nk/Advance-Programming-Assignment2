// pages/404.js
import Link from 'next/link';

export default function Custom404() {
return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
    <h1>Oops! Page Not Found.</h1>
    <p>We couldn't find what you were looking for.</p>
    <Link href="/">
        <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Go Home
        </button>
    </Link>
    </div>
);
}
