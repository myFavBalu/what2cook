<?php declare(strict_types=1);

namespace App\Controller;

// @todo: einschränken
header("Access-Control-Allow-Origin: *");

use App\Entity\Recipe;
use App\Service\RecipeService;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class RecipeController
{
    public function __construct(private readonly RecipeService $recipeService)
    {
    }

    public function getRecipe(Request $request): JsonResponse
    {
        try {
            $currentRecipeId = $request->get("currentRecipe");
            $randomRecipe = $this->recipeService->getRandomRecipe($currentRecipeId);
        } catch (Exception $e) {
            return new JsonResponse($e);
        }

        return new JsonResponse($randomRecipe->jsonSerialize());
    }

    public function addRecipe(Request $request): JsonResponse
    {
        $bodyContent = json_decode($request->getContent(), true);

        $recipe = new Recipe(
            $bodyContent["name"],
            $bodyContent['ingredients'],
            $bodyContent['instructions'],
            $bodyContent['vegetarian']
        );

        $this->recipeService->addRecipe($recipe);
        return new JsonResponse();
    }
}

;
