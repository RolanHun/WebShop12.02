$(function () {
  const kosar = new Kosar()
  const myAjax = new MyAjax();
  let kereso = $("#kereso");
  const termekek = [];
  let apiVegPont = "http://localhost:3000/termekek";
  const szuloElem = $('.termekek');
  const sablonElem = $('footer .termek');
  let rendezes;

  myAjax.getAdat(apiVegPont, termekek, termekLista);

  function termekLista(termekek) {
    szuloElem.empty()
    termekek.forEach(function (elem) {
      sablonElem.show()
      let node = sablonElem.clone().appendTo(szuloElem)
      const obj = new TermekAruhaz(node, elem)
    })
    sablonElem.hide()

    $(window).on('termekKosarba', (event) => {
      kosar.setKosar(event.detail)
    })
  }
  $("#kereso").on("keyup", () => {
    apiVegPont = "http://localhost:3000/termekek";
    apiVegPont += "?q=" + kereso.val();
    myAjax.getAdat(apiVegPont, termekek, termekLista);
  });
  $("#rendezes").on("change", () => {
    switch ($("#rendezes").val()) {
      case "NameListAsc":
          rendezes = "?_sort=nev&_order=asc";
          apiVegPont = "http://localhost:3000/termekek";
          apiVegPont += rendezes;
          myAjax.getAdat(apiVegPont, termekek, termekLista);
        break;
        case "CostListDesc":
          rendezes = "?_sort=ar&_order=desc";
          apiVegPont = "http://localhost:3000/termekek";
          apiVegPont += rendezes;
          myAjax.getAdat(apiVegPont, termekek, termekLista);
          break;
          case "NameListDesc":
            rendezes = "?_sort=nev&_order=desc";
            apiVegPont = "http://localhost:3000/termekek";
            apiVegPont += rendezes;
            myAjax.getAdat(apiVegPont, termekek, termekLista);
          break;
          case "CostListAsc":
            rendezes = "?_sort=ar&_order=asc";
            apiVegPont = "http://localhost:3000/termekek";
            apiVegPont += rendezes;
            myAjax.getAdat(apiVegPont, termekek, termekLista);
            break;
      default:
        break;
    }
  });
})
