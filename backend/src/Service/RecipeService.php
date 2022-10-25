<?php declare(strict_types=1);

namespace App\Service;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;

class RecipeService
{
    public function __construct(private readonly RecipeRepository $recipeRepository)
    {
    }

    public function getRandomRecipe(): Recipe
    {
        // @todo: Exceptionhandling
        $qb = $this->recipeRepository->createQueryBuilder('recipe');
        $numberOfRecipes = $qb
            ->select('count(recipe.id)')
            ->getQuery()
            ->getSingleScalarResult();

        $randomRecipeId = random_int(1, $numberOfRecipes);

        return $this->recipeRepository->find($randomRecipeId);
    }
}

