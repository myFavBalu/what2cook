<?php

namespace App\Repository;

use App\Entity\Recipe;
use App\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Tag>
 *
 * @method Tag|null find($id, $lockMode = null, $lockVersion = null)
 * @method Tag|null findOneBy(array $criteria, array $orderBy = null)
 * @method Tag[]    findAll()
 * @method Tag[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TagRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tag::class);
    }

    public function save(Tag $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Tag $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Recipe[]
     */
    public function getAllTags(): array
    {
        $qb = $this->createQueryBuilder('tag');

        /**
         * @var Recipe[] $listOfRecipes
         */
        return $qb
            ->orderBy('tag.name')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Recipe[]
     */
    public function findTagsByName(string $searchword): array
    {
        $searchTerm = "%" . $searchword . "%";
        $qb = $this->createQueryBuilder('tag');
        $query = $qb->where("tag.name LIKE :name")->setParameter("name", $searchTerm)->getQuery();
        return $query->getResult();
    }
}
