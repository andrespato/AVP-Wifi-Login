<?php
$random_hash = substr(md5(uniqid(rand(), true)), 16, 16);

echo $random_hash;

?>