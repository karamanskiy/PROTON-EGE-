<?php

if (!empty($_POST)) {

	$name = htmlspecialchars($_POST['name']);
	$tel = htmlspecialchars($_POST['tel']);


	$subject = 'Новая заявка с сайта - ПРОТОН';

	/* сообщение */
	$message = '
	<html>
	<head>
	<title>Новая заявка с сайта - ПРОТОН</title>
	</head>
	<body>' .
	(!empty($name) ? '<p><b>Имя:</b> ' . $name . '</p>' : '') .
	(!empty($tel) ? '<p><b>Телефон:</b> ' . $tel . '</p>' : '') .
	'<br/></body>
	</html>
	';

	$headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
	$headers .= "From: Sender <noreply@test.ru>\r\n"; //Наименование и почта отправителя

	mail('karamanskyi@gmail.com', $subject, $message, $headers);
	// mail('sk@aqbe.ru', $subject, $message, $headers);

}

?>