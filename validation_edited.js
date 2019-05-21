window._val_global = {};
window._val_global['page_settings'] = {} ;
var validation_flag=false;
console.log('start');

function LN_SaveBtn_Validate() {
    //Main Condition to enable and disable Save, Save and return buttons
    if (validation_flag == false) {
        $('[class*="ppm_button_bar"] button:contains("Save")').attr("disabled", "disabled");
    } else {
        $('[class*="ppm_button_bar"] button:contains("Save")').removeAttr("disabled");
    }
}

function validate(){
if($('[class*="letznav-validation-indicator__icon--error"]').length>0){
validation_flag = false;
LN_SaveBtn_Validate();
}
else{
validation_flag = true;
LN_SaveBtn_Validate();
}
}

window.onload=function()
{
    window.addEventListener('click',function(event)
{setTimeout(validate(),2000);
});}
