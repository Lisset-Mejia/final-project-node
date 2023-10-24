/* window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployee();
    }
    else {
        window.location.href = "index.html";
    }
}

function loadEmployee() {
    axios.get(url + "/employees", headers)
    .then(function(res) {
        console.log(res);
        displayEmployee(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}

function displayEmployee(employees) {
    var body = document.querySelector("body");
    for(var i = 0; i < employees.length; i++) {
        body.innerHTML += <h3>${employees[i].name}</h3>;
    }
} */





window.onload = init;

var token = localStorage.getItem("token");
var url = "http://localhost:3000";
var headers = {
    headers: {
        "Authorization" : "bearer " + token
    }
}

function init(){
    if(!token) window.location = "login.html";    

    document.querySelector("#btn-primary").addEventListener("click", () => {
        var name = document.querySelector("#name").value;
        var last_name = document.querySelector("#last_name").value;
        var phone = document.querySelector("#phone").value;
        var email = document.querySelector("#email").value;
        var address = document.querySelector("#address").value;
        console.log({name, last_name, phone, email, address});
        var data = {
                name,
                last_name,
                phone,
                email,
                address
        }

        axios.post(url, data, headers).then((res) => {
            alert(res.data.message);
            document.querySelector("#name").value = "";
            document.querySelector("#last_name").value = "";
            document.querySelector("#phone").value = "";
            document.querySelector("#email").value = "";
            document.querySelector("#address").value = "";
        }).catch((err) => {
            alert("Todos los datos deben estar completos");
        })
    })
}