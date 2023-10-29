window.onload = init;
function init() {
  if (localStorage.getItem("token")) {
    document.querySelector(".actualizar").addEventListener("click", agregar);
  } else {
    window.location.href = "employees.html";
  }
}

function agregar() {
  var name = document.getElementById("name").value;
  var last_name = document.getElementById("last_name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;

  console.log(name, last_name, phone, email, address);

  axios.post(
      "http://localhost:3000/employee/agregar",
      {
        name: name,
        last_name: last_name,
        phone: phone,
        email: email,
        address: address,
      },
      {
        headers: {
          "Authorization": "bearer " + localStorage.getItem("token")
        }
      }
    )
    .then(function (res) {
      console.log(res);
      alert("Registro exitoso");
      window.location.href = "employees.html";
    })
    .catch(function (err) {
      console.log(err);
    });
}
