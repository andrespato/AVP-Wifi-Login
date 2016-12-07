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
            
            document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a </br> Aliança Vinhos de Portugal';
        } else {
            console.log('You are not logged into Facebook.');
          
            document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a </br> Aliança Vinhos de Portugal';
			 
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
                getInfo(2);
				


             } else if (response.status === 'not_authorized') {
				 console.log('We are not logged in');
            
                document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a </br> Aliança Vinhos de Portugal';
				
        } else {
            console.log('You are not logged into Facebook.');
          
            document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a </br> Aliança Vinhos de Portugal';
			 
		}
        }, {scope: 'public_profile,user_hometown,user_birthday'});
    }
    
    function fb_info(usr_id){
        var usr = "/"+usr_id;
        FB.api(
            usr,
            'GET',
            {fields: 'first_name,last_name,name,id,email,locale,gender,hometown,birthday'},
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                  alert(JSON.stringify(response,null,4));
              }
            }
        );
    
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
                    document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a <b>' + response.name + '</b> !<br/> Aliança Vinhos de Portugal';
                    document.getElementById('login-options').innerHTML = JSON.stringify(response,null,4);
                    fb_info(response.id);
                    document.getElementById("logout-btn").disabled = false;
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
            
            document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a </br> Aliança Vinhos de Portugal';
            
            document.getElementById("logout-btn").disabled = true;
            
        } else {
            console.log('You are not logged into Facebook.');
          
            document.getElementById('titulo-login').innerHTML = 'Bem Vindo/a </br> Aliança Vinhos de Portugal';
            document.getElementById("logout-btn").disabled = true;
			
        }
    });
}


function emailConn(){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var state = 0;
    

        if (reg.test(document.getElementById("email-connect").value) == false) 
        {
            alert('Email inválido');
            return 0;
        }
        else alert("-> Sequencia login com email");
        
        
        
}