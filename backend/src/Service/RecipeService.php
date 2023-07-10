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
    public function getRandomRecipe(?int $currentRecipeId): Recipe
    {
        // @todo: Exceptionhandling
        $qb = $this->recipeRepository->createQueryBuilder('recipe');
        $numberOfRecipes = $qb
            ->select('count(recipe.id)')
            ->getQuery()
            ->getSingleScalarResult();

        $randomRecipeId = random_int(1, $numberOfRecipes);

        if ($currentRecipeId !== null) {
            while ($randomRecipeId === (int)$currentRecipeId) {
                $randomRecipeId = random_int(1, $numberOfRecipes);
            }
        }

        return $this->recipeRepository->find($randomRecipeId);
    }

    /**
     * @param Recipe $newRecipe
     * @return void
     * @throws Exception
     */
    public function addRecipe(Recipe $newRecipe): void
    {
        $em = $this->recipeRepository->createQueryBuilder('recipe')->getEntityManager();
        $em->persist($newRecipe);
        $em->flush();
    }

    /**
     * @param string $searchName
     * @return array<Recipe>
     */
    public function findRecipeByName(string $searchName): array
    {
        $searchTerm = "%" . $searchName . "%";
        $em = $this->recipeRepository->createQueryBuilder('recipe');
        $query = $em->where("recipe.name LIKE :name")->setParameter("name", $searchTerm)->getQuery();
        return $query->getResult();
    }

    public function findRecipeById(int $currentRecipeId): Recipe
    {
        return $this->recipeRepository->find($currentRecipeId);
    }
}
