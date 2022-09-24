const app = document.querySelector('.page')

// Obtención de datos principales mediante la API de Github
// usando el usuario personal
fetch('https://api.github.com/users/Bezno')
    .then(res => res.json())
    .then(data => {
        console.log(data)

        document.getElementById('avatar').innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar" />
        `
        document.getElementById('name').innerHTML = `
        <h1>${data.name}</h1>
        `
        document.getElementById('bio').innerHTML = `
        <h5>${data.bio}</h5>
        `
        document.getElementById('info').innerHTML = `
        <h2>Username</h2>
        <h4>${data.login}</h4><br>
        <h2>Location</h2>
        <p>${data.location}</p><br>
        <h2>Github Link</h2>
        <p>${data.html_url}</p><br>
        <h2>Repos Link</h2>
        <p>${data.repos_url}</p>
        `
        // Obtención de los repositorios personales públicos
        fetch(data.repos_url)
            .then(resR => resR.json())
            .then(dataR => showRepos(dataR))
            .catch(err => console.log(err))

        // Se crea una tabla con los repositorios existentes hasta el momento
        const showRepos = (dataR) => {
            console.log(dataR)
            let table = ''
            for (let i = 0; i < dataR.length; i++) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataR[i].name}</td>
                    <td>${dataR[i].language}</td>
                </tr>
                `
            }
            document.getElementById('repos_table').innerHTML = table
        }
    })
    .catch(err => console.log(err))

// Permite mostrar o esconder la tabla con los repositorios
function show() {
    var status = document.getElementById("repos").style.display
    if (status === "none") {
        document.getElementById("repos").style.display = "block"
        document.getElementById("repos_btn").innerText = 'Hide Repositories'
    } else {
        document.getElementById("repos").style.display = "none"
        document.getElementById("repos_btn").innerText = 'Show Repositories'
    }
}