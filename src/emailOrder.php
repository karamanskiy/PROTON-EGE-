<?php

if (!empty($_POST)) {

	$name = htmlspecialchars($_POST['name']);
	$tel = htmlspecialchars($_POST['tel']);
	$time = htmlspecialchars($_POST['time']);
	// $data_obrab = htmlspecialchars($_POST['data_obrab']);


	$subject = 'Новая заявка с сайта - Центр Рекламы';

	/* сообщение */
	$message = '
	<html>
	<head>
	<title>Новая заявка с сайта - Центр Рекламы</title>
	</head>
	<body>' .
	(!empty($name) ? '<p><b>Имя:</b> ' . $name . '</p>' : '') .
	(!empty($tel) ? '<p><b>Телефон:</b> ' . $tel . '</p>' : '') .
	(!empty($time) ? '<p><b>Удобное время звонка:</b> ' . $time . '</p>' : '') .
	'<p><b>Согласен/на на обработку данных.</b></p>' .
	// (!empty($data_obrab) ? '<p><b>Согласие на обработку:</b> ' . $data_obrab . '</p>' : '') .
	'<br/></body>
	</html>
	';

	$headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
	$headers .= "From: Sender <noreply@test.ru>\r\n"; //Наименование и почта отправителя

	mail('karamanskyi@gmail.com', $subject, $message, $headers);
	// mail('sk@aqbe.ru', $subject, $message, $headers);

}

?>