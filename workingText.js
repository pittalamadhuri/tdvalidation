// validation starts here
function validateTextField(selector, validationFunction, errorMessage, errorIdentification) {

        var actualNode = document.querySelector(selector);
        var duplicateNode = actualNode.cloneNode();
    
        actualNode.parentNode.replaceChild(duplicateNode, actualNode);
        $(selector).focus();
    
        $(selector).on('blur', function () {
    
            var errorIdentifier = $('#' + errorIdentification);
            if (validationFunction()) {
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
    
    // trigger a change event to save valid content
    function triggerChange(selector, dupSelector) {
        console.log('Trigger change executed');
        var evt = document.createEvent('KeyboardEvent');
        evt.initEvent('change', true, true);
        selector.dispatchEvent(evt);
        var evt2 = document.createEvent('KeyboardEvent');
        evt2.initEvent('blur', true, true);
        selector.dispatchEvent(evt2);
        }
    
    // to display error message
    function displayErrorMessage(errorMessage, selector, errorIdentification) {
        var mess = errorMessage;
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = mess ;
        errorMessage.setAttribute('style', 'color:red');
        errorMessage.setAttribute('id', errorIdentification);
        $(errorMessage) .insertAfter(selector)
    }
    
    // sample implementation can implement your own validations
    function executeFunction() {
        var inputText=$('input[name="name"]').val();
        if (/PRJ-.+/.test(inputText)) {
            return true
        } else {
            console.log('else executes ');
            return false
        }
    }
    
    function starter(){  
        console.log('starter function');
            if(!$('input[name="name"]').is(":visible")){
                window.setTimeout(starter, 100);
            }
            else{
            $('input[name="name"]').on('focus', function () {
                validateTextField('input[name="name"]', executeFunction, 'Format must be: PRJ-Project name', 'name-message');
            }); 
        }
        }
        
            starter();
