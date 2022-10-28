<?php declare(strict_types=1);

namespace App\Controller;

// @todo: einschränken
header("Access-Control-Allow-Origin: *");

use App\Service\RecipeService;
use Symfony\Component\HttpFoundation\JsonResponse;

class RecipeController
{
    public function __construct(private readonly RecipeService $recipeService)
    {
    }

    public function getRecipe(): JsonResponse
    {
        $test = $this->recipeService->getRandomRecipe();
        return new JsonResponse($test->jsonSerialize());
    }
}

