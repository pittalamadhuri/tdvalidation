console.log('Execution started');
//var actualNode,duplicateNode;
function checkFlag(selector,identifier,errorIdentification,actualNode,duplicateNode) {
    console.log('In Checkflag()');
    if(!$(selector+' [class="uib-daypicker"]').is(":visible")) {
       window.setTimeout(checkFlag, 1000,selector,identifier,errorIdentification,actualNode,duplicateNode);
    } else {
      var list = document.querySelector(selector+' [class="uib-daypicker"]');
      var dupList = list.cloneNode(true);
      console.log('checking 1 ');
      list.parentNode.replaceChild(dupList, list);
      $(selector+' [class="btn btn-default btn-sm pull-right uib-right"]').on('click', function(){
          handleClicks(selector,identifier,errorIdentification,'right', list, dupList,actualNode,duplicateNode);
      })

      $(selector+' [class="btn btn-default btn-sm pull-left uib-left"]').on('click', function(){
        handleClicks(selector,identifier,errorIdentification,'left', list, dupList,actualNode,duplicateNode);
      })
      $(selector+' [class="btn btn-default btn-sm uib-title"]').on('click',function(){
        console.log('checking 2 ');
          dupList.parentNode.replaceChild(list, dupList);
          var month=document.querySelector(selector+' [class="uib-monthpicker"]');
          handleMonths(selector,identifier,errorIdentification,actualNode,duplicateNode);
      })

      $(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]').on('click', function(){
        console.log('onclick date actual node: ',actualNode.value,' duplicate node: ',duplicateNode.value);
        var textValue = $(this)[0].innerText;
        var tdate=new Date(document.querySelector(selector+' button[id*="datepicker"]').innerText);
        tdate=new Date(tdate.setDate(textValue));
        var HasClass = $(this).children("span").hasClass('text-muted');
        if($(this).children("span").hasClass('text-muted'))
        {
          console.log('This is Muted value');
          if(parseInt(textValue)>15)
          {
           tdate=new Date(tdate.setMonth(tdate.getMonth()-1));
          }
          else 
          {
          tdate=new Date(tdate.setMonth(tdate.getMonth()+1));
          }
        }
       
          if (isValid(tdate,identifier)) {
            if(duplicateNode&&actualNode&&document.querySelector('[id*='+errorIdentification+']'))
            {
                console.log('in Checkflag',actualNode, duplicateNode);
                $(selector+' [id*='+errorIdentification+']').remove();
                console.log('checking 3 ');
                duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
            }
            
              handleDateClicks(selector,textValue, list, dupList, HasClass,actualNode,duplicateNode);
              console.log('nodes ', actualNode, duplicateNode); 
          } else {
              $(selector+' [class="btn btn-sm btn-success pull-right uib-close"]').click();
          }
      })
}
}
function handleClicks(selector,identifier,errorIdentification,direction, original, cloned,actualNode,duplicateNode) {
    console.log('In handleClicks()');
    console.log('checking 4 ');
    cloned.parentNode.replaceChild(original, cloned);
    if (direction === 'right') {
        $(selector+' [class="btn btn-default btn-sm pull-right uib-right"]').click()
    } else {
        $(selector+' [class="btn btn-default btn-sm pull-left uib-left"]').click()
    }
    checkFlag(selector,identifier,errorIdentification,actualNode,duplicateNode);
}
function handleMonths(selector,identifier,errorIdentification,actualNode,duplicateNode) {
    console.log('In handleMonths()');
    $(selector+' [class="btn btn-default btn-sm uib-title"]').click();

$(selector+' [class="uib-monthpicker"]').on('click',function(){
    checkFlag(selector,identifier,errorIdentification,actualNode,duplicateNode);
})    

}
function handleDateClicks(selector,dateValue, list, dupList, HasClass,actualNode,duplicateNode) {

    console.log('in handledateclicks actual node: ',actualNode.value,' duplicate node: ',duplicateNode.value);
    console.log('In handleDateClicks');
    var dateList = document.querySelectorAll(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]');
    for (var i = 0; i < dateList.length; i++) {
        if (dateList[i].innerText === dateValue && $(dateList[i]).children("span").hasClass('text-muted') === HasClass) {
          console.log('found the clicked value at ',i, dateList[i].innerText, dateValue, $(dateList[i]).children("span").hasClass('text-muted'), HasClass)
          console.log('checking 5 ');  
          dupList.parentNode.replaceChild(list, dupList);
            console.log('error not here');
            document.querySelectorAll(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]')[i].click();
            console.log('in handledateclicks after for actual node: ',actualNode.value,' duplicate node: ',duplicateNode.value);
            duplicateNode.value = actualNode.value;
            break;
        }
    }
}
function dateValidation(selector,identifier,errorText,errorIdentification) {
//   if(!$('input[name="workStatus"]').is(":visible")) {
//    window.setTimeout(dateValidation(selector,identifier,errorText,errorIdentification), 1000);
//   } else {
    var actualNode = document.querySelector(selector+' input');
      var duplicateNode = actualNode.cloneNode();
      console.log('actual node: ',actualNode.value,' duplicate node: ',duplicateNode.value);
   $(selector+' [class*="date-picker-input"]').on('click input ',function(){
    $(selector+' [class="btn btn-sm btn-success pull-right uib-close"]').click();
validateTextField(selector+' [class*="date-picker-input"]',identifier, isValid, errorText, errorIdentification,actualNode,duplicateNode);
   });
    $(selector+' [ng-click="datepickerCntl.isFocused = true; datepickerCntl.open($event)"]').on('click', function() {

  checkFlag(selector,identifier,errorIdentification,actualNode,duplicateNode);
})
//   }
}
function isValid(tdate, identifier){
    console.log('In isValid()');
 return wheremylogicisthere(tdate,identifier);
}
function validateTextField(selector,identifier, validationFunction, errorMessage, errorIdentification,actualNode,duplicateNode) 
{
    console.log('In validateTextField()');
    console.log('checking 6 ');
    actualNode.parentNode.replaceChild(duplicateNode, actualNode);
    console.log('checking 7 before ',duplicateNode.parentNode);
    $(selector).focus();

    $(selector).on('blur', function () {

        var errorIdentifier = $('#' + errorIdentification);
        if (validationFunction(new Date(document.querySelector(selector).value),identifier)) {
            actualNode.value = duplicateNode.value;
            if(duplicateNode.parentNode){
            console.log('checking 7 after ',duplicateNode.parentNode);
            duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
        }
        $(this).off('blur');
            triggerChange(actualNode, duplicateNode);
            errorIdentifier.remove();
            $(this).off('keyup');

        } else {
            if (errorIdentifier.length === 0) {
                displayErrorMessage(errorMessage, selector, errorIdentification);
            }
        }

    })
}
function triggerChange(selector, dupSelector) 
{
    console.log('In triggerChange()');
    console.log('Trigger change executed');
    var evt = document.createEvent('KeyboardEvent');
    evt.initEvent('change', true, true);
    selector.dispatchEvent(evt);
    var evt2 = document.createEvent('KeyboardEvent');
    evt2.initEvent('blur', true, true);
    selector.dispatchEvent(evt2);
}
function displayErrorMessage(errorMessage, selector, errorIdentification) {
    console.log('In displayErrorMessage()');
    var mess = errorMessage;
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = mess ;
    errorMessage.setAttribute('style', 'color:red');
    errorMessage.setAttribute('id', errorIdentification);
    $(errorMessage).insertAfter(selector)
}

/////////////////////////////////////Do not change anything above///////////////////////////////////////////////

//The below function is for the date logics
function wheremylogicisthere(tdate,identifier) {
    console.log('In wheremylogicsthere()');
    switch(identifier){
        case 1:     if(tdate<new Date('07 December 2018')){
                    console.log('return true');
                    return true;
                    }
                    else 
                    return false;
                    break;
        case 2: if(tdate>new Date('07 December 2018'))
                return true; 
                else return false;
    }
}

//Below is to attach validations to Date fields
function justStart(){
    if(!$('input[name="workStatus"]').is(":visible")){
window.setTimeout(justStart,1000);
    }
    else{
        dateValidation('[ng-class*="formName.scheduleFinish"]', 2,'Date must be more than Dec 07 2018','letznaverror_enddate');
        dateValidation('[ng-class*="formName.scheduleStart"]', 1,'Date must be less than Dec 07 2018','letznaverror_startdate');
    }
}

justStart();