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
            ->select('recipe.id')
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * @param string[] $tagNames
     * @return Recipe[]
     */
    public function getAllRecipes(array $tagNames): array
    {
        $qb = $this->createQueryBuilder('recipe')
            ->select('DISTINCT recipe')
            ->leftJoin('recipe.tags', 'tag')
            ->addSelect('tag')
            ->orderBy('recipe.name', 'ASC');

        if (!empty($tagNames)) {
            $qb->andWhere('tag.name IN (:tagNames)')
                ->setParameter('tagNames', $tagNames);
        }

        return $qb->getQuery()->getResult();
    }

    /**
     * @return Recipe[]
     */
    public function findRecipesByName(string $searchword): array
    {
        $searchTerm = "%" . $searchword . "%";
        $qb = $this->createQueryBuilder('recipe');
        $query = $qb->where("recipe.name LIKE :name")->setParameter("name", $searchTerm)->getQuery();
        return $query->getResult();
    }
}
