<?php

class helper
{

    public static function getUniqueId(string $prefix = '') : string
    {
        return strtolower(md5(uniqid($prefix, true) . time()));
    }

    public static function getIP() : string
    {
        return ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? ($_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'));
    }

}