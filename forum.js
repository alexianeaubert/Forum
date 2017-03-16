$(document).ready(function(){
    $("#formulaire").hide();
    $("#nouvelle").click(function(){
        $("#formulaire").slideToggle();
    });

    $("#envoyer").click(function(){

        var content = $("#entries").html();
        posts = localStorage.getItem("posts");
        pseudos = localStorage.getItem("pseudos");
        objets = localStorage.getItem("objets");
        // emails = localStorage.getItem("emails");
        reponses = localStorage.getItem("reponses");

        if (posts == null) {
            var posts = [];
            var pseudos = [];
            var objets = [];
            // var emails = [];
            var reponses = [];
            posts.push($("#post").val());
            pseudos.push($("#pseudo").val());
            objets.push($("#objet").val());
            // emails.push($("#email").val());
            reponses.push(null);
        }
        else {
            posts = JSON.parse(posts);
            pseudos = JSON.parse(pseudos);
            objets = JSON.parse(objets);
            // emails = JSON.parse(emails);
            reponses = JSON.parse(reponses);
            posts.push($("#post").val());
            pseudos.push($("#pseudo").val());
            objets.push($("#objet").val());
            // emails.push($("#email").val());
            reponses.push(null);
        }

        localStorage.setItem("posts", JSON.stringify(posts));
        localStorage.setItem("pseudos", JSON.stringify(pseudos));
        localStorage.setItem("objets", JSON.stringify(objets));
        // localStorage.setItem("emails", JSON.stringify(emails));
        localStorage.setItem("reponses", JSON.stringify(reponses));
        console.log(localStorage);
        afficher();
        location.reload();
    });

    $('.scroll').on('click', function() {
       var page = $(this).attr('href');
       var speed = 750;
       $('html, body').animate( { scrollTop: $(page).offset().top }, speed );
       return false;
   });
});

function afficher(){

    // On récupère le contenu du local Storage
   var localStorage_objet= localStorage.getItem("objets");
   var localStorage_pseudo= localStorage.getItem("pseudos");
   var localStorage_post= localStorage.getItem("posts");
   var localStorage_reponse = localStorage.getItem("reponses");

    // On transforme le contenu sous forme de tableau grâce à JSON.parse
   var objets_json = JSON.parse(localStorage_objet);
   var pseudos_json = JSON.parse(localStorage_pseudo);
   var posts_json = JSON.parse(localStorage_post);
   var reponses_json = JSON.parse(localStorage_reponse);

    // On parcours les tableaux pour générer l'affichage
   for (var a in objets_json){
       var id = a;
       var objet = objets_json [a];
       var pseudo = pseudos_json [a];
       var post = posts_json [a];
       var reponse = reponses_json[a];

       if (reponse == null) {
            var ensemble = "<li>" + "De <B>" + pseudo + "</B> - Objet de la conversation :<B> " + objet + "</B><br/><U>Demande :</U></br><B>" + post +"</B> <br/> <textarea id='reponse" + id + "'> </textarea> <button onclick='reponse("+id+")'> Répondre </button></li><br>";
       } else {
            var ensemble = "<li>" + "De <B>" + pseudo + "</B> - Objet de la conversation :<B> " + objet + "</B><br/><U>Demande :</U></br><B>" + post +"</B> <br/> " + reponse + "</li><br/>" ;
       } 
       document.getElementById("entries").innerHTML += ensemble;
    }
}

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(45.918854, 6.157979),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var myCenter = new google.maps.LatLng(45.918854, 6.157979);
    var map = new google.maps.Map (document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);
}

function weather() {
    $.get("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data,status){
    alert(data.query.resuts.item.title);
    alert(data.query.results.item.conditions.temp);
    })
 }

 function reponse(id) {
    var valeur = document.getElementById("reponse"+id).value;
    var localStorage_reponse= localStorage.getItem("reponses");
    var reponses_json = JSON.parse(localStorage_reponse);
    reponses_json[id] = valeur;
    localStorage.setItem("reponses", JSON.stringify(reponses_json));
    location.reload();
}
