<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class TemplateController
{
    public function templatePage(): Response {
        return new Response("test");
    }

    public function templateJson(): JsonResponse {
        return new JsonResponse("test");
    }
}

