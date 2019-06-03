function startValidation(inputSelector, listidentifier) {
    if (!$(`[id="${listidentifier}"] li`).is(":visible"))
    {    
        window.setTimeout(startValidation, 100, inputSelector, listidentifier);
    } 
    else 
    {
        var list = document.querySelector(`[id="${listidentifier}"]`);    
        var prevValue = document.querySelector('input[name="workStatus"]').value;
        var dupList = document.querySelector(`[id="${listidentifier}"]`).cloneNode(true)
        list.parentNode.replaceChild(dupList, list);
        $(`[id="${listidentifier}"] li`).on('click', function () 
        {
            var textValue = $(this)[0].innerText;
            dupList.parentNode.replaceChild(list, dupList);
            const nodeList = document.querySelectorAll(`[id="${listidentifier}"] li`);
            if (textValue==="Active")
            {
                console.log('inside if Madhuri');
                clickMe(nodeList, textValue); 
            } 
            else 
            {  
                console.log('pre value is ', prevValue); 
                if (prevValue.length > 1) {
                 clickMe(nodeList, prevValue);
                } else {
                    searchNodeList(nodeList, textValue);   
                }
            } 
        });  
    }
}

function clickMe(nodeList, textValue) {
        for (var element of nodeList) 
    {    
        if (element.innerText === textValue){       
        element.setAttribute('id', 'finalTrigger');    
        $('[id="finalTrigger"]').trigger('click');   
        $('[id="someerror"]').remove(); 
        break;    
        }    
    }
}

function displayErrorMessage(errorMessage, selector, errorIdentification) {
    var mess = errorMessage;
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = mess ;
    errorMessage.setAttribute('style', 'color:red');
    errorMessage.setAttribute('id', errorIdentification);
    $(errorMessage) .insertAfter(selector)
}

function searchNodeList(nodeList, text) 
{ 
    var a = $('[id="workStatus-clear-icon"]');
    console.log('sme shit ');
    if (document.querySelector('input[id="workStatus"]').value === '') 
    {
        $('[id="workStatus-clear-icon"]').click();
        console.log('if cond.');
    } 
    else
    {
        console.log('else cond.');
        $('[id="workStatus-clear-icon"]')[0].click();
    }
    $('input[name="workStatus"]').blur();
    if(document.querySelectorAll('[id="someerror"]').length==0)
    displayErrorMessage('Workstatus should be active when Project type is Infrastructure Deployment','label[for="workStatus"]','someerror');
}
function initializeValidation(inputSelector, listSelector, index, listidentifier) 
{
    if (!$(inputSelector).is(":visible")) 
    {
        window.setTimeout(initializeValidation, 100, inputSelector, listSelector, index, listidentifier);
    } 
    else 
    {
        $(inputSelector).on('click', function () 
        {
            document.querySelectorAll(listSelector)[index].setAttribute('id', listidentifier)
            if(document.querySelector('input[id="projectType"]').value==="Infrastructure Deployment")
            {
                console.log('This if is true madhuri');
            startValidation(inputSelector, listidentifier);}
        })
    }
}
initializeValidation('[ng-class*="formName.workStatus"] [class*="m-r-sm"] a', '[ng-init="targetCtrl = $parent.lookupCntl"]', 1, 'theworkflowstatus');
initializeValidation('input[name="workStatus"]', '[ng-init="targetCtrl = $parent.lookupCntl"]', 1, 'theworkflowstatus');
