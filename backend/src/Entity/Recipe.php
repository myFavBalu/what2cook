<?php

namespace App\Entity;

use App\Repository\RecipeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use http\Exception;
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
    private bool $vegetarian = true;

    /**
     * @param string $name
     * @param string $ingredients
     * @param string $instructions
     * @param bool $vegetarian
     */
    public function __construct(string $name, string $ingredients, string $instructions, bool $vegetarian)
    {
        $this->name = $name;
        $this->ingredients = $ingredients;
        $this->instructions = $instructions;
        $this->vegetarian = $vegetarian;
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

    #[ArrayShape(['id' => "int", 'name' => "string", 'ingredients' => "string", 'instructions' => "string", 'vegetarian' => "bool"])]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'ingredients' => $this->ingredients,
            'instructions' => $this->instructions,
            'vegetarian' => $this->vegetarian,
        ];
    }
}
