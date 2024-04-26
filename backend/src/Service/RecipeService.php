<?php declare(strict_types=1);

namespace App\Service;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use Doctrine\ORM\Mapping\OrderBy;
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
        // @todo: Exceptionhandling
        $qb = $this->recipeRepository->createQueryBuilder('recipe');

        /**
         * @var int[] $listOfRecipeIds
         */
        $listOfRecipeIds = $qb
            ->select('recipe.id')
            ->getQuery()
            ->getArrayResult();

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
        $qb = $this->recipeRepository->createQueryBuilder('recipe');

        /**
         * @var Recipe[] $listOfRecipes
         */
        return $qb
            ->orderBy('recipe.name')
            ->getQuery()
            ->getResult();
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
        $qb = $this->recipeRepository->createQueryBuilder('recipe');
        $query = $qb->where("recipe.name LIKE :name")->setParameter("name", $searchTerm)->getQuery();
        return $query->getResult();
    }

    public function findRecipeById(int $currentRecipeId): Recipe
    {
        return $this->recipeRepository->find($currentRecipeId);
    }
}
