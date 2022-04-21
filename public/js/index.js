/**
 * 
 * 	Registrar eventos para o Keyboard
 * 
 */
let buttons = document.getElementsByClassName("keyboard-box");
for(var i = 0; i < buttons.length; i++)
{
	buttons[i].addEventListener("click", selectValue);
}