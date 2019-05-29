console.log('Execution started');
var textValue,actualNode,duplicateNode,tdate,identifier;
function checkFlag(selector,identifier,errorIdentification) {
    console.log('In Checkflag()');
    if(!$(selector+' [class="uib-daypicker"]').is(":visible")) {
       window.setTimeout(checkFlag, 100);
    } else {
      var list = document.querySelector(selector+' [class="uib-daypicker"]');
      var dupList = list.cloneNode(true);
      list.parentNode.replaceChild(dupList, list);
      $(selector+' [class="btn btn-default btn-sm pull-right uib-right"]').on('click', function(){
          handleClicks(selector,identifier,errorIdentification,'right', list, dupList);
      })

      $(selector+' [class="btn btn-default btn-sm pull-left uib-left"]').on('click', function(){
        handleClicks(selector,identifier,errorIdentification,'left', list, dupList);
      })
      $(selector+' [class="btn btn-default btn-sm uib-title"]').on('click',function(){
          dupList.parentNode.replaceChild(list, dupList);
          var month=document.querySelector(selector+' [class="uib-monthpicker"]');
          handleMonths(selector,identifier,errorIdentification);
      })

      $(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]').on('click', function(){
        textValue = $(this)[0].innerText;
        tdate=new Date(document.querySelector(selector+' button[id*="datepicker"]').innerText);
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
                $(selector+' [id*='+errorIdentification+']').remove();
                duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
            }
              handleDateClicks(selector,textValue, list, dupList, HasClass);
          } else {
              $(selector+' [class="btn btn-sm btn-success pull-right uib-close"]').click();
          }
      })
}
}
function handleClicks(selector,identifier,errorIdentification,direction, original, cloned) {
    console.log('In handleClicks()');
    cloned.parentNode.replaceChild(original, cloned);
    if (direction === 'right') {
        $(selector+' [class="btn btn-default btn-sm pull-right uib-right"]').click()
    } else {
        $(selector+' [class="btn btn-default btn-sm pull-left uib-left"]').click()
    }
    checkFlag(selector,identifier,errorIdentification);
}
function handleMonths(selector,identifier,errorIdentification) {
    console.log('In handleMonths()');
    $(selector+' [class="btn btn-default btn-sm uib-title"]').click();

$(selector+' [class="uib-monthpicker"]').on('click',function(){
    checkFlag(selector,identifier,errorIdentification);
})    

}

function handleDateClicks(selector,dateValue, list, dupList, HasClass) {
    console.log('In handleDateClicks');
    var dateList = document.querySelectorAll(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]');
    for (var i = 0; i < dateList.length; i++) {
        if (dateList[i].innerText === dateValue && $(dateList[i]).children("span").hasClass('text-muted') === HasClass) {
          console.log('found the clicked value at ',i, dateList[i].innerText, dateValue, $(dateList[i]).children("span").hasClass('text-muted'), HasClass)
            dupList.parentNode.replaceChild(list, dupList);
            document.querySelectorAll(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]')[i].click();
            break;
        }
    }
}



function dateValidation(selector,identifier,errorText,errorIdentification) {
    console.log('In dateValidation()');
    console.log('and selector is ',selector);
  if(!$('[ng-class*="formName.scheduleStart"]').is(":visible")) {
   window.setTimeout(dateValidation(selector,identifier,errorText,errorIdentification), 100);
  } else {
      console.log(selector);
   $(selector+' [class*="date-picker-input"]').on('click input',function(){
    $(selector+' [class="btn btn-sm btn-success pull-right uib-close"]').click();
    validateTextField(selector+' [class*="date-picker-input"]',identifier, isValid, errorText, errorIdentification);
   });
    $(selector+' [ng-click="datepickerCntl.isFocused = true; datepickerCntl.open($event)"]').on('click', function() {
  checkFlag(selector,identifier,errorIdentification);
})
  }
}
dateValidation('[ng-class*="formName.scheduleStart"]', 1,'Date must be less than Dec 07 2018','letznaverror_startdate');
dateValidation('[ng-class*="formName.scheduleFinish"]', 2,'Date must be more than Dec 07 2018','letznaverror_enddate');



function isValid(tdate, identifier){
    console.log('In isValid()');
 return wheremylogicisthere(tdate,identifier);
}

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


///////////////////////////////////Input field validation starts/////////////////////////////////////////////////



function validateTextField(selector,identifier, validationFunction, errorMessage, errorIdentification) 
{
    console.log('In validateTextField()');
    actualNode = document.querySelector(selector);
    duplicateNode = actualNode.cloneNode();

    actualNode.parentNode.replaceChild(duplicateNode, actualNode);
    $(selector).focus();

    $(selector).on('blur', function () {

        var errorIdentifier = $('#' + errorIdentification);
        if (validationFunction(new Date(document.querySelector(selector).value),identifier)) {
            actualNode.value = duplicateNode.value;
            duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
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