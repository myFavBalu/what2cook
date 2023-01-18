<?php declare(strict_types=1);

namespace App\Controller;

// @todo: einschränken
header("Access-Control-Allow-Origin: *");

use App\Entity\Recipe;
use App\Service\RecipeService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class RecipeController
{
    public function __construct(private readonly RecipeService $recipeService)
    {
    }

    public function getRecipe(): JsonResponse
    {
        $randomRecipe = $this->recipeService->getRandomRecipe();
        return new JsonResponse($randomRecipe->jsonSerialize());
    }


    public function addRecipe(Request $request): JsonResponse
    {
        // @todo: debug & finish as soon as intelliJ is available as an IDE
        $recipe = new Recipe(
            $request->get('name'), 
            $request->get('ingredients'), 
            $request->get('instructions'), 
            $request->get('vegetarian')
        );

        $this->recipeService->addRecipe($recipe);
        return new JsonResponse();
    }
};
