<?php

use App\Kernel;

umask(0000);

header("Access-Control-Allow-Origin: *");

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
