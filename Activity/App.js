//npm install selenium-webdriver chromedriver
require("chromedriver");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let {Email,Password} = require("../credentials.json");
const { resolve } = require("path");
//tab 
let tabnew = browser.forBrowser("chrome").build();
let tabWillBeOpenedPromise = tabnew.get("https://www.hackerrank.com/auth/login");

tabWillBeOpenedPromise
    .then(function(){
        let findTimeOutP = tabnew.manage().setTimeouts({
            implicit: 10000
        });
        return findTimeOutP;
    })
     .then(function(){

        let inputBoxPromise = tabnew.findElement(swd.By.css("#input-1"));
        return inputBoxPromise;
     }).then(function(inputBox){
         let inputBoxWillbeFilledP = inputBox.sendKeys(Email);
         return inputBoxWillbeFilledP;

     }).then(function(){
         let passwordBoxPromise = tabnew.findElement(swd.By.css("#input-2"));
         return passwordBoxPromise;
     }).then(function(passwordBox){
         let passwordBoxP = passwordBox.sendKeys(Password);
         return passwordBoxP;
     }).then(function(){
         let loginBPromise = tabnew.findElement(swd.By.css("[data-analytics='LoginPassword']"));
         return loginBPromise;
     }).then(function(loginB){
         let loginBP = loginB.click();
         return loginBP;
     }).then(function(){
        let InterBPromise = tabnew.findElement(swd.By.css("h3[title='Interview Preparation Kit']"));
        return InterBPromise;
    }).then(function(InterB){
        let InterBP = InterB.click();
        return InterBP;
    })
    .then(function(){
        let WarmBPromise = tabnew.findElement(swd.By.css("#base-card-7"));
        return WarmBPromise;
    }).then(function(WarmB){
        let WarmBP = WarmB.click();
        return WarmBP;
    }).then(function(){
        let QuesB = tabnew.getCurrentUrl();
        return QuesB;
    }).then(function(QuesB){
        let QuesSolveB = questionSolve();
        return QuesSolveB;
    })
     .catch(function(err){
         console.log(err);
     })

function questionSolve(){
        return new Promise(function(resolve,reject){
             let QuesSolvBtn = tabnew.findElements(swd.By.css(".challenge-submit-btn"));
             QuesSolvBtn.then(function(QuesBtnarr){
            for(let i =0;i<4;i++){
             let QuesClickBtnP = QuesBtnarr[i].click();
             return QuesClickBtnP;
            }
         }).then(function(){
             console.log("I am at editorial");
             let editorialP = tabnew.findElement(swd.By.css("a[data-attr2='Editorial']"));
             return editorialP;
         }).then(function(editorialP){
             let EditBtnP = editorialP.click();
             return EditBtnP;
         })
         .then(function(){
             let UnlockBtnP = handleBtn();
             return UnlockBtnP;
         }).then(function(){
            let CopyCodeP = copyCode();
            return CopyCodeP;
         }).then(function(code){
           let codePasteP = pasteSol(code);
           return codePasteP;
         }).then(function(){
             resolve();
         })
         .catch(function(err){
             reject(err);
         })
    });
    }

function handleBtn(){
    return new Promise(function(resolve,reject){
        let UnlockBttnP = tabnew.findElement(swd.By.css(".editorial-content-locked button.ui-btn.ui-btn-normal"));
        UnlockBttnP.then(function(UnlockBttn){
            let lockBtnP = UnlockBttn.click();
            return lockBtnP;
        }).then(function(){
            resolve();
        }).catch(function(){
            console.log("BTn NOt found");
            resolve();
        })
    })
}

function copyCode(){
    return new Promise(function(resolve,reject){
        let alllangElmenP = tabnew.findElements(swd.By.css(".hackdown-content h3"));
        let allcodeElmenP = tabnew.findElements(swd.By.css(".hackdown-content .highlight"));
        let bothArrayP = Promise.all([alllangElmenP,allcodeElmenP]);
        bothArrayP.then(function(bothArray){
            let langElements = bothArray[0];
            gcodesElements = bothArray[1];
            let alllangTextP = [];
            for(let i =0;i<langElements.length;i++){
                let clangP = langElements[i].getText();
                alllangTextP.push(clangP);
            }
            return Promise.all(alllangTextP);
        }).then(function(alllang){
            let codeP;
            for(let i=0;i<alllang.length;i++){
                if (alllang[i].includes("C++")){
                    codeP = gcodesElements[i].getText();
                    break;
                }
            }
                return codeP;
            }).then(function(code){
                console.log(code)
                resolve(code);
            }).catch(function(err){
                reject(err);
            })

        });


}

function pasteSol(code){
    return new Promise(function(resolve,reject){
        let ProbTabP = tabnew.findElement(swd.By.css("li#Problem"));
          ProbTabP.then(function(ProbTab){
              let ProbTabClickP = ProbTabP.click();
              console.log(7547);
              return ProbTabClickP;
          }).then(function(){
              let inputBoxP = tabnew.findElement(swd.By.css(".custom-input-checkbox"));
              return inputBoxP;
          }).then(function(inputBox){
               let inpputBoxClickP = inputBox.click();
               return inpputBoxClickP;
          }).then(function(){
              let cutsomInputBoxP = tabnew.findElement(swd.By.css(".custominput"));
              return cutsomInputBoxP;
          }).then(function(customInputBox){
               gcInputBox = customInputBox;
               let codeenteredP = customInputBox.sendKeys(code);
               return codeenteredP;
          }).then(function(){
              let ctrlSelP = gcInputBox.sendKeys(swd.Key.CONTROL + "a");
              return ctrlSelP;
          }).then(function(){
              ctrlCutP = gcInputBox.sendKeys(swd.Key.CONTROL + "x");
              return ctrlCutP;
          }).then(function(){
              let AreaP = tabnew.findElement(swd.By.css("textarea"));
              console.log("I am automated");
              return AreaP;
          }).then(function(Area){
               gTextArea = Area;
               let codewillSelP = Area.sendKeys(swd.Key.CONTROL + "a");
               return codewillSelP;
          }).then(function(){
              let ctrlPastP = gTextArea.sendKeys(swd.Key.CONTROL +"v");
              return ctrlPastP;
          }).then(function(){
              let submitBtnP = tabnew.findElement(swd.By.css("button.hr-monaco-submit"));
              return submitBtnP;
          }).then(function(submitBtn){
               let submitBtnClicked = submitBtn.click();
               return submitBtnClicked;              
         
          }).then(function(){
              resolve();
          }).catch(function(err){
              reject(err);
          })
    });
}