const COHORT_NAME = '2302-ACC-PT-WEB-PT-A'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

//register sign up to get Token
export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        });
        const result = await response.json();

        console.log(result)
        return result
    } catch (err) {
        console.error(err);
    }
}

//login
export const login = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password,
                }
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

//mydata
export const myData = async (token) => {

    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

//fetch post
export const fetchPosts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/posts`)

        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

// create posts

export const makePost = async (token, postData) => {

    const { title, description, price, location, willDeliver } = postData

    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
            // body: JSON.stringify(newPostData)
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

// update posts

export const updatePost = async (id, token, postData) => {

    const { title, description, price, location, willDeliver } = postData

    try {
        // You will need to insert a variable into the fetch template literal 
        // in order to make the POST_ID dynamic. 
        // 5e8d1bd48829fb0017d2233b is just for demonstration.
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

// delete msg

export const deletePost = async (id, token) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}


// posts msg
export const postMessage = async (id, token, message) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: message
                }
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

