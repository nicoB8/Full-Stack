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

    const deleteIssue = (issueId) => {
        axios.delete("http://127.0.0.1:5000/deleteIssue")
            .then((response) => {
                setIssues(issues.filter((issue) => issue.id !== issueId));
            })
    }

    return (
        <div>
            <h1>Issues</h1>
            {issues && (
                <ul>
                    {issues.map((issue) => (
                        <li key={issue.id}>
                            <h3>{issue.title}</h3>
                            <p>{issue.description}</p>
                            <button onClick={() => deleteIssue(issue.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Issues;