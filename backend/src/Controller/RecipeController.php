<?php declare(strict_types=1);

namespace App\Controller;

use App\DTO\IdToNameDTO;
use App\Entity\Recipe;
use App\Service\RecipeService;
use Doctrine\Common\Collections\ArrayCollection;
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
            $currentRecipeId = (int)$request->get("currentRecipe");
            $randomRecipe = $this->recipeService->getRandomRecipe($currentRecipeId);
        } catch (Exception $e) {
            return new JsonResponse($e);
        }

        return new JsonResponse($randomRecipe->jsonSerialize());
    }

    public function getRecipeNamesWithId(): JsonResponse
    {
        try {
            /**
             * @var Recipe $recipe
             */
            $recipes = array_map(
                function (Recipe $recipe): array {
                    $recipeId = $recipe->getId();
                    $recipeName = $recipe->getName();
                    $idToName = new IdToNameDTO($recipeId, $recipeName);
                    return $idToName->jsonSerialize();
                },
                $this->recipeService->getAllRecipes()
            );
        } catch (Exception $e) {
            return new JsonResponse($e);
        }

        return new JsonResponse($recipes);
    }

    public function addRecipe(Request $request): JsonResponse
    {
        try {
            $bodyContent = json_decode($request->getContent(), true);

            if ($bodyContent === null) {
                throw new Exception("Requestbody is null");
            }

            $recipe = new Recipe(
                $bodyContent["name"],
                $bodyContent['ingredients'],
                $bodyContent['instructions'],
                $bodyContent['vegetarian'],
                // TODO implement a proper solution for adding tags
                new ArrayCollection()
            );

            $this->recipeService->addRecipe($recipe);
        } catch (Exception $e) {
            return new JsonResponse($e->getMessage(), 500);
        }

        return new JsonResponse();
    }

    public function findRecipeIdByName(Request $request): JsonResponse
    {
        try {
            $searchName = $request->get("searchName");
            $results = $this->recipeService->findRecipeByName($searchName);
        } catch (Exception $e) {
            return new JsonResponse($e->getMessage(), 500);
        }
        $responseBody = [];

        foreach ($results as $recipe) {
            $id = $recipe->getId();
            $name = $recipe->getName();
            $returnObject = new IdToNameDTO($id, $name);
            $responseBody[] = $returnObject->jsonSerialize();
        }

        return new JsonResponse($responseBody);
    }

    public function findRecipeById(Request $request): JsonResponse
    {
        try {
            $currentRecipeId = (int)$request->get("recipeId");
            $result = $this->recipeService->findRecipeById($currentRecipeId);
        } catch (Exception $e) {
            return new JsonResponse($e->getMessage(), 500);
        }

        return new JsonResponse($result->jsonSerialize());
    }

    /**
     * @param Recipe $recipe
     * @return array<array<int, String>>
     */
    private function mapRecipesToNameAndId(Recipe $recipe): array
    {
        return array($recipe->getId(), $recipe->getName());
    }
}
