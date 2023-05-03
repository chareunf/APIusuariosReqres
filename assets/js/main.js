const URL = "https://reqres.in/api/users"

const d = document
const $ulContent = d.querySelector(".ul-content")
const $templateLi = d.querySelector(".template").content

const fragment = d.createDocumentFragment()

const fetchApi = async function (url) {
    try {
        loaderFunction()
        const res = await fetch(url)
        const json = await res.json()
        const data = json.data
        //    console.log(res, json)

        if (!res.ok) throw { status: res.status, statusText: res.statusText }


        const showApi = (data) => {
            data.forEach(element => {
                // console.log(element)
                const clone = $templateLi.cloneNode(true)

                clone.querySelector("h5").textContent = element.id + "-" + element.first_name + " " + element.last_name
                clone.querySelector("p").textContent = element.email
                clone.querySelector("img").src = element.avatar
                clone.querySelector("img").setAttribute("alt", element.email)
                clone.querySelector("li").setAttribute("data-id", element.id)


                fragment.appendChild(clone)

            })

            $ulContent.appendChild(fragment)

        }
        $ulContent.textContent = ""
        showApi(data)


    } catch (err) {
        // console.log(err)

        const message = err.statusText || "Ocurrio un Error en la carga del Documento"

        $ulContent.insertAdjacentHTML("beforebegin", `<p class="alert alert-danger">Error ${err.status}: ${message}</p>`)

    }





}
d.addEventListener("DOMContentLoaded", fetchApi(URL))


function loaderFunction() {
    const loader = `<img class="loader" src="./loader/my-loader.svg" alt="Loader">`
    $ulContent.insertAdjacentHTML("afterbegin", loader)
}




d.addEventListener("click", (e) => {
    if (e.target.matches(".list-group-item")) {
        console.log("clek", e.target.dataset)
        let idData = e.target.dataset.id
        console.log(idData)
        showPersonalData(URL, idData)
    }
})

const showPersonalData = async function (url, id) {
    //console.log(`${url}/${id}`)

    try {
        loaderFunction()
        const res = await fetch(`${url}/${id}`)
        const json = await res.json()
        const data = json.data
        console.log(data)

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        $ulContent.textContent = ""
        $ulContent.insertAdjacentHTML("beforebegin", `
    <div class="card" style="width: 18rem;">
  <img src="${data.avatar}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Nombre: ${data.first_name} ${data.last_name}</p>
    <p class="card-text">Email: ${data.email}</p>
  </div>
  <p class="pDataPersonal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci asperiores ipsa esse quis corrupti earum possimus totam cupiditate. Porro quis ullam officiis ratione iusto quisquam soluta veritatis ea, ex repellat.</p>
</div>
    
    `)

    } catch (err) {
        console.log(err)
        const message = err.statusText || "Ocurrio un Error en la carga del Documento"

        $ulContent.insertAdjacentHTML("beforebegin", `<p class="alert alert-danger">Error ${err.status}: ${message}</p>`)


    }
}