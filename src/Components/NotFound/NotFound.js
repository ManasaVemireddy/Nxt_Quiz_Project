import React from 'react';
import './NotFound.css';

const NotFound = () => (
    <div className="not-found-container">
        <img 
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?ga=GA1.1.1364406416.1727243430&semt=ais_hybrid" 
            alt="Not Found" 
            className="not-found-image" 
        />
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
    </div>
);

export default NotFound;
