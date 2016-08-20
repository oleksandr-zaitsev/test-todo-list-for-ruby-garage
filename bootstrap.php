<?php

function __autoload($class_name){
    require_once "$class_name.php";
}

define('ROOT_PATH',     '/app/');
define('LOGS_PATH',     ROOT_PATH . 'logs/');
define('APP_PATH',      ROOT_PATH . 'app/');
define('LIB_PATH',      ROOT_PATH . 'lib/');

preg_match(
    '/postgres:\/\/([^:]+):([^@]+)@([^\/:]+):(\d+)\/(\w+)/',
    ($_SERVER['DATABASE_URL'] ?? ''),
    $matches
);

define('DB_SCHEMA',     'public');
define('DB_LOGIN',      ($matches[1] ?? ''));
define('DB_PASSWORD',   ($matches[2] ?? ''));
define('DB_HOST',       ($matches[3] ?? ''));
define('DB_PORT',       ($matches[4] ?? ''));
define('DB_NAME',       ($matches[5] ?? ''));

define('EMAIL_PATTERN', '/^[-a-z0-9~!$%^&*_=+}{\'?]+(?:\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(?:[a-z0-9_][-a-z0-9_]*(?:\.[-a-z0-9_]+)*\.(?:aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|(?:[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(?:[0-9]{1,5})?$/i');




