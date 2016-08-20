<?php

class registry
{

    private static $instance;
    private $data_archive = [];

    private function __construct()
    {
    }

    public static function setData(string $key, $val) : bool
    {
        $instance = self::getInstance();
        if (!$instance->getData($key)) {
            $instance->data_archive[$key] = $val;
            return true;
        }
        return false;
    }

    private static function getInstance() : self
    {
        if (empty(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public static function getData(string $key)
    {
        $instance = self::getInstance();
        return $instance->data_archive[$key] ?? null;
    }

}