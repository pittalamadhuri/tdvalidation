// validation starts here
function validateTextField(selector, validationFunction, errorMessage, errorIdentification) {

        var actualNode = document.querySelector(selector);
        var duplicateNode = actualNode.cloneNode();
    
        actualNode.parentNode.replaceChild(duplicateNode, actualNode);
        $(selector).focus();
    
        $(selector).on('keyup', function () {
    
            var errorIdentifier = $('#' + errorIdentification);
            if (validationFunction()) {
                actualNode.value = duplicateNode.value;
                duplicateNode.parentNode.replaceChild(actualNode, duplicateNode);
                triggerChange(actualNode);
                errorIdentifier.remove();
    
                $(this).focus();
                $(this).off('keyup');
            } else {
                if (errorIdentifier.length === 0) {
                    displayErrorMessage(errorMessage, selector, errorIdentification);
                }
            }
    
        })
    }
    
    // trigger a change event to save valid content
    function triggerChange(selector) {
        var evt = document.createEvent('KeyboardEvent');
        evt.initEvent('change', true, true);
        selector.dispatchEvent(evt);
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
        if ($('[id="name"]').val() === 'endgame') {
            return true
        } else {
            console.log('else executes ');
            return false
        }
    }
    
    $('[id="name"]').on('focus', function () {
        validateTextField('[id="name"]', executeFunction, 'should give correct output', 'name-message');
    });
