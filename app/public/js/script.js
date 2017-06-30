document.getElementById("btn-inserir").onclick = function(){

	var nome = document.getElementById("nome").value;
	var endereco = document.getElementById("endereco").value;
	var numero = document.getElementById("numero").value;
	var bairro = document.getElementById("bairro").value;
	var cidade = document.getElementById("cidade").value;

	if (!ValidarNome(nome)){
		return;
	}
	
	var formData = new FormData();
	formData.append("nome", nome);
	formData.append("endereco", endereco);
	formData.append("numero", numero);
	formData.append("bairro", bairro);
	formData.append("cidade", cidade);
	
	var xhr = new XMLHttpRequest();
	
	//  xhr.onload 
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			var resposta = xhr.responseText;
			document.getElementById('mensagem').innerHTML = resposta;
			Localizar();
		}
	}

	
	xhr.open("POST", "https://ocapi.herokuapp.com/api");
	xhr.send(formData);		
		
}


document.getElementById("btn-alterar").onclick = function(){

	var id_cliente = document.getElementById("id_cliente").value;
	var nome = document.getElementById("nome").value;
	var endereco = document.getElementById("endereco").value;
	var numero = document.getElementById("numero").value;
	var bairro = document.getElementById("bairro").value;
	var cidade = document.getElementById("cidade").value;

	if (!ValidarID(id_cliente)) {
		return;
	}

	if (!ValidarNome(nome)){
		return;
	}

	var formData = new FormData();
	formData.append("nome", nome);
	formData.append("endereco", endereco);
	formData.append("numero", numero);
	formData.append("bairro", bairro);
	formData.append("cidade", cidade);

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			var resposta = xhr.responseText;
			document.getElementById('mensagem').innerHTML = resposta;
			Localizar();
		}
	}

	xhr.open("PUT", "https://ocapi.herokuapp.com/api/" + id_cliente);
	xhr.send(formData);			
		
}


document.getElementById("btn-excluir").onclick = function(){

	var id_cliente = document.getElementById("id_cliente").value;

	if (!ValidarID(id_cliente)){
		return ;
	}

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			var resposta = xhr.responseText;
			document.getElementById('mensagem').innerHTML = resposta;
			document.getElementById("id_cliente").value = "";
			Localizar();
		}
	}

	xhr.open("DELETE", "https://ocapi.herokuapp.com/api/" + id_cliente);
	xhr.send();					
	
}


document.getElementById("btn-localizar").onclick = function(){	
	document.getElementById('mensagem').innerHTML="";
	Localizar();
}


function Localizar(){	

	var id_cliente = document.getElementById("id_cliente").value;
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			var resposta = xhr.responseText;

			var table_body = $('#tabretorno tbody');
			table_body.html('');

			$.each(JSON.parse(resposta), function(key, value) {
				table_body.append('<tr>' +
					'<td class = "id_cliente">' + value.Id_Cliente + '</td>' +
					'<td class = "nome">' + value.Nome + '</td>' +
				 	'<td class = "endereco">' + value.Endereco + '</td>' +
					'<td class = "numero">' + value.Numero + '</td>' +
					'<td class = "bairro">' + value.Bairro + '</td>' +
					'<td class = "cidade">' + value.Cidade + '</td>' +
					'</tr>');
			});
		}
	}

	xhr.open("GET", "https://ocapi.herokuapp.com/api/" + id_cliente);
	xhr.send();		
}


function ValidarID (obj){
	if ($.isNumeric(obj)){		
		return true;
	}
	else{
		document.getElementById('mensagem').innerHTML = "ID inválido!";
	}
}

function ValidarNome (obj){
	if (obj.length > 0){
		return true;
	}
	else{
		document.getElementById('mensagem').innerHTML = "Nome inválido!";
	}
}


$(function(){
    $(document).on('dblclick', '#tabretorno tbody tr', function(e) {
        document.getElementById("id_cliente").value = $(this).find('.id_cliente').text();
        document.getElementById("nome").value = $(this).find('.nome').text();
        document.getElementById("endereco").value = $(this).find('.endereco').text();
        document.getElementById("numero").value = $(this).find('.numero').text();
        document.getElementById("bairro").value = $(this).find('.bairro').text();
        document.getElementById("cidade").value = $(this).find('.cidade').text();
    });
});