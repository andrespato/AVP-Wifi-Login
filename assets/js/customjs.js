// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1868493876770798',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getInfo(2);


        } else if (response.status === 'not_authorized') {
            console.log('We are not logged in');

            document.getElementById('titulo-login').innerHTML = 'Grupo Bacalhôa Vinhos de Portugal';
        } else {
            console.log('You are not logged into Facebook.');

            document.getElementById('titulo-login').innerHTML = 'Grupo Bacalhôa Vinhos de Portugal';

        }
    });
};
    // load sdk asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/pt_PT/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // login with facebook with extra permissions
    function login() {
        FB.login(function(response) {
            if (response.status === 'connected') {
                //alert(JSON.stringify(response,null,4));
                getInfo(2);



             } else if (response.status === 'not_authorized') {
				 console.log('We are not logged in');

                document.getElementById('titulo-login').innerHTML = 'Grupo Bacalhôa Vinhos de Portugal';

        } else {
            console.log('You are not logged into Facebook.');

            document.getElementById('titulo-login').innerHTML = 'Grupo Bacalhôa Vinhos de Portugal';

		}
        }, {scope: 'public_profile,email'});//,user_hometown,user_birthday'});
    }

    // getting basic user info
    function getInfo(arg) {

            FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,email,locale,gender,hometown,birthday'}, function(response) {
                console.log(arg);
                console.log('Successful login for: ' + response.name);
                console.log(JSON.stringify(response,null,4));
                if(arg===1){
                    document.getElementById('status').innerHTML = JSON.stringify(response,null,4);
                } else if(arg === 2){
                    document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a <b>' + response.name + '</b> !<br/> Grupo Bacalhôa Vinhos de Portugal';
                    //document.getElementById('login-options').innerHTML = JSON.stringify(response,null,4);
                    info(response.id);

                }
            });
    }

    //logout
    function logout(){
            FB.logout(function(response) {
             // user is now logged out
                location.reload();
    });
    }

function checkLoginState() {
  FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getInfo(2);


        } else if (response.status === 'not_authorized') {
        console.log('We are not logged in');

            document.getElementById('titulo-login').innerHTML = 'Grupo Bacalhôa Vinhos de Portugal';

            document.getElementById("logout-btn").style.display = "none";

        } else {
            console.log('You are not logged into Facebook.');

            document.getElementById('titulo-login').innerHTML = 'Grupo Bacalhôa Vinhos de Portugal';
            document.getElementById("logout-btn").style.display = "none";

        }
    });
}


function emailConn(){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var email = document.getElementById("email-connect").value;


        if (reg.test(email) == false)
        {
            alert('Email inválido');
            return 0;
        }
        else {

            document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a !<br/> Grupo Bacalhôa Vinhos de Portugal';

            $.ajax({
                    type: 'POST',
                    data: { email : email},
                    url: 'dbWriter.php?type=email',
                    success: function(data) {
                        document.getElementById('login-options').innerHTML = '<b>Está a um passo de usar o Wifi grátis ! </b>Inserir número de telemóvel para receber o código de confirmação</b></br></br>Telemóvel <input type="tel" id="telemField" /></br><input type="button" value="Enviar Código" onclick="sendConfCode('+data+');"/>';

                        //alert("Sucesso: "+ data);
                    },
                    error: function(data){
                        alert('Falha ajax -> '+JSON.stringify(data));
                    }
                });
        }
}


function info(usr_id){
    var usr = "/"+usr_id;
    document.getElementById('login-options').innerHTML = "<img src='loading.gif' alt='loading' height='60' width='80'>";
    FB.api(
        usr,
        'GET',
        {fields: 'first_name,last_name,name,id,email,locale,gender,hometown,birthday'},
        function (response) {
            if (response && !response.error) {
            /* handle the result */
                //(JSON.stringify(response,null,4));
                $.ajax({
                type: 'POST',
                data: {response},
                url: 'dbWriter.php?type=fb',
                success: function(data) {
                    //alert("Sucesso: "+data);
                    setTimeout(function(){
                        document.getElementById('login-options').innerHTML = '<b>Bem vindo/a ao Grupo Bacalhôa Vinhos de Portugal ! Aproveite a visita !</b>';
                        document.getElementById("logout-btn").style.display = "inline";
                    }, 2000);

                },
                error: function (request, status, error) {
                    alert("Error: "+request.responseText);
                }
            });

            }
        }
    );
}


function sendConfCode(visitanteID){
    var numTelem = document.getElementById('telemField').value;
    var postData = visitanteID+"-"+numTelem;

    //alert(postData);

    if( !document.getElementById('telemField').value ) {
        $('#telemField').css('border', '2px solid red');
    }
    else{
        document.getElementById('login-options').innerHTML = "<img src='loading.gif' alt='loading' height='60' width='80'>";
        // GERAR CODIGO E ENVIAR AO UTILIZADOR
         $.ajax({
                type: 'POST',
                data: {postdata : postData},
                url: 'phone-conf.php',
                success: function(data) {
                    setTimeout(function(){
                        if(data != 'E-Mail foi enviado'){
                            document.getElementById('login-options').innerHTML = data;
                        }
                        else {
                            document.getElementById('login-options').innerHTML = '<b>Está a um passo de usar o Wifi grátis ! </b>Inserir código de confirmação enviado</b></br></br>Código <input type="text" id="confCode" /></br><input type="button" value="Entrar" onclick="checkConfCode('+visitanteID+');"/><div id="confStat"></div>';
                        }
                    }, 2000);
                },
                error: function(data){
                    alert('Falha ajax -> '+JSON.stringify(data));
                }
            });
    }

}

function checkConfCode(visitanteID){
    document.getElementById('confStat').innerHTML = "<img src='loading.gif' alt='loading' height='20' width='40'>";

    if( !document.getElementById('confCode').value ) {
        $('#confCode').css('border', '2px solid red');
        $('#confCode').css('color', 'red');
        document.getElementById('confStat').innerHTML = "Código Inválido";
    }
    else{
        var postData = visitanteID+"-"+document.getElementById('confCode').value;
        $.ajax({
                    type: 'POST',
                    data: {postdata : postData},
                    url: 'code-conf.php',
                    success: function(data) {
                        setTimeout(function(){
                            // TRY < 3 - PROXIMA TENTATIVA
                            if(data < 3){
                                $('#confCode').css('color', 'red');
                                document.getElementById('confStat').innerHTML = "Código Inválido - Tem mais "+(3-data)+" tentativa/s";
                            }
                            // 500 - SUCESSO
                            else if(data == 500){
                                 $('#login-options').css('color', 'green');
                                document.getElementById('login-options').innerHTML = "Código Validado - Vai ser redirecionado dentro de momentos";
                            }
                            // 400 - INATIVO
                            else{
                                $('#confCode').css('color', 'red');
                                document.getElementById('login-options').innerHTML = "Esgotou o número de tentativas ! Volte a aceder para tentar de novo";
                            }
                        }, 2000);
                    },
                    error: function(data){
                        alert('Falha ajax -> '+JSON.stringify(data));
                    }
                });
    }
}

function showReg(totalRegistos){
      document.getElementById('tableContents').innerHTML = "<img src='loading.gif' alt='loading' height='30' width='60'>";
      $.ajax({
              type: 'POST',
              data: {total : totalRegistos},
              url: 'acessos.php',
              success: function(data) {
                  document.getElementById('tableContents').innerHTML = data;
              },
              error: function(data){
                  alert('Falha ajax -> '+JSON.stringify(data));
              }
        });


}
