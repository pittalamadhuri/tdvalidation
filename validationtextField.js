//Global Obj that holds all the callbacks
window._val_global = {};
//Setting up the object for adding buttons at page level.
window._val_global['page_settings'] = {};

window._val_global.validateTextField= function (selector, validationFunction, errorMessage, errorIdentification) 
{

    var actualNode = document.querySelector(selector);
    var duplicateNode = actualNode.cloneNode();
    actualNode.parentNode.replaceChild(duplicateNode, actualNode);
    $(selector).focus();
    $(selector).on('keyup', function () 
    {
        var errorIdentifier = $('#' + errorIdentification);
        if (validationFunction()) 
        {
            actualNode.value = duplicateNode.value;
            duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
            window._val_global.triggerChange(actualNode);
            errorIdentifier.remove();
            $(this).focus();
            $(this).off('keyup');
        } 
        else 
        {
            if (errorIdentifier.length === 0) 
            {
                window._val_global.displayErrorMessage(errorMessage, selector, errorIdentification);
            }
        }

    });
}
   // trigger a change event to save valid content
   window._val_global.triggerChange= function (selector) {
    var evt = document.createEvent('KeyboardEvent');
    evt.initEvent('change', true, true);
    selector.dispatchEvent(evt);
}

// to display error message
window._val_global.displayErrorMessage= function(errorMessage, selector, errorIdentification) {
    var mess = errorMessage;
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = mess ;
    errorMessage.setAttribute('style', 'color:red');
    errorMessage.setAttribute('id', errorIdentification);
    $(errorMessage) .insertAfter(selector)
}
window._val_global.executeFunction= function() {
    if ($('input[name="name"]').val() === 'endgame') {
        console.log('if executes ');
        return true;
    } else {
        console.log('else executes ');
        return false;
    }
    }

//Page Settings function
window._val_global.apply_page_settings = function () {
    $.each(window._val_global['page_settings'], function (name, settings) {
        if (document.querySelectorAll(settings.anchor1).length!=0&&document.querySelectorAll(settings.anchor2).length!=0&&document.querySelectorAll(settings.anchor3).length!=0) {
			console.log('page found');
				console.log('name is '+name);
				if(!document.querySelector(settings.anchor1+'[visited="true"]')){
					var ele=document.querySelector(settings.anchor1);
				ele.setAttribute('visited','true');
			window._val_global.init_page(name, settings);}
			}
}
);	
	 window.setTimeout(function () {
        window._val_global.apply_page_settings();
    }, 3000);
}
window._val_global.apply_page_settings();
window._val_global.init_page = function (name, settings) {

//Convert Employee Logic here
console.log('inside init with name '+name);
	if(name=="properties"){
        console.log('Properties page found');

$('input[name="name"]').on('focus', function () {
    console.log('Focused Project name');
    window._val_global.validateTextField('input[name="name"]', window._val_global.executeFunction, 'should give correct output', 'name-message');
});
}
  
}
// Convert to employee	
window._val_global['page_settings']['properties'] = {
     "anchor1": "[data-caid='section-body-Project Summary']"
	,"anchor2":"[label='Project ID']"
	,"anchor3": "[name='projectType']"
};