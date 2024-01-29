
/// <reference types="../@types/jquery" /> 
"use strict";

let wholeData = document.getElementById('wholeData');
let inputGetSerch = document.getElementById('inputGetSerch');
/* =============================================================================================== */
/* startNavAction */
function openNav() {
    $(".nav-tab").animate({left: 0}, 400);
    $('#ulStyeld li').slideDown(500);
    document.querySelector('i.open-close-icon').classList.add('d-none');
    document.querySelector('i.fa-xmark').classList.remove('d-none');
    for (let i = 0; i < 5; i++) {
        $(".styl li").eq(i).animate({top: 0}, (i + 5) * 100)
        console.log($("ul li").eq(i).animate({top: 0}, (i + 5) * 100));
    }
}
function closeNav() {
    let outWidth = $(".nav-tab #additionalNav").outerWidth();
    $('#ulStyeld li').slideUp(100);
    console.log(outWidth);
    $(".nav-tab").animate({left: -outWidth}, 300);
    document.querySelector('i.open-close-icon').classList.remove('d-none')
    document.querySelector('i.fa-xmark').classList.add('d-none')
    $(".styl li").animate({top: 300}, 500);
}
closeNav();
/* endNavAction */
/* =============================================================================================== */
/* =============================================================================================== */
/* this about Home website details*/
async function getdetailsWebsite(){
    closeNav();
    document.getElementById('load').classList.remove('d-none');
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    respone = await respone.json();
    displayDetailsWebsite(respone.meals);
    console.log(respone.meals);
    document.getElementById('load').classList.add('d-none');
}
getdetailsWebsite();
function displayDetailsWebsite(meals) {
    let detailsMain = ` `
    for (let i = 0; i < meals.length; i++) {
        detailsMain +=`
        <div id="categoryList" onclick="getInfoRecipes('${meals[i].idMeal}')"  class="col-md-3">
        <section  class="position-relative overflow-hidden">
        <img src="${meals[i].strMealThumb}" class="w-100" alt="">
        <div class="position-absolute d-flex flex-column justify-content-center align-items-center categoryList px-2">
        <h3>${meals[i].strMeal}</h3>
        </div>
        </section>
        </div>
        
        `
        
    }
    wholeData.innerHTML = detailsMain;
}
/* =============================================================================================== */
/* =============================================================================================== */


/* categoryList */
function displayCategoryList(add) {
    let addMeal = ''
    for (let i = 0; i < add.length; i++) {
        addMeal += `
        <div id="categoryList"  class="col-md-3 corsr">
        <section  onclick="displayNamesofMeals('${add[i].strCategory}')" class="position-relative overflow-hidden ">
        <img src="${add[i].strCategoryThumb}" class="w-100" alt="">
        <div class="position-absolute d-flex flex-column justify-content-center align-items-center categoryList px-2">
        <h3>${add[i].strCategory}</h3>
        <p>${add[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
        </section>
        </div>
        `
    }
    wholeData.innerHTML = addMeal;
    console.log(addMeal);

}
async function getCategoryList() {
    closeNav();
    wholeData.innerHTML = ''
    document.getElementById('load').classList.remove('d-none');

    inputGetSerch.innerHTML = " ";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    // console.log(response.categories);
    displayCategoryList(response.categories);
    document.getElementById('load').classList.add('d-none');


}
/* =============================================================================================== */
/* ===============================getMeals==================================== */
function getNamesofMeals(id) {
    let addMeal = ''
    for (let i = 0; i < id.length; i++) {
        addMeal += `
        <div id="categoryList"  class="col-md-3 corsr">
        <section  onclick="getInfoRecipes('${id[i].idMeal}')" class="position-relative overflow-hidden ">
        <img src="${id[i].strMealThumb}" class="w-100" alt="">
        <div class="position-absolute categoryList px-2 d-flex justify-content-center align-items-center">
        <h3>${id[i].strMeal}</h3>
        </div>
        </section>
        </div>
        `
    }
    wholeData.innerHTML = addMeal;
    console.log('NameOfMeals', addMeal);
}
async function displayNamesofMeals(pullName) {
    closeNav();
    document.getElementById('load').classList.remove('d-none');

    wholeData.innerHTML = ''
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${pullName}`);
    response = await response.json();

    console.log(response);
    getNamesofMeals(response.meals.slice(0, 20))
    document.getElementById('load').classList.add('d-none');

    // console.log("NameOfMeals" ,response.meals);
}
/* =====================================getMeals============================== */
/* =============================================================================================== */
/* ======================================getinfoList========================================================= */
async function getInfoRecipes(idOfMeal) {
    closeNav();
    wholeData.innerHTML = ''
    document.getElementById('load').classList.remove('d-none');
    inputGetSerch.innerHTML = " ";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idOfMeal}`)
    response = await response.json();
    getinfoIdList(response.meals);
    console.log(response.meals);
    document.getElementById('load').classList.add('d-none');
}
async function getinfoIdList(info) {
    inputGetSerch.innerHTML = " ";
    let setIngred = ``
    for (let e = 1; e <= 20; e++) {
        if (info[0][`strIngredient${e}`]) {
            setIngred += `
            <li class="alert alert-info m-2 p-1">
            ${info[0][`strMeasure${e}`]} ${info[0][`strIngredient${e}`]}
            </li>`
        }
    }
    let getTags = info[0].strTags
        if (getTags) {
            getTags.split(",")
            console.log(getTags.split(","));
        }
    if (getTags == null){
        getTags = []
    } 

    let insertTags = ''
    for (let i = 0; i < getTags.split(",").length; i++) {
        insertTags += `
        <li class="alert alert-danger m-2 p-1">${getTags.split(",")[i]}</li>`
    }
    wholeData.innerHTML= `
    <div  class="d-flex justify-content-between text-white col-10 mx-auto mb-3">
          <h1>click to the Main Page</h1>
          <i id="closePage" onclick="getdetailsWebsite()" class="fa-solid fa-xmark fs-2 corsr"></i>
      </div>
    <div class="col-md-4 text-white">
    <img class="w-100 rounded-3" src="${info[0].strMealThumb}" alt="">
        <h2>${info[0].strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
    <h2>Instructions</h2>
                <p>${info[0].strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${info[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${info[0].strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${setIngred}
    </ul>

    <h3>Tags : </h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${insertTags}
    </ul>
    <a target="_blank" href="${info[0].strSource}" class="btn btn-success">Source</a>
    <a target="_blank" href="${info[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
        `
        document.getElementById('closePage').addEventListener('click' , function () {
            window.history.forward();
            console.log(window.history.forward());

        })
}
/* categoryList */
/* =============================================================================================== */
/* =============================================================================================== */
/* about search */
function SearchInputs() {
    inputGetSerch.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="byName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="byLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    wholeData.innerHTML = " "
}
async function byName(getFullName) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${getFullName}`);
    response = await response.json();
    getNamesofMeals(response.meals)
}
async function byLetter(getletter) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getletter}`);
    response = await response.json();
    getNamesofMeals(response.meals)
}
/* about search */
/* =============================================================================================== */
/* =============================================================================================== */
/* ============================category Area===================================================== */
async function getDataOfArea() {
    closeNav();
    wholeData.innerHTML = ""
    document.getElementById('load').classList.remove('d-none');
    inputGetSerch.innerHTML = " ";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayDataOfArea(respone.meals)
    document.getElementById('load').classList.add('d-none');
}
function displayDataOfArea(passArea) {
    let Area = ``
    for (let i = 0; i < passArea.length; i++) {
        Area +=`
        <div onclick="getCountriesMeal('${passArea[i].strArea}')"  class="col-md-3  corsr">
        <div  class="item text-white text-center p-3 my-3 border border-1 g-4">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <p>${passArea[i].strArea}</p>
        </div>
      </div>
        `
    }
    wholeData.innerHTML = Area;
}
/* ============================category Area===================================================== */
/* =============================================================================================== */
/* ============================category COUNTRIES===================================================== */
/* function displaycountriesMeal(countryMeals) {
    let setCountryMeals =` `
    for (let i = 0; i < countryMeals.length; i++) {
        setCountryMeals +=`
        <div onclick="getInfoRecipes('${countryMeals[i].idMeal}')" id="categoryList"  class="col-md-3">
        <section  class="position-relative overflow-hidden ">
        <img src="${countryMeals[i].strMealThumb}" class="w-100" alt="">
        <div class="position-absolute categoryList px-2 d-flex justify-content-center align-items-center">
        <h3>${countryMeals[i].strMeal}</h3>
        </div>
        </section>
        </div>
        `
    }
    wholeData.innerHTML = setCountryMeals ;
} */
async function getCountriesMeal(country) {
    closeNav();
    wholeData.innerHTML = " "
    document.getElementById('load').classList.remove('d-none');

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    response = await response.json();
    console.log(response.meals);
    getNamesofMeals(response.meals.slice(0, 20));
    document.getElementById('load').classList.add('d-none');

}
/* ============================category COUNTRIES===================================================== */
/* =============================================================================================== */
/* ============================About Ingredients===================================================== */
async function getIngredients() {
    closeNav();
    wholeData.innerHTML = ''
    document.getElementById('load').classList.remove('d-none');

    inputGetSerch.innerHTML = " ";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    desplayIngredients(response.meals.slice(0, 20));
    document.getElementById('load').classList.add('d-none');

}
function desplayIngredients(ingred) {
    let Ingredients = ``
    for (let i = 0; i < ingred.length; i++) {
            Ingredients +=`
        <div  class="col-md-3 text-white corsr">
        <div id="ingred" onclick="getIngredientsAddition('${ingred[i].strIngredient}')" class="text-center">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h2>${ingred[i].strIngredient}</h2>
          <p>${ingred[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
      </div>
            `
    }
    wholeData.innerHTML = Ingredients;
    console.log(Ingredients);
}
async function getIngredientsAddition(getList) {
    document.getElementById('load').classList.remove('d-none');

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getList}`);
    response = await response.json();
    getNamesofMeals(response.meals);
    document.getElementById('load').classList.add('d-none');

}
/* ============================About Ingredients===================================================== */
/* =============================================================================================== */
/* ============================GET CONTACT===================================================== */

function contactUs() {
    closeNav();
    inputGetSerch.innerHTML = ''
    document.getElementById('load').classList.remove('d-none');

    wholeData.innerHTML=`
    <section id="showValidName" class="w-100 vh-100 d-flex justify-content-center align-items-center">
 <div class="container">
  <div class="row w-75 mx-auto">
    <div id="loginDisign" class="col-md-6">
      <input type="text" id="nameValid" class="form-control" placeholder="Enter Your Name">
      <div id="nameAlert" class="alert alert-danger w-100 mt-2  d-none">
      you must include your name atleast 4 letter
    </div>    
    </div>
    <div id="loginDisign" class="col-md-6">
      <input type="text" id="emailValid" class="form-control " placeholder="Enter Your Email">
      <div id="emailAlert" class="alert alert-danger w-100 mt-2  d-none">
      you must include your email atleast 2 letter and 2 Number + @ + gmail.com or yahoo.com
    </div>    
    </div>
    <div id="loginDisign" class="col-md-6">
      <input type="number" id="PhoneValid" class="form-control px-5" placeholder="Enter Your Phone">
      <div id="phoneAlert" class="alert alert-danger w-100 mt-2  d-none">
        Please enter  Valid Phone
    </div>    
    </div>
    <div id="loginDisign" class="col-md-6">
      <input type="number" id="ageValid" class="form-control px-5" placeholder="Enter Your age">  
      <div id="ageAlert" class="alert alert-danger w-100 mt-2  d-none">
        Atleast 10 years old to 99 years old
    </div>    
    </div>
    <div id="loginDisign" class="col-md-6">
      <input type="password" id="passwordValid"  class="form-control " placeholder="Enter Your password">  
      <div id="passwordAlert" class="alert alert-danger w-100 mt-2  d-none ">
      you must include your password atleast 5 letter or numbers from 1 to 9
      </div>    
    </div>
    <div id="loginDisign" class="col-md-6">
      <input type="password" id="rePasswordValid" class="form-control" placeholder="RePassword">  
      <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2  d-none">
        you must set the same that you create it in your password check again
    </div>    
    </div>
    <button id="regester" class="btn btn-outline-danger px-2 mt-3 w-25 mx-auto" disabled>Submit</button>
   </div>
 </div>
</section>
    `
function clear(params) {
    nameValid.value = '';
    ageValid.value = '';
    phoneValid.value = '';
    emailValid.value = '';
    passwordValid.value = '';
    rePasswordValid.value = '';
}
let reginputName = /^\w{2,6}\s?\w{2,6}?$/;
let reginputPhone = /^01(1|2|5|0)\d{8}$/;
let reginputAge = /^[1-9][0-9]$/;
let reginputEmail = /^\w{2,6}\s?\w{2,14}?@(gmail|yahoo|mail|icloud|hotmail)\.com$/;
let reginputPassword = /^\w{5,10}$/;

    let regester = document.getElementById('regester');
    let nameValid = document.getElementById('nameValid');
    let ageValid = document.getElementById('ageValid');
    let phoneValid = document.getElementById('PhoneValid');
    let emailValid = document.getElementById('emailValid');
    let passwordValid = document.getElementById('passwordValid');
    let rePasswordValid = document.getElementById('rePasswordValid');
    nameValid.addEventListener('keyup' , function () {
        if (reginputName.test(nameValid.value)) {
            console.log('yes');
           nameValid.classList.add('is-valid')
           nameValid.classList.remove('is-invalid')
           nameValid.nextElementSibling.classList.add('d-none');
        }else{
            console.log('no');
           nameValid.classList.add('is-invalid')
           nameValid.classList.remove('is-valid')
           nameValid.nextElementSibling.classList.remove('d-none');

        }
        enableButtons();
    })
    phoneValid.addEventListener('keyup' , function () {
        if (reginputPhone.test( phoneValid.value)) {
            phoneValid.classList.add('is-valid')
            phoneValid.classList.remove('is-invalid')
            phoneValid.nextElementSibling.classList.add('d-none');

        }else{
            phoneValid.classList.add('is-invalid')
            phoneValid.classList.remove('is-valid')
            phoneValid.nextElementSibling.classList.remove('d-none');
        }
        enableButtons();

    })
    ageValid.addEventListener('keyup' , function () {
        if (reginputAge.test(ageValid.value)) {
            ageValid.classList.add('is-valid')
            ageValid.classList.remove('is-invalid')
            console.log('yes');
            ageValid.nextElementSibling.classList.add('d-none');
        }else{
            console.log('not');
            ageValid.classList.add('is-invalid')
            ageValid.classList.remove('is-valid')
            ageValid.nextElementSibling.classList.remove('d-none');

        }
        enableButtons();
    })
    emailValid.addEventListener('keyup' , function () {
        if (reginputEmail.test(emailValid.value)) {
            console.log('yes');
            emailValid.classList.add('is-valid')
            emailValid.classList.remove('is-invalid')
            emailValid.nextElementSibling.classList.add('d-none');
        }else{
            console.log('not');
            emailValid.classList.add('is-invalid')
            emailValid.classList.remove('is-valid')
            emailValid.nextElementSibling.classList.remove('d-none');
        }
        enableButtons();
    })
    passwordValid.addEventListener('keyup' , function () {
        if (reginputPassword.test(passwordValid.value)) {
            console.log('yes');
            passwordValid.classList.add('is-valid')
            passwordValid.classList.remove('is-invalid')
            passwordValid.nextElementSibling.classList.add('d-none');
        }else{
            console.log('not');
            passwordValid.classList.add('is-invalid')
            passwordValid.classList.remove('is-valid')
            passwordValid.nextElementSibling.classList.remove('d-none');
        }
        enableButtons();
    })
    rePasswordValid.addEventListener('keyup' , function () {
        if (rePasswordValid.value == passwordValid.value) {
            console.log('yes');
            rePasswordValid.classList.add('is-valid')
            rePasswordValid.classList.remove('is-invalid')
            rePasswordValid.nextElementSibling.classList.add('d-none');
        }else{
            console.log('not');
            rePasswordValid .classList.add('is-invalid')
            rePasswordValid .classList.remove('is-valid')
            rePasswordValid.nextElementSibling.classList.remove('d-none');
        }
        enableButtons();
    })
    function enableButtons() {
        if (reginputName.test(nameValid.value) &&
        reginputPhone.test( phoneValid.value)&&
        reginputAge.test(ageValid.value)&&
        reginputEmail.test(emailValid.value)&&
        reginputPassword.test(passwordValid.value)&&
        rePasswordValid.value == passwordValid.value
        ) {
            regester.removeAttribute('disabled');
            regester.addEventListener('click' ,clear)
        }else{
            regester.setAttribute('disabled' , '');

        }
       }   
       document.getElementById('load').classList.add('d-none');

}