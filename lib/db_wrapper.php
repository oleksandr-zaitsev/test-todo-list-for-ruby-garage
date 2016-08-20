<?php

class db_wrapper
{

    private static $instance;
    private static $resource;
    private static $transaction_started;

    private function __construct()
    {
    }

    public static function beginTransaction()
    {
        $self = self::getInstance();
        validator::validate(!self::$transaction_started, 'previous transaction is not closed', 500);
        self::$transaction_started = true;
        $self->query('START TRANSACTION;');
    }

    public static function query(string $sql, array $params = []) : array
    {
        $self = self::getInstance();

        if(count($params) > 0){
            $escaped = [];
            foreach($params as $value){
                $escaped[] = pg_escape_string(self::$resource, $value);
            }
            $params = $escaped;
        }

        @pg_prepare(self::$resource, '', $sql);
        $result_resource = @pg_execute(self::$resource, '', $params);

        $error = pg_last_error(self::$resource);
        if (!is_resource($result_resource) && $error) {
            if (self::$transaction_started) {
                $self->rollbackTransaction();
            }
            validator::validate(false, "PGS_ERROR; {$error}; sql: {$sql}", 500);
        }

        $result = pg_fetch_all($result_resource);
        return !is_array($result) ? [] : defender::clear($result, defender::OUTPUT);
    }

    public static function rollbackTransaction()
    {
        $self = self::getInstance();
        validator::validate(self::$transaction_started, 'transaction is not running', 500);
        $self->query('ROLLBACK TRANSACTION;');
        self::$transaction_started = false;
    }

    public static function commitTransaction()
    {
        $self = self::getInstance();
        validator::validate(self::$transaction_started, 'transaction is not running', 500);
        $self->query('COMMIT TRANSACTION;');
        self::$transaction_started = false;
    }

    private function openConnection()
    {
        $connection_string = "host=" . DB_HOST . " port=" . DB_PORT . " dbname=" . DB_NAME . " user=" . DB_LOGIN . " password=" . DB_PASSWORD;
        self::$resource = pg_connect($connection_string);
        validator::validate(is_resource(self::$resource), 'unable to connect to database', 500);
        pg_set_error_verbosity(self::$resource, PGSQL_ERRORS_VERBOSE);
        if (pg_connection_status(self::$resource) !== PGSQL_CONNECTION_OK) {
            validator::validate(pg_connection_reset(self::$resource), 'unable to reset connection to database', 500);
        }
    }

    private static function getInstance() : self
    {
        if (empty(self::$instance)) {
            self::$instance = new static();
            self::$instance->openConnection();
        }
        return self::$instance;
    }

    public static function getResource() : resource
    {
        self::getInstance();
        return self::$resource;
    }

    public function __destruct()
    {
        $this->closeConnection();
    }

    private function closeConnection()
    {
        if (is_resource(self::$resource)) {
            pg_close(self::$resource);
        }
    }

}