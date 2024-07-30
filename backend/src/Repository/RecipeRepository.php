<?php

namespace App\Repository;

use App\Entity\Recipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Recipe>
 *
 * @method Recipe|null find($id, $lockMode = null, $lockVersion = null)
 * @method Recipe|null findOneBy(array $criteria, array $orderBy = null)
 * @method Recipe[]    findAll()
 * @method Recipe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecipeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recipe::class);
    }

    public function save(Recipe $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Recipe $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int[]
     */
    public function getAllIds(): array
    {
        $qb = $this->createQueryBuilder('recipe');

        /**
         * @var int[] $listOfRecipeIds
         */
        return $qb
            ->select('id')
            ->from('recipe', 'r')
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * @return Recipe[]
     */
    public function getAllRecipes(): array
    {
        $qb = $this->createQueryBuilder('recipe');

        /**
         * @var Recipe[] $listOfRecipes
         */
        return $qb
            ->orderBy('recipe.name')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Recipe[]
     */
    public function findRecipeByName(string $searchword): array
    {
        $searchTerm = "%" . $searchword . "%";
        $qb = $this->createQueryBuilder('recipe');
        $query = $qb->where("recipe.name LIKE :name")->setParameter("name", $searchTerm)->getQuery();
        return $query->getResult();
    }
}
