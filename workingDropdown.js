function startValidation(inputSelector, listidentifier) {

        if (!$(`[id="${listidentifier}"] li`).is(":visible")) {
    
            window.setTimeout(startValidation, 100, inputSelector, listidentifier); /* this checks the flag every 100 milliseconds*/
    
        } else {
    
            /* do something*/
    
            var list = document.querySelector(`[id="${listidentifier}"]`);
    
            var dupList = document.querySelector(`[id="${listidentifier}"]`).cloneNode(true)
    
    
     
    
    
            list.parentNode.replaceChild(dupList, list);
    
    
     
    
    
            $(`[id="${listidentifier}"] li`).on('click', function () {
    
                var textValue = $(this)[0].innerText;
    
                dupList.parentNode.replaceChild(list, dupList);
    
                const nodeList = document.querySelectorAll(`[id="${listidentifier}"] li`);
    
                
    
                if (textValue==="Active") {
    
             for (var element of nodeList) {
    
            if (element.innerText === "Active") {
    
        console.log('node lists required');
    
        element.setAttribute('id', 'finalTrigger');
    
       $('[id="finalTrigger"]').trigger('click');
    
        break;
    
             }
    
         }
     
    
    
                } else {
    
    
         searchNodeList(nodeList, textValue);
    
    
                }
    
                // document.querySelector(inputSelector).value = textValue;
    
    
     
    
    
            })
    
        }
    
    }
    
    
     
    
    
    function searchNodeList(nodeList, text) {
    
        // if (text === '') {
    
            
    
    
     
    
    
        // }
    
        // for (var element of nodeList) {
    
        //     if (element.innerText === text) {
    
        //         console.log('node lists required');
    
        //         element.setAttribute('id', 'finalTrigger');
    
        //         $('[id="finalTrigger"]').trigger('click');
    
        //         break;
    
        //     }
    
        // }
    
        
    
        var a = $('[id="workStatus-clear-icon"]');
    
        console.log('sme shit ')
    
      if (document.querySelector('input[id="workStatus"]').value === '') {
    
        $('[id="workStatus-clear-icon"]').click();
    
        console.log('if cond.');
    
      } else {
    
        console.log('else cond.');
    
        $('[id="workStatus-clear-icon"]')[0].click();
    
      }
    
    }
    
    
     
    
    
    function initializeValidation(inputSelector, listSelector, index, listidentifier) {
    
        if (!$(inputSelector).is(":visible")) {
    
            window.setTimeout(initializeValidation, 100, inputSelector, listSelector, index, listidentifier);
    
        } else {
    
            $(inputSelector).on('click', function () {
    
                document.querySelectorAll(listSelector)[index].setAttribute('id', listidentifier)
    
                startValidation(inputSelector, listidentifier);
    
            })
    
        }
    
    }
    
    
     
    
    
    initializeValidation('input[name="workStatus"]', '[ng-init="targetCtrl = $parent.lookupCntl"]', 1, 'theworkflowstatus');