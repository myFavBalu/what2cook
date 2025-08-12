<?php declare(strict_types=1);

namespace App\Service;

use App\Entity\Tag;
use App\Repository\TagRepository;
use Exception;

class TagService
{
    public function __construct(private readonly TagRepository $tagRepository)
    {
    }

    /**
     * @return array<Tag>
     */
    public function getAllTags(): array
    {
        return $this->tagRepository->getAllTags();
    }

    /**
     * @param Tag $tag
     * @return void
     * @throws Exception
     */
    public function addTag(Tag $tag): void
    {
        $this->tagRepository->save($tag, true);
    }

    /**
     * @param string $searchName
     * @return array<Tag>
     */
    public function findTagsByName(string $searchName): array
    {
        return $this->tagRepository->findTagsByName($searchName);
    }

    public function findTagByExactName(string $name)
    {
        return $this->tagRepository->findOneBy(['name' => $name]);
    }

    public function findTagById(int $currentRecipeId): Tag
    {
        return $this->tagRepository->find($currentRecipeId);
    }
}
