import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Issues() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/readIssues")
            .then((response) => {
                setIssues(response.data)
            })
    }, []);

    return (
        <div>
            <h1>Issues</h1>
            {issues && (
                <ul>
                    {issues.map((issue) => (
                        <li key={issue.id}>
                            <h3>{issue.title}</h3>
                            <p>{issue.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Issues;