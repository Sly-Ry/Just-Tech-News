async function deleteFormHandler(event) {
    event.preventDefault();

    // capture the id of the post 
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // use fetch() to make a DELETE request to /api/posts/:id. 
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    
    // If the request is successful, redirect the user using document.location.replace('/dashboard/')
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
}

// connect to button
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);