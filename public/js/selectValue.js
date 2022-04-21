let active_line_index = 1;

function get_active_line()
{
	let fields_path = "#line-" + active_line_index + " .block";
	let fields = document.querySelectorAll(fields_path);
	return (fields);
}

function get_empty_field()
{
	let fields = get_active_line();
	for (let i = 0; i < fields.length; i++)
	{
		if (fields[i].innerHTML.length == 0)
			return fields[i];
	}
	return (fields[fields.length - 1]);
}

function get_last_field()
{
	let fields = get_active_line();
	for (let i = 0; i < fields.length; i++)
	{
		if (i + 1 >= fields.length|| fields[i + 1].innerHTML.length == 0)
			return fields[i];
	}
	return (fields[fields.length - 1]);
}

function reset()
{
	for (active_line_index = 1; active_line_index <= 4; active_line_index++)
	{
		let fields = get_active_line();
		for (var i = 0; i < fields.length; i++)
			fields[i].innerHTML = "";
	}
	active_line_index = 1;
}
function write_hint(hint)
{
	let fields = get_active_line();
	for (var i = 0; i < fields.length; i++)
		fields[i].innerHTML = hint[i];
	active_line_index += 1;
}

function check_equation()
{
	let equation = "";
	let fields = get_active_line();
	for (var i = 0; i < fields.length; i++)
		equation += fields[i].innerHTML;
	fetch("http://localhost:8080/check-equation", {
		headers: {
			'Content-Type': 'application/json',
		},
		method: "POST",
		body: JSON.stringify({equation})
	}).then(function (response){
		return (response.json());
	}).then(function (response){
		write_hint(response.hint)
	})
}

function selectValue(event)
{
	if (active_line_index == 5)
		reset();
	let value = event.target.innerHTML;
	if (value == "=")
		return check_equation();;
	let empty_field = get_empty_field();
	let last_field = get_last_field();
	if (value == "c")
		last_field.innerHTML = "";
	else
		empty_field.innerHTML = value;
}
