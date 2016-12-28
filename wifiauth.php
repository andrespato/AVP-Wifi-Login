<?php
$random_hash = substr(md5(uniqid(rand(), true)), 5, 5);

echo $random_hash;

?>
