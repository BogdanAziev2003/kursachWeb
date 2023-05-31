let toRussian = "http://77.232.132.177:8080/api/translate";
let toIron = "http://77.232.132.177:8080/api/origin";

let flag = false; //С русского на осетинский
let inInput = document.querySelector("#first-textarea");
let outInput = document.querySelector("#second-textarea");
let switchBtn = document.querySelector(".switch");
let inText = document.querySelector("#in-head");
let outText = document.querySelector("#out-head");
let translateBtn = document.querySelector(".main__button");


switchBtn.addEventListener("click", ()=>{
    flag = !flag;
    [inText.innerText, outText.innerText] = [outText.innerText, inText.innerText]
});

translateBtn.addEventListener("click", ()=>{
    let value = inInput.value;
    value = value.toLowerCase().trim();
    if(value === ""){
        outInput.value = "Вы ничего не написали(((";
        return;
    }
    getTranslate(value)
    .then((data) => {
        if(data == null) {
            outInput.value = "Такого слова в словаре еще нет";
            return;
        }
        let res = "";
        let translates = data.translates;
        translates.forEach((translate) => {
            res += translate + "\n";
        })

        outInput.value = res;

    });
});

async function getTranslate(value){
    let url = flag ? toRussian : toIron;
    url += "?value=" + value;
    let response = await fetch(url);
    if(response.ok){
        return await response.json();
    }
    return null;
}