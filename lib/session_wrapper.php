<?php

class session_wrapper
{

    private static $instance;

    private function __construct() {}

    public static function getInstance() : self
    {
        if (!isset(self::$instance)) {
            session_start();
            self::$instance = new self();
        }

        return self::$instance;
    }

    public static function set(string $name, $value)
    {
        self::getInstance();
        $_SESSION[$name] = defender::clear($value, defender::INPUT);
    }

    public static function get(string $name)
    {
        self::getInstance();
        return defender::clear($_SESSION[$name] ?? null, defender::OUTPUT);
    }

    public static function getSessionId()
    {
        self::getInstance();
        return session_id();
    }

    public static function destroySession()
    {
        self::getInstance();
        session_destroy();
        unset($_SESSION);
    }

}