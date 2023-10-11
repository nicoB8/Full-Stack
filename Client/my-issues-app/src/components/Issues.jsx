import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Issues() {
    const [issues, setIssues] = useState([]);
    const [isAddingIssue, setIsAddingIssue] = useState(false);
    const [issueToAdd, setIssueToAdd] = useState({
        id: '',
        title: '',
        description: ''
    });

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/readIssues")
            .then((response) => {
                setIssues(response.data)
            })
    }, []);

    const deleteIssue = (issueId) => {
        axios.delete("http://127.0.0.1:5000/deleteIssue", {
            data: {id: issueId}
        })
            .then((response) => {
                setIssues(issues.filter((issue) => issue.id !== issueId));
            })
    };

    const addNewIssue = (e) => {
        e.preventDefault()

        axios.post("http://127.0.0.1:5000/createIssue", issueToAdd)
            .then((response) => {
                setIssues([...issues, issueToAdd]);

                setIssueToAdd({
                    id: '',
                    title: '',
                    description: ''
                });

                setIsAddingIssue(false)
            })
    };

    return (
        <div>
            <h1>Issues</h1>
            <button onClick={() => setIsAddingIssue(true)}>Add Issue</button>

            {isAddingIssue && (
                <>
                    <h2>Add New Issue</h2>
                    <form onSubmit={addNewIssue}>
                        <label>Id: </label>
                        <input 
                            type='text'
                            name='id'
                            value={issueToAdd.id}
                            onChange={(e) => setIssueToAdd({...issueToAdd, id: e.target.value})}
                        />
                        <br />
                        <label>Title: </label>
                        <input 
                            type='text'
                            name='title'
                            value={issueToAdd.title}
                            onChange={(e) => setIssueToAdd({...issueToAdd, title: e.target.value})}
                        />
                        <br />
                        <label>Description: </label>
                        <input 
                            type='text'
                            name='description'
                            value={issueToAdd.description}
                            onChange={(e) => setIssueToAdd({...issueToAdd, description: e.target.value})}
                        />
                        <br />
                        <button type='submit'>Add Issue</button>
                    </form>
                </>
            )}

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