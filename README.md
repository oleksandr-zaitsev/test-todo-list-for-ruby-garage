# add following rows to php-fpm.conf
# /var/www/ - should be replaced with the real path to project directory

php_value[auto_prepend_file] = /var/www/garage/bootstrap.php<br>
php_value[include_path] = /var/www/garage/app/:/var/www/garage/lib/<br>
