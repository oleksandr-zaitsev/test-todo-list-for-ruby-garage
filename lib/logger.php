<?php

class logger
{

    public static function write($msg, string $filename)
    {
        $msg = self::prepare($msg);
        $filename = LOGS_PATH . $filename .'_' . date('Ymd') . '.log';
        file_put_contents($filename, $msg, FILE_APPEND | LOCK_EX);
    }

    public static function debug($str)
    {
        self::write($str, 'debugger');
    }

    private static function prepare($msg) : string
    {
        $text = (is_array($msg) ? json_encode($msg) : trim(preg_replace('/\s+/', ' ', $msg)));
        $text .= PHP_EOL . 'ip: ' . helper::getIP();
        $text .= PHP_EOL . 'request: ' . json_encode(registry::getData('REQUEST'));
        return date('H:i:s') . PHP_EOL . $text . PHP_EOL . '-------------------' . PHP_EOL;
    }

}