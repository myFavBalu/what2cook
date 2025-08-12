<?php declare(strict_types=1);

namespace App\Service;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Exception;

class RecipeService
{
    public function __construct(private readonly RecipeRepository $recipeRepository)
    {
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     * @throws Exception
     */
    public function getRandomRecipe(int $currentRecipeId): Recipe
    {
        $listOfRecipeIds = $this->recipeRepository->getAllIds();

        if (in_array($currentRecipeId, $listOfRecipeIds)) {
            $listOfRecipeIds = array_values(array_filter($listOfRecipeIds, fn($n) => $n != $currentRecipeId));
        }

        $randomRecipeId = $listOfRecipeIds[random_int(0, sizeof($listOfRecipeIds) - 1)];

        return $this->recipeRepository->find($randomRecipeId);
    }

    /**
     * @return array<Recipe>
     */
    public function getAllRecipes(): array
    {
       return $this->recipeRepository->getAllRecipes();
    }

    /**
     * @param Recipe $newRecipe
     * @return void
     * @throws Exception
     */
    public function addRecipe(Recipe $newRecipe): void
    {
       $this->recipeRepository->save($newRecipe, true);
    }

    /**
     * @param string $searchName
     * @return array<Recipe>
     */
    public function findRecipesByName(string $searchName): array
    {
      return $this->recipeRepository->findRecipesByName($searchName);
    }

    public function findRecipeById(int $currentRecipeId): Recipe
    {
        return $this->recipeRepository->find($currentRecipeId);
    }
}
