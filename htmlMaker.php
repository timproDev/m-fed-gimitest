<?php  
$pages = array	(	                
                "article-page.html"
				);
$urls = array();
$i = 0;

foreach($pages as $page) {
	$actual_link = "http://$_SERVER[HTTP_HOST]/";
	$url = $actual_link . $page;
	print $url;
	$Data = get_data($url);
	$File = $page;
	$Handle = fopen($File, 'w'); 
	fwrite($Handle, $Data);
	fclose($Handle);
	print " = Loop = " . $i . "<br>";
	$i++;
}

function get_data($url) {
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);    
	$data = curl_exec($ch);
    //
    $info = curl_getinfo($ch);
    //output the data to get more information.
    print_r($info);
    //
	curl_close($ch);
	return $data;
}
?>