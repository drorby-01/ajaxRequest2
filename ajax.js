
function getUsers (params) {
    const { url, method = "GET" } = params
    return $.ajax({
        url,
        method,
    })
}

async function getAPI (params) {
    const { url, method = "GET" } = params
    const res = await fetch(url)
    return res.json()
}


