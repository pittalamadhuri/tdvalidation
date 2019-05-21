console.log('what the hell....');
function checkFlag() {
    if(!$('[class="uib-daypicker"]').is(":visible")) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
      /* do something*/
      var list = document.querySelector('[class="uib-daypicker"]');
      var dupList = list.cloneNode(true);

      list.parentNode.replaceChild(dupList, list);
      console.log('duplication done')

      $('[class="btn btn-default btn-sm pull-right uib-right"]').on('click', function(){
          handleClicks('right', list, dupList);
      })

      $('[class="btn btn-default btn-sm pull-right uib-left"]').on('click', function(){
        handleClicks('left', list, dupList);
      })

      $('[class="btn btn-default btn-sm"]').on('click', function(){
          console.log(document.querySelectorAll('[class*="date-picker-input"]'));
        var textValue = $(this)[0].innerText;
        console.log(textValue);
          if (textValue=="02" && document.querySelector('button[id*="datepicker"]').innerText==="April 2019") {
            
              handleDateClicks(textValue, list, dupList);
              // aditionally do error handling
          } else {
              // handle error
              $('[class="btn btn-sm btn-success pull-right uib-close"]').click();
               // when you open a date picker you will find a close button at the bottom
               //this selector will refer to that button for closing the picker
          }
      })
}
}


console.log('first visibility ', $('input[name="workStatus"]').is(":visible"));

function handleClicks(direction, original, cloned) {
    cloned.parentNode.replaceChild(original, cloned);
    if (direction === 'right') {
        $('[class="btn btn-default btn-sm pull-right uib-right"]').click()
    } else {
        $('[class="btn btn-default btn-sm pull-right uib-left"]').click()
    }
    var list = document.querySelector('[class="uib-daypicker"]');
    var dupList = list.cloneNode(true);
    list.parentNode.replaceChild(dupList, list);
    checkFlag();
}

function handleDateClicks(dateValue, list, dupList) {
    var dateList = document.querySelectorAll('[class="btn btn-default btn-sm"]');
    for (var i = 0; i < dateList.length; i++) {
        if (dateList[i].innerText === dateValue) {
            console.log('so finally smtg got clicked');
            // var list = document.querySelector('[class="uib-daypicker"]');
            // var dupList = list.cloneNode(true);
            console.log('lists inc', list);
            console.log('dup inc ', dupList.parentNode);
            dupList.parentNode.replaceChild(list, dupList);
            document.querySelectorAll('[class="btn btn-default btn-sm"]')[i].click();
            break;
        }
    }
}



function checkTheAddition() {
  if(!$('input[name="workStatus"]').is(":visible")) {
   window.setTimeout(checkTheAddition, 100);
  } else {
  $('[ng-click="datepickerCntl.isFocused = true; datepickerCntl.open($event)"]').on('click', function() {
  console.log('got clicked');
  document.querySelectorAll('[ng-init="targetCtrl = $parent.lookupCntl"]')[1].setAttribute('id', 'theworkflowstatus')
//   var original = document.querySelector('[id="theworkflowstatus"]');
  console.log('focus happens btw');
  checkFlag()
 // list.parentNode.replaceChild(dupList, list);
    console.log('dear got added')
})
  }
}

checkTheAddition()
