/*load books from json file for first loading */

let bookContainer = document.getElementsByClassName("books")[0];
/* favouriteBook is array will have all books cst select to favourite and it will save in local storage */
let favouriteBook = [];
/* books is array will have all books it will save in local storage */
let books = [];
window.onload = () => {

/*  loadingbooks()  =>function get all books and write them in html after loangpage */;
    loadingbooks();
}
function loadingbooks() {
    /* check if local storage has booksfavourite if yes it will catsh this books*/
    if (localStorage.getItem("booksfav")) {
        if (JSON.parse(localStorage.getItem("booksfav")).length > 0) {
          
            favouriteBook = JSON.parse(localStorage.getItem("booksfav"));

        }

    }
    else {
        /*  if no i will assume favouritebook is array empty becouse cst didnt select any one yet*/
        favouriteBook = [];
    }
    /* check if localstorage has array of books and its length >0 */
    if (localStorage.getItem("books")) {
        if (JSON.parse(localStorage.getItem("books")).length > 0) {

            books = JSON.parse(localStorage.getItem("books"));
          
            getbooks(books);
            getfavicons();
        } else {
            /* if cst click in button books and no books on localstorage ,"no books found" is will appear to cst in section books*/
            bookContainer.innerHTML = `<div class="nofav"><h3>no books found</h3><i class="fa-solid fa-heart-crack"></i></div>`;
        }

    }
    else {
        /* fetch fake data from json file   */
        async function lod() {
            console.log("pp");
            fetch('./api.json', {
             mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json()).then((data) => {
                    books = data;
                    localStorage.setItem("books", JSON.stringify(books));

                    getbooks(data);
                    getfavicons();
                    
                });
          
        } 
        lod();

           
    }
}













/* the main function to draw books in html ,it will use after any crud operation , its effect will defferent  according to array will pass to it */
function getbooks(array) {

    if (books.length === 0) {

        bookContainer.innerHTML = `<div class="nofav"><h3>no books found</h3><i class="fa-solid fa-heart-crack"></i></div>`;
    }

    for (let i = 0; i < array.length; i++) {


        bookContainer.innerHTML += `
        <div class="book  col-12 col-md-4 col-lg-3">
        <i id=${i + 1} class="fa-solid fa-heart"></i>
        <div class="image">
         <img src=${array[i].url}>
        </div>
        <div class="namebook">${array[i].name}</div>
        <div class="crud">
        <button onclick="showdetails(${array[i].id})" id=${i + 1} type="button" class="btn btn-primary"> details</button>
        <button onclick="updatebook(${array[i].id})"id=${i + 1}) type="button" class="btn btn-primary">update</button>
        <button   onclick="deletebook(${array[i].id})" id=${i + 1} type="button" class="btn btn-primary">delete</button>
        </div>
          
        
        </div>
     
        `
    }

}
/*handle select favourite book */
document.addEventListener("click", (e) => {
    let bookloved = [];
    if (e.target.classList.contains("fa-heart")) {
        e.target.classList.toggle("bookfav");
        if (!e.target.classList.contains("bookfav")) {
            console.log("selectbefore");
            let idofbook = e.target.id;
            let booknoncfov = books.find((element) => {

                return +element.id !== +idofbook;
            });
            if (favouriteBook.length > 0) {
                bookloved = favouriteBook.filter((eles) => {
                    console.log(eles);
                    return +idofbook !== +eles.id;
                });
            }

            
            favouriteBook = bookloved;
            console.log(favouriteBook);
            localStorage.setItem("booksfav", JSON.stringify(favouriteBook));
           
            let b = books.map((ar,i) => {
                if (+ar.id === +idofbook) {
                    ar.fav = false;
                    return ar;
                }
                else {
                    return ar;
                }
               
            })
            books = b;
            localStorage.setItem("books", JSON.stringify(books));
                
        }
        else {
            
            let idofbook = e.target.id;
            let bookselect = books.find((element) => {

                return +element.id === +idofbook;
            });
            if (favouriteBook.length > 0) {
                bookloved = favouriteBook.filter((eles) => {
                    console.log(eles);
                    return +idofbook !== +eles.id;
                });
            }

            bookselect.fav = true;
            favouriteBook = bookloved;
            favouriteBook.push(bookselect);
            localStorage.setItem("booksfav", JSON.stringify(favouriteBook));


        }
        console.log(e.target.id);
       

    }
})
/*if cst select book fovourite it will save in localstorage,when load page again favourite icon will be in red color */
function getfavicons() {

    let icons = document.getElementsByClassName("fa-solid fa-heart");


    for (let j = 0; j < favouriteBook.length; j++) {

        if (favouriteBook[j].fav === true) {
            icons[j].classList.add("bookfav")

        }
    }

}
/*when cst click in favourite button in menu ,all favourite book will appear in html page / */
document.querySelector(".showfav").addEventListener("click", () => {
    bookContainer.innerHTML = "";
    getbooks(favouriteBook);
    getfavicons();
    if (favouriteBook.length == 0) {
        bookContainer.innerHTML = `<div class="nofav"><h3>no favourite book </h3><i class="fa-solid fa-heart-crack"></i></div>`
    }
});
/*when cst click in books button in menu ,all book will appear in html page / */

document.querySelector(".showall").addEventListener("click", () => {
    bookContainer.innerHTML = "";

    getbooks(books);
    getfavicons();
})
/*when cst click in  delete button in menu ,this book will delete from html page and local storage */

function deletebook(i) {
    let newbooks = books.filter((ele) => {
   
        return +ele.id !== +i;
    });
    books = newbooks;
    localStorage.setItem("books", JSON.stringify(books));
    if (localStorage.getItem("booksfav")) {
        if (JSON.parse(localStorage.getItem("booksfav")).length > 0) {

            favouriteBook = JSON.parse(localStorage.getItem("booksfav"));
            let x = favouriteBook.filter((element) => {
                return +i !== +element.id
            })
            favouriteBook = x;
            localStorage.setItem("booksfav", JSON.stringify(favouriteBook));

        }

    }
    bookContainer.innerHTML = "";

    getbooks(books);
    getfavicons();


}
/*when cst click in  details button  ,details of book  will appear in html page / */

function showdetails(d) {
    let details = books.find((ele) => {
        return +ele.id === +d;
    })

    bookContainer.innerHTML = `
    
    <div class="details">
    <h3>details</h3>
    <div class="det">${details.details}</div>
    <button onclick="backs()">back</button>
    </div>
    `;



}
/*when cst click in back button  ,it will return to home page / */

function backs() {
    bookContainer.innerHTML = "";

    getbooks(books);
    getfavicons();
}
/*when cst click in update button ,update form will appear to cst , all input have initiall value of this book */

function updatebook(id) {
    let updbook = books.find((ele) => {
        return +ele.id === +id;
    });

    bookContainer.innerHTML = `
        
    <div class="updatebook">
      <h3 style="margin:"auto">update book</h3>
    <div><label>id</label><input type="text"  value=${updbook.id}  class="bookIdupd"></div>
    <div><label>nome of book</label><input type="text"   class="booknNameupd"value=${updbook.name}></div>
    <div><label>image of book</label><input type="text" class="bookImgupd" value=${updbook.url}></div>
   
<div><label>details

</label>
<textarea name="bookDetailsupd"  rows="4" cols="30">
${updbook.details}
</textarea>

</div>

    <button onclick="showupdate(${updbook.id})">update</button>
    </div>
    `;
}
/*when cst click in submit update button  ,book will update in html file and local storage/ */

function showupdate(id) {
    let idupd = document.getElementsByClassName("bookIdupd")[0].value;
    let booknNameupd = document.getElementsByClassName("booknNameupd")[0].value;
    let bookImgupd = document.getElementsByClassName("bookImgupd")[0].value;
    let bookDetailsupd = document.getElementsByName("bookDetailsupd")[0].value;
    let updbook = books.find((ele) => {
        return +ele.id === +id;
    });
    console.log(bookDetailsupd, idupd, booknNameupd, bookImgupd);
    updbook.id = +idupd;
    updbook.name = booknNameupd;
    updbook.url = bookImgupd;

    updbook.details = bookDetailsupd.replace(/\n/g, " ");

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === +updbook.id) {
            books[i] = updbook;
        }
    }
  
    localStorage.setItem("books", JSON.stringify(books));


    bookContainer.innerHTML = "";

    getbooks(books);
    getfavicons();



}
/*when cst click in add button ,add form will appear to cst , this form has validation if any invalid date ,placeholder will has wrong meassge */
/*then this book will add in html file and in local storage */

function addbook() {
    bookContainer.innerHTML = `
        
    <div class="updatebook">
      <h3 style="margin:"auto">add book</h3>
    <div><label>id</label><input type="text"  class="idAddbook" placeholder=""></div><div class="wrong" ></div>
    <div><label>nome of book</label><input type="text" class="nameofddbook" placeholder=""></div>
    <div class="wrong"></div>
    <div><label>image of book</label><input type="text" class="imageAddbook" placeholder=""></div>
    <div class="wrong"></div>
    <div>
    
    
<label for="myCheck">favourite</label> 
<input type="checkbox" id="myCheck" onclick="mycheckfav()">
    </div>
   
<div><label>details

</label>
<textarea name="bookDetailsadd"  rows="4" cols="30" required>

</textarea>

</div>
<div class="wrong"></div>

    <button onclick="checkvalidation()" >add book</button>
    </div>`
}
function addbooks(info) {

    let addbook = {};
  


    addbook.id = +info[0];
    addbook.name = + info[1];
    addbook.url = "./images/book-1.png";
    addbook.fav = info[4] === "true" ? true : false;



    addbook.details = info[3].replace(/\n/g, " ");
    books.push(addbook);
    console.log(addbook);
    localStorage.setItem("books", JSON.stringify(books));
    console.log(addbook.fav);
    if (addbook.fav === true) {
        favouriteBook.push(addbook);
        
        localStorage.setItem("booksfav", JSON.stringify(favouriteBook));
    }

    bookContainer.innerHTML = "";

    getbooks(books);
    getfavicons();





}
/*when cst add book ,he can add its book is favourite or not  */
function mycheckfav() {
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true) {


        return "true"
    } else {
        return "false";
    }
}
/* function to check validation for form of add book */
function checkvalidation() {
    let wrongdiv = document.querySelectorAll(".wrong");
    let idadd = document.getElementsByClassName("idAddbook")[0].value;
    let booknNameadd = document.getElementsByClassName("nameofddbook")[0].value;
    let bookImgadd = document.getElementsByClassName("imageAddbook")[0].value;
    let bookDetailsadd = Array.from(document.getElementsByName("bookDetailsadd"))[0];

    addbook.fav = mycheckfav();
    if (typeof idadd === "string" || idadd <= 0) {
       wrongdiv[0].innerHTML = "Not valid ID";





    }
    if (booknNameadd.length <= 0) {
     
      wrongdiv[1].innerHTML = "Not valid Name";
    }
    if (bookImgadd.length <= 0) {
        wrongdiv[2].innerHTML = "Not valid url";
    }
    

    if (bookDetailsadd.innerHTML== '') {
     
        bookDetailsadd.style.color = "#777";
       wrongdiv[3].innerHTML="please enter details"
    }
    if (idadd.length > 0 && booknNameadd.length > 0 && bookImgadd.length > 0 && bookDetailsadd.value !== "") {

        let checkidentered = books.some((ele) => {
            console.log(idadd, ele.id);
            console.log(ele);
            return ele.id === +idadd;
        });
        console.log(checkidentered);
        if (checkidentered === true) {
            console.log("==");
            
            let placing = document.getElementsByClassName("idAddbook")[0];
            placing.placeholder = "no";
        }
        else {
            addbooks([idadd, booknNameadd, bookImgadd, bookDetailsadd.value, addbook.fav]);

        }
    }

}
