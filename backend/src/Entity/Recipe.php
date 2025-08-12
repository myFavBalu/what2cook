<?php

namespace App\Entity;

use App\Repository\RecipeRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\ManyToMany;
use JetBrains\PhpStorm\ArrayShape;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private readonly int $id;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 999999)]
    private string $ingredients;

    #[ORM\Column(length: 999999)]
    private string $instructions;

    #[ORM\Column]
    private bool $vegetarian;

    /**
     * @var Collection<int, Tag>
     */
    #[ManyToMany(targetEntity: Tag::class, inversedBy: 'recipes')]
    #[JoinTable(name: 'recipes_tags')]
    private Collection $tags;

    /**
     * @param string $name
     * @param string $ingredients
     * @param string $instructions
     * @param bool $vegetarian
     * @param Collection<int, Tag> $tags
     */
    public function __construct(string $name, string $ingredients, string $instructions, bool $vegetarian, Collection $tags)
    {
        $this->name = $name;
        $this->ingredients = $ingredients;
        $this->instructions = $instructions;
        $this->vegetarian = $vegetarian;
        $this->tags = $tags;
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

    public function getIngredients(): string
    {
        return $this->ingredients;
    }

    public function setIngredients(string $ingredients): void
    {
        $this->ingredients = $ingredients;
    }

    public function getInstructions(): string
    {
        return $this->instructions;
    }

    public function setInstructions(string $instructions): void
    {
        $this->instructions = $instructions;
    }

    public function isVegetarian(): bool
    {
        return $this->vegetarian;
    }

    public function setVegetarian(bool $vegetarian): void
    {
        $this->vegetarian = $vegetarian;
    }

    public function getTags(): Collection
    {
        return $this->tags;
    }

    /**
     * @param Collection<int, Tag> $tags
     **/
    public function setTags(Collection $tags): void
    {
        foreach ($tags as $tag) {
            $tag->addRecipe($this);
        }

        $this->tags = $tags;
    }

    public function addTag(Tag $tag): void
    {
        if (!$this->tags->contains($tag)) {
            $tag->addRecipe($this);
            $this->tags->add($tag);
        }
    }

    #[ArrayShape(['id' => "int", 'name' => "string", 'ingredients' => "string", 'instructions' => "string", 'vegetarian' => "bool", 'tags' => 'array<int, array{id: int, name: string}>'])]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'ingredients' => $this->ingredients,
            'instructions' => $this->instructions,
            'vegetarian' => $this->vegetarian,
            'tags' => $this->tags->map(fn(Tag $tag) => $tag->jsonSerialize())->toArray()
        ];
    }
}
