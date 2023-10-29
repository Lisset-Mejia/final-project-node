window.onload = init;
function init() {
  if (localStorage.getItem("token")) {
    document.querySelector(".modificar").addEventListener("click", modificar);
  } else {
    window.location.href = "employees.html";
  }
}

function modificar() {
  var employee_id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var last_name = document.getElementById("last_name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;

  console.log(employee_id, name, last_name, phone, email, address);

  axios
    .patch(
      "http://localhost:3000/employee/modificar",
      {
        employee_id: employee_id,
        name: name,
        last_name: last_name,
        phone: phone,
        email: email,
        address: address,
      },
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then(function (res) {
      console.log(res);
      alert("Actualizacion exitosa");
      window.location.href = "employees.html";
    })
    .catch(function (err) {
      console.log(err);
    });
}
