const url_link = "http://localhost:8080/api/user/";
//const url_link = "http://129.151.111.117:8080/api/user/";
var sesionInit=false;
window.onload = function() {
    sesionInit=false;
};
$("#login").click(function(){
    if($("#email").val() == "" || $.trim($("#contrasena").val()) == ""){
        alert("Por favor ingrese el correo y/o la contraseña");
    }else{
        let data = {
            email: $("#email").val(),
            password: $("#contrasena").val()
        };
        $.ajax({
            url:url_link+data.email+"/"+data.password,
            method: "GET",
            dataType: "json",
            success: function(response){
                console.log(response);
                console.log(response.id);
                console.log(response.email);
                if(response.id == null){
                    $("#modal_checkUser").show();
                    document.getElementById("txtCheckUsr").innerHTML= "Correo o contraseña erroneas";
                    console.log("Correo o contraseña erroneas");
                }else{
                    $("#modal_checkUser").show();
                    document.getElementById("txtCheckUsr").innerHTML ="Ha iniciado sesion";
                    console.log("Ha iniciado sesion");
                    localStorage.setItem("userEmail", response.email);
                    localStorage.setItem("userPass", response.password);
                    localStorage.setItem("sesionInit", sesionInit);
                    sesionInit=true;
                    
                }
            }
        });
    }
});

function redireccionar(){
    location.href="app.html";
    console.log("Redireccionando");
}

$("#okModelChechUSR").click(function(){
    if(sesionInit){
        $("#modal_checkUser").hide();
        setTimeout("redireccionar()",500);
    }
    $("#modal_checkUser").hide();
    //$("#exampleModal").hide();
    //$("#exampleModal").fadeOut();
});

$("#abrirRegistro").click(function(){
    console.log("modalopen")
    //$("#exampleModal").fadeOut();
    //$("#exampleModal").show();
    
});

// var myModal = new bootstrap.Modal(document.getElementById("exampleModal"),{});
// document.onreadystatechange = function(){
//     console.log("modalopen")
//     myModal.show();
// };

$("#registrar").click(async function(){
    //setTimeout("getMaxId()",0);
   
    let userType;
    if($("#txt_identification").val() == "" || $.trim($("#txt_userRegistro").val()) == "" ||
         $.trim($("#txt_address").val()) == "" || $.trim($("#txt_cellPhone").val()) == ""||
         $.trim($("#txt_emailRegistro").val()) == "" || $.trim($("#txt_contrasenaRegistro").val()) == ""||
         $.trim($("#txt_contrasenaRegistro2").val()) == "" || $.trim($("#txt_zona").val()) == ""){

        alert("Por favor complete todos los campos");
    }else if($("#checkCOORD").prop("checked") ==false && $("#checkASE").prop("checked") ==false && $("#checkADM").prop("checked")==false){
            alert("Seleccione el tipo de cuenta");
    }else{
        if($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()){
            alert("Las contraseñas no coinciden");
        }else{
            console.log("Coord "+$("#checkCOORD").val())
            console.log("Asesor com "+$("#checkASE").val())
            console.log("Adm "+$("#checkADM").val())
            if($("#checkCOORD").prop("checked")){ userType=$("#checkCOORD").val();}
            if($("#checkASE").prop("checked")){ userType=$("#checkASE").val();}
            if($("#checkADM").prop("checked")){ userType=$("#checkADM").val();}
            maxId=0;
            await getMaxId();

            setTimeout(function() {
                let datos = {
                    id: maxId+1,
                    identification: $("#txt_identification").val(),
                    name: $("#txt_userRegistro").val(),
                    address : $("#txt_address").val(),
                    cellPhone: $("#txt_cellPhone").val(),
                    email: $("#txt_emailRegistro").val(),
                    password: $("#txt_contrasenaRegistro").val(),
                    zone : $("#txt_zona").val(),
                    type : userType
                    
                };
                console.log(datos);
                $.ajax({
                    url:url_link+"new",
                    method: "POST",
                    dataType: "json",
                    data: JSON.stringify(datos),
                     contentType: "application/json",
                    Headers: {
                        "Content-Type": "application/json"
                    }, 
                    statusCode: {
                        201: function(response){
                            
                            console.log(response);
                            //$("#exampleModal").hide();
                           //if(response.id == null){
                           //     $("#modal_checkUser").show();
                           //     document.getElementById("txtCheckUsr").innerHTML= "El correo: "+$("#emailRegistro").val()+" o el nombre de usuario: "+$("#userRegistro").val()+ " ya existen";
                           //     console.log("El correo ya existe");
                          //  }else{
                                $("#modal_checkUser").show();
                                document.getElementById("txtCheckUsr").innerHTML ="Ha creado el usuario: "+$("#txt_userRegistro").val()+" con el correo: " + $("#txt_emailRegistro").val();
                                console.log("Ha creado un nuevo usuario con el correo: " + $("#txt_emailRegistro").val());
                                
                            //}
    
                        },
                        400: function(response){
                            console.log("Bad Request");
                        }
                    }
                });
            },100)
            
        }
    }
});

var maxId = 0;
 async function getMaxId() {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url_link+"all",
            method: "GET",
            dataType: "json",
            success: function(response){
                
                for(i=0;i<response.length;i++){
                    if(response[i].id>maxId)
                    {
                        maxId = response[i].id;
                    }
                }
                
                console.log("ID: "+maxId);
                return maxId;
            },error: function(response){
                console.log(response);
            }
    
        });
        setTimeout(()=>{
            console.log("Hello from inside the testAsync function");
            resolve();
        ;} , 0
        );
    });

    

    
}

$("#contrasenaRegistro2").change(function(){
    if($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()){
        $("#contrasenaRegistro2").css("border-color", "red");
        $("#contrasenaRegistro").css("border-color", "red");
    } else {
        $("#contrasenaRegistro2").css("border-color", "");
        $("#contrasenaRegistro").css("border-color", "");
    }
});