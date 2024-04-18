let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = "creat"
let temp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)
// let mood = "creat"
// let tmp;


// get total


function gettotal() {
    if (price.value != "") {
        total.style.backgroundColor = "#040"
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
    }
    else {
        total.innerHTML = "";


        total.style.backgroundColor = "red"

    }

}

// creat prodact
let dataproduct;
if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.getItem("product"))
}
else if (localStorage.product == null) {
    dataproduct = []
}



submit.onclick = function () {
    let newobject = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != "" && price.value != "" && category.value != "" && count.value < 100) {
        if (mood == "creat") {
            if (newobject.count > 1) {
                for (let i = 0; i < newobject.count; i++) {
                    dataproduct.push(newobject)

                }
            }

        }
        else if (mood = 'update') {
            dataproduct[temp] = newobject
            mood = "creat"
            submit.innerHTML = "create"
            count.style.display = "block"

        }
    cleardata();

    }




    localStorage.setItem("product", JSON.stringify(dataproduct))
    readproduct()
}

// cleardata
function cleardata() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""
}


// read product


function readproduct() {
    gettotal()

    let table = ``;
    for (let i = 0; i < dataproduct.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxes}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discount}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td><button  onclick = "updataproduct(${i})" id="updata">update</button></td>
        <td><button onclick = "deleteproduct(${i})" id="delete">delete</button></td>
    </tr>
        `
        let btndeletall = document.getElementById("deletall")
        if (dataproduct.length > 0) {
            btndeletall.innerHTML = `<button onclick = "deletAll()">delete all (${dataproduct.length})</button>`
        }
        else {
            btndeletall.innerHTML = ""
        }

    }

    document.getElementById("tbody").innerHTML = table

}
readproduct()

// deletejustone
function deleteproduct(i) {
    dataproduct.splice(i, 1)
    localStorage.setItem("product", JSON.stringify(dataproduct))
    readproduct()

}

// delet all
function deletAll() {
    dataproduct.splice(0);
    localStorage.clear();
    readproduct();
}

// updataproduct


function updataproduct(i) {
    title.value = dataproduct[i].title
    price.value = dataproduct[i].price
    taxes.value = dataproduct[i].taxes
    ads.value = dataproduct[i].ads
    discount.value = dataproduct[i].discount
    category.value = dataproduct[i].category
    gettotal()
    count.style.display = "none"
    submit.innerHTML = "update"
    mood = "update"
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}



// search
let searchmood = "title"
function getsearchmood(id) {
    let inputsearch = document.getElementById("search")
    if (id == "searchintitle") {
        searchmood = "title"
        inputsearch.placeholder = "search by title"

    }
    else {
        searchmood = "catigory"
        inputsearch.placeholder = "search by category"


    }
    inputsearch.focus();
    inputsearch.value = ""
    readproduct()


}
function search(value) {
    let table = ""
    if (searchmood == "title") {
        for (let i = 0; i < dataproduct.length; i++) {
            if (dataproduct[i].title.includes(value.toLowerCase())) {
                table += `
              <tr>
             <td>${i}</td>
             <td>${dataproduct[i].title}</td>
             <td>${dataproduct[i].price}</td>
             <td>${dataproduct[i].taxes}</td>
             <td>${dataproduct[i].ads}</td>
             <td>${dataproduct[i].discount}</td>
             <td>${dataproduct[i].total}</td>
             <td>${dataproduct[i].category}</td>
             <td><button  onclick = "updataproduct(${i})" id="updata">update</button></td>
             <td><button onclick = "deleteproduct(${i})" id="delete">delete</button></td>
              </tr>
               `
            }



        }

    }
    else {
        for (let i = 0; i < dataproduct.length; i++) {
            if (dataproduct[i].category.includes(value.toLowerCase())) {
                table += `
              <tr>
             <td>${i}</td>
             <td>${dataproduct[i].title}</td>
             <td>${dataproduct[i].price}</td>
             <td>${dataproduct[i].taxes}</td>
             <td>${dataproduct[i].ads}</td>
             <td>${dataproduct[i].discount}</td>
             <td>${dataproduct[i].total}</td>
             <td>${dataproduct[i].category}</td>
             <td><button  onclick = "updataproduct(${i})" id="updata">update</button></td>
             <td><button onclick = "deleteproduct(${i})" id="delete">delete</button></td>
              </tr>
               `
            }



        }
    }
    document.getElementById("tbody").innerHTML = table




}
// تمت بحمد الله وفضله______________________
