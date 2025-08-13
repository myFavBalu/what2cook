<?php declare(strict_types=1);

namespace App\Controller;

use App\DTO\IdToNameDTO;
use App\Entity\Recipe;
use App\Entity\Tag;
use App\Request\AddRecipeRequest;
use App\Service\RecipeService;
use App\Service\TagService;
use Doctrine\Common\Collections\ArrayCollection;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


class RecipeController extends AbstractController
{
    public function __construct(
        private readonly RecipeService $recipeService,
        private readonly TagService    $tagService)
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

    /**
     * @throws Exception
     */
    public function addRecipe(#[MapRequestPayload] AddRecipeRequest $request): JsonResponse
    {
        $tags = new ArrayCollection();

        $requestTags = $request->getTags();
        foreach (array_unique($requestTags, SORT_REGULAR) as $tag) {
            $existingTag = $this->tagService->findTagByExactName($tag->getName());

            if (!$existingTag) {
                $existingTag = new Tag($tag->getName());
                $this->tagService->addTag($existingTag);
            }

            $tags->add($existingTag);
        }

        $recipe = new Recipe(
            $request->getName(),
            $request->getIngredients(),
            $request->getInstructions(),
            $tags
        );

        $this->recipeService->addRecipe($recipe);

        return new JsonResponse();
    }

    public function findRecipeIdByName(Request $request): JsonResponse
    {
        try {
            $searchName = $request->get("searchName");
            $results = $this->recipeService->findRecipesByName($searchName);
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
