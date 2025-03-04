const postData = async(url,formData) =>{
    const response = await fetch(url,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json', // Specify content type if sending JSON data
        },
        body:JSON.stringify(formData)
    })
    const data = await response.json()
    return data
}


export {postData}