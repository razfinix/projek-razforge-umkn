function loginAdmin(){

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    if(username==="admin" &&
       password==="admin123"){

        alert("Login Berhasil");

    }else{

        alert("Username atau Password Salah");

    }
}

function kirimPesan(){

    alert("Pesan berhasil dikirim");

}