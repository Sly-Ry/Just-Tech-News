async function editFormHandler(event) {
    event.preventDefault();
    
    // the value of the post-title form element. 
    const title = document.querySelector('input[name="post-title"]').value.trim();

    //  id of the post
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        // the body will need to be stringified.
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // A successful PUT request should also redirect the user back to the main dashboard view.
    if (response.ok) {
        document.location.replace('/dashboard/');
    }
    else {
        alert(response.statusText);
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);