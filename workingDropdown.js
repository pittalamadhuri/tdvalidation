
function searchNodeList(nodeList, textValue) 
{ 
    var a = $('[id="workStatus-clear-icon"]');
    if (document.querySelector('input[id="workStatus"]').value === '') 
    {
        $('[id="workStatus-clear-icon"]').click();
    } 
    else
    {
        $('[id="workStatus-clear-icon"]')[0].click();
    }
    $('input[name="workStatus"]').blur();
    if(document.querySelectorAll('[id="someerror"]').length==0)
    displayErrorMessage('Workstatus should be active when Project type is Infrastructure Deployment','label[for="workStatus"]','someerror');
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

function startValidation(selector, identifier, listidentifier) {
    if (!$(`[id="${listidentifier}"] li`).is(":visible"))
    {    
        window.setTimeout(startValidation, 100, selector, identifier, listidentifier);
    } 
    else 
    {
        var list = document.querySelector(`[id="${listidentifier}"]`);    
        var prevValue = document.querySelector(selector+' input').value;
        var dupList = document.querySelector(`[id="${listidentifier}"]`).cloneNode(true);
        list.parentNode.replaceChild(dupList, list);
        $(`[id="${listidentifier}"] li`).on('click', function () 
        {
            var textValue = $(this)[0].innerText;
            dupList.parentNode.replaceChild(list, dupList);
            const nodeList = document.querySelectorAll(`[id="${listidentifier}"] li`);
            if(dropdownLogics(textValue,identifier))
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

function dropdownValidation( selector, identifier,listidentifier) 
{
    if (!$(selector).is(":visible")) 
    {
        window.setTimeout(dropdownValidation, 100, selector, identifier, index, listidentifier);
    } 
    else 
    {//This is to find index
        var list=document.querySelectorAll('div[class="input-group"][ng-class*="lookupCntl"]')
        var index;
        for(var i=0;i<list.length;i++)
        {
            if(list[i]===document.querySelector(selector))
            {
                index=i;
                break;
            }
        }
        const inputSelector=$(selector+' input');
        const arrowSelector=$(selector+' [class*="m-r-sm"] a');
        inputSelector.add(arrowSelector).on('click', function () 
        {
            document.querySelectorAll('[ng-init="targetCtrl = $parent.lookupCntl"]')[index].setAttribute('id', listidentifier);
            startValidation(selector,identifier, listidentifier);
        })
    }
}


function dropdownLogics(textValue,identifier){
    switch(identifier){
        case 1: if(textValue=="Active")
                return true;
                else
                return false;
                break;
    }
}

dropdownValidation('div[ng-class*="formName.workStatus"]',1,'theworkflowstatus','Workstatus should be active when Project type is Infrastructure Deployment');