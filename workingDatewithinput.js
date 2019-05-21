function checkFlag() {
    console.log('In function checkFlag');
    if(!$('[class="uib-daypicker"]').is(":visible")) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
      /* do something*/
      var list = document.querySelector('[class="uib-daypicker"]');
      var dupList = list.cloneNode(true);
       
      list.parentNode.replaceChild(dupList, list);
      console.log('duplication done')

      $('[class="btn btn-default btn-sm pull-right uib-right"]').on('click', function(){
          console.log('I am gng here');
          handleClicks('right', list, dupList);
      })

      $('[class="btn btn-default btn-sm pull-left uib-left"]').on('click', function(){
        console.log('towards left');
        handleClicks('left', list, dupList);
      })
      $('[class="btn btn-default btn-sm uib-title"]').on('click',function(){
          console.log('clicked month');
        //   var list = document.querySelector('[class="uib-daypicker"]');
        //   var dupList = list.cloneNode(true);
          dupList.parentNode.replaceChild(list, dupList);
          var month=document.querySelector('[class="uib-monthpicker"]');
        //   var dupmonth=month.cloneNode(true);
          handleMonths(month);
      })

      $('[class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]').on('click', function(){
        var textValue = $(this)[0].innerText;
        console.log(textValue);
          if ((textValue=="01" ||textValue=="31")&& document.querySelector('button[id*="datepicker"]').innerText==="April 2019") {
            //document.querySelector('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').removeAttribute('disabled');
              handleDateClicks(textValue, list, dupList);
              // aditionally do error handling
          } else {
              console.log('wrong date');
              // handle error
              $('[class="btn btn-sm btn-success pull-right uib-close"]').click();
                //document.querySelector('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').setAttribute('disabled',true);
               // when you open a date picker you will find a close button at the bottom
               //this selector will refer to that button for closing the picker
          }
      })
}
}


console.log('first visibility ', $('input[name="workStatus"]').is(":visible"));

function handleClicks(direction, original, cloned) {
    console.log('In function handleClicks');
    cloned.parentNode.replaceChild(original, cloned);
    if (direction === 'right') {
        $('[class="btn btn-default btn-sm pull-right uib-right"]').click()
    } else {
        $('[class="btn btn-default btn-sm pull-left uib-left"]').click()
    }
    // var list = document.querySelector('[class="uib-daypicker"]');
    // var dupList = list.cloneNode(true);
    // list.parentNode.replaceChild(dupList, list);
    checkFlag();
}
function handleMonths() {
    console.log('In function handleMonths');
    // cloned.parentNode.replaceChild(original, cloned);
    $('[class="btn btn-default btn-sm uib-title"]').click();

$('[class="uib-monthpicker"]').on('click',function(){
    console.log('NEw Month clicked');
    checkFlag();
})    


    //checkFlag();
}

function handleDateClicks(dateValue, list, dupList) {
    console.log('In function handleDateClicks');
    var dateList = document.querySelectorAll('[class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]');
    for (var i = 0; i < dateList.length; i++) {
        if (dateList[i].innerText === dateValue) {
            console.log('so finally smtg got clicked');
            // var list = document.querySelector('[class="uib-daypicker"]');
            // var dupList = list.cloneNode(true);
            console.log('lists inc', list);
            console.log('dup inc ', dupList.parentNode);
            dupList.parentNode.replaceChild(list, dupList);
            console.log('before doubt i value is ',i);
            document.querySelectorAll('[class="uib-daypicker"] tbody [class*="btn btn-default btn-sm"]')[i].click();
            //document.querySelector('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').setAttribute('disabled',true);
            console.log('after doubt');
            break;
        }
    }
}



function checkTheAddition() {
    console.log('In function checkTheAddition');
  if(!$('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').is(":visible")) {
   window.setTimeout(checkTheAddition, 100);
  } else {
   //document.querySelector('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').setAttribute('disabled',true);
   document.querySelector('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').setAttribute('readonly',true);
   $('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').on('click',function(){
   //document.querySelector('[ng-class*="formName.scheduleStart"] [class*="date-picker-input"]').setAttribute('disabled',true);
   });
    $('[ng-class*="formName.scheduleStart"] [ng-click="datepickerCntl.isFocused = true; datepickerCntl.open($event)"]').on('click', function() {
  console.log('got clicked');
  
  document.querySelectorAll('[ng-init="targetCtrl = $parent.lookupCntl"]')[1].setAttribute('id', 'theworkflowstatus');
  
//   var original = document.querySelector('[id="theworkflowstatus"]');
  console.log('focus happens btw');
  checkFlag()
 // list.parentNode.replaceChild(dupList, list);
    console.log('dear got added')
})
  }
}

checkTheAddition()
