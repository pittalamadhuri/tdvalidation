console.log('function started');
var textValue,actualNode,duplicateNode,tdate,selector='[ng-class*="formName.scheduleStart"]';
function checkFlag() {
    if(!$(selector+' [class="uib-daypicker"]').is(":visible")) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
      /* do something*/
      var list = document.querySelector(selector+' [class="uib-daypicker"]');
      var dupList = list.cloneNode(true);
       
      list.parentNode.replaceChild(dupList, list);

      $(selector+' [class="btn btn-default btn-sm pull-right uib-right"]').on('click', function(){
          handleClicks('right', list, dupList);
      })

      $(selector+' [class="btn btn-default btn-sm pull-left uib-left"]').on('click', function(){
        handleClicks('left', list, dupList);
      })
      $(selector+' [class="btn btn-default btn-sm uib-title"]').on('click',function(){
          dupList.parentNode.replaceChild(list, dupList);
          var month=document.querySelector(selector+' [class="uib-monthpicker"]');
          handleMonths(month);
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
          //  tdate=new Date(document.querySelector(selector+' button[id*="datepicker"]').innerText);
           tdate=new Date(tdate.setMonth(tdate.getMonth()-1));
          //  tdate=new Date(tdate.setDate(textValue));
          }
          else 
          {
          // tdate=new Date(document.querySelector(selector+' button[id*="datepicker"]').innerText);
          tdate=new Date(tdate.setMonth(tdate.getMonth()+1));
          }
        }
       
          if (isValid(tdate)) {
            if(duplicateNode&&actualNode&&document.querySelector('[id*="letznaverror"]'))
            {
                $(selector+' [id*="letznaverror"]').remove();
                duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
            }
              handleDateClicks(textValue, list, dupList, HasClass);
              // aditionally do error handling
          } else {
              // handle error
              $(selector+' [class="btn btn-sm btn-success pull-right uib-close"]').click();
          }
      })
}
}
function handleClicks(direction, original, cloned) {
    cloned.parentNode.replaceChild(original, cloned);
    if (direction === 'right') {
        $(selector+' [class="btn btn-default btn-sm pull-right uib-right"]').click()
    } else {
        $(selector+' [class="btn btn-default btn-sm pull-left uib-left"]').click()
    }
    checkFlag();
}
function handleMonths() {
    $(selector+' [class="btn btn-default btn-sm uib-title"]').click();

$(selector+' [class="uib-monthpicker"]').on('click',function(){
    checkFlag();
})    

}

function handleDateClicks(dateValue, list, dupList, HasClass) {
    var dateList = document.querySelectorAll(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]');
    for (var i = 0; i < dateList.length; i++) {
      //console.log('has', $(dateList[i]).children("span").hasClass('text-muted'), HasClass);
        if (dateList[i].innerText === dateValue && $(dateList[i]).children("span").hasClass('text-muted') === HasClass) {
          console.log('found the clicked value at ',i, dateList[i].innerText, dateValue, $(dateList[i]).children("span").hasClass('text-muted'), HasClass)
            dupList.parentNode.replaceChild(list, dupList);
            document.querySelectorAll(selector+' [class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]')[i].click();
            break;
        }
    }
}



function checkTheAddition() {
  if(!$('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').is(":visible")) {
   window.setTimeout(checkTheAddition, 100);
  } else {
  //  document.querySelector(selector+' [class*="date-picker-input"]').setAttribute('readonly',true);
  //  document.querySelector(selector+' [class*="date-picker-input"]').setAttribute('style',"color:rgba(1,1,1,1)");
   $(selector+' [class*="date-picker-input"]').on('click input',function(){
    $(selector+' [class="btn btn-sm btn-success pull-right uib-close"]').click();
    validateTextField(selector+' [class*="date-picker-input"]', isValid, 'Date must be less than Dec 07 2018', 'letznaverror_date');
   });
    $(selector+' [ng-click="datepickerCntl.isFocused = true; datepickerCntl.open($event)"]').on('click', function() {
        //actualNode.value = duplicateNode.value;
        // if(duplicateNode&&actualNode&&document.querySelector('[id*="letznaverror"]'))
        // duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
  checkFlag();
})
  }
}
checkTheAddition()
function isValid(tdate){
  if(tdate<new Date('07 December 2018'))
  return true;
 else return false;
}


///////////////////////////////////Input field validation starts/////////////////////////////////////////////////



function validateTextField(selector, validationFunction, errorMessage, errorIdentification) 
{

    actualNode = document.querySelector(selector);
    duplicateNode = actualNode.cloneNode();

    actualNode.parentNode.replaceChild(duplicateNode, actualNode);
    $(selector).focus();

    $(selector).on('blur', function () {

        var errorIdentifier = $('#' + errorIdentification);
        if (validationFunction(new Date(document.querySelector(selector).value))) {
            actualNode.value = duplicateNode.value;
            duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
            // $(this).unbind();
            triggerChange(actualNode, duplicateNode);
            errorIdentifier.remove();

            //$(this).focus();
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
    console.log('Trigger change executed');
    var evt = document.createEvent('KeyboardEvent');
    evt.initEvent('change', true, true);
    selector.dispatchEvent(evt);
    var evt2 = document.createEvent('KeyboardEvent');
    evt2.initEvent('blur', true, true);
    selector.dispatchEvent(evt2);
}

function displayErrorMessage(errorMessage, selector, errorIdentification) {
    var mess = errorMessage;
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = mess ;
    errorMessage.setAttribute('style', 'color:red');
    errorMessage.setAttribute('id', errorIdentification);
    $(errorMessage).insertAfter(selector)
}