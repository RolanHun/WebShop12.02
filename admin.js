$(function() {
    
    const myAjax = new MyAjax();
    const termekek = [];
    let apiVegPont = "http://localhost:3000/termekek";
    myAjax.getAdat(apiVegPont, termekek, termekLista);

    function termekLista(termekek) {
        const szuloElem = $("table");
        const sablonElem = $(".termek");

        termekek.forEach(function(elem) {
            let node = sablonElem.clone().appendTo(szuloElem);
            const obj = new TermekAdmin(node, elem);

        });
        sablonElem.remove(); //sablonelem eltávolítása
    }

    $("#modositMod").hide();
    $("#micsiTess").html("Új elem hozzá adása:");
    

    $(window).on("torles", (event) => {
        let torolendoID = event.detail.id;
        myAjax.deleteAdat(apiVegPont, torolendoID);
    });
    $(window).on("modositas", (event) => {
        let valasztottid = event.detail.id;
        $("#idMod").val(valasztottid);
        $("#nevMod").val(event.detail.nev);
        $("#kepMod").val(event.detail.kep);
        $("#leirasMod").val(event.detail.leiras);
        $("#arMod").val(event.detail.ar);
        $("#modositMod").show();
        $("#ujAdatMod").hide();
        $("#micsiTess").html("Meglévő elem módosítása:");
    });
    $("#modositMod").on("click", () => {
        let valasztottid = $("#idMod").val();
        let kepNeve;
        if ($("#kepMod").val()=="") {
            kepNeve = "kepek/changeme.jpeg";
        }
        else {
            kepNeve = $("#kepMod").val();
        }
        let ujAdat = {
            id: $("#idMod").val(),
            nev: $("#nevMod").val(),
            kep: kepNeve,
            leiras: $("#leirasMod").val(),
            ar: $("#arMod").val(),
        };
        myAjax.putAdat(apiVegPont, ujAdat, valasztottid);
        }
    );
    $("#ujAdatMod").on("click", () => {
        let hossz = termekek.length;
        let kepNeve;
        if ($("#kepMod").val()=="") {
            kepNeve = "changeme";
        }
        else {
            kepNeve = $("#kepMod").val();
        }
        let ujAdat = {
            id: hossz + 1,
            nev: $("#nevMod").val(),
            kep: "kepek/"+kepNeve+".jpeg",
            leiras: $("#leirasMod").val(),
            ar: $("#arMod").val(),
        };
        myAjax.postAdat(apiVegPont, ujAdat);
        }
    );
});