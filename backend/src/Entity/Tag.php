<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToMany;
use JetBrains\PhpStorm\ArrayShape;

#[ORM\Entity(repositoryClass: TagRepository::class)]
class Tag
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private readonly int $id;

    #[ORM\Column(length: 255)]
    private string $name;

    /**
     * @var Collection<int, Recipe>
     */
    #[ManyToMany(targetEntity: Recipe::class, mappedBy: 'tags')]
    private Collection $recipes;

    /**
     * @param string $name
     */
    public function __construct(string $name)
    {
        $this->name = $name;
        $this->recipes = new ArrayCollection([]);
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return  Collection<int, Recipe>
     **/
    public function getRecipes(): Collection
    {
        return $this->recipes;
    }

    /**
     * @param Collection<int, Recipe> $recipes
     **/
    public function setRecipes(Collection $recipes): void
    {
        $this->recipes = $recipes;
    }

    public function addRecipe(Recipe $recipe): void
    {
        if (!$this->recipes->contains($recipe)) {
            $this->recipes->add($recipe);
        }
    }

    #[ArrayShape(['id' => "int", 'name' => "string"])]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
