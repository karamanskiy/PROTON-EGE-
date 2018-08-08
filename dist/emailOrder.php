<?php

if (!empty($_POST)) {

	$name = htmlspecialchars($_POST['name']);
	$tel = htmlspecialchars($_POST['tel']);
	$class_obucheniya = htmlspecialchars($_POST['class_obucheniya']);
	$predmet_obucheniya = htmlspecialchars($_POST['predmet_obucheniya']);
	$aim_obucheniya = htmlspecialchars($_POST['aim_obucheniya']);
	$class_obuch = htmlspecialchars($_POST['class_obuch']);
	$predmet_obuch = htmlspecialchars($_POST['predmet_obuch']);
	$aim_obuch = htmlspecialchars($_POST['aim_obuch']);


	$subject = 'Новая заявка с сайта - ПРОТОН';

	if(strlen($class_obuch) < 5) {
		$class_obuch = '';
	}

	/* сообщение */
	$message = '
	<html>
	<head>
	<title>Новая заявка с сайта - ПРОТОН</title>
	</head>
	<body>' .
	(!empty($name) ? '<p><b>Имя:</b> ' . $name . '</p>' : '') .
	(!empty($tel) ? '<p><b>Телефон:</b> ' . $tel . '</p>' : '') .

	(!empty($class_obucheniya) ? '<p><b>Класс обучения:</b> ' . $class_obucheniya . '</p>' : '') .
	(!empty($class_obuch) ? '<p><b>Класс обучения:</b> ' . $class_obuch . '</p>' : '') .

	(!empty($predmet_obucheniya) ? '<p><b>Предмет обучения:</b> ' . $predmet_obucheniya . '</p>' : '') .
	(!empty($predmet_obuch) ? '<p><b>Предмет обучения:</b> ' . $predmet_obuch . '</p>' : '') .

	(!empty($aim_obucheniya) ? '<p><b>Цель обучения:</b> ' . $aim_obucheniya . '</p>' : '') .
	(!empty($aim_obuch) ? '<p><b>Цель обучения:</b> ' . $aim_obuch . '</p>' : '') .
	'<br/></body>
	</html>
	';

	$headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
	$headers .= "From: Sender <noreply@test.ru>\r\n"; //Наименование и почта отправителя

	mail('karamanskyi@gmail.com', $subject, $message, $headers);
	// mail('sk@aqbe.ru', $subject, $message, $headers);

}

?>