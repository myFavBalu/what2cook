<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221025154612 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__recipe AS SELECT id, name, ingredients, instructions, vegetarian FROM recipe');
        $this->addSql('DROP TABLE recipe');
        $this->addSql('CREATE TABLE recipe (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, ingredients CLOB NOT NULL, instructions CLOB NOT NULL, vegetarian BOOLEAN NOT NULL)');
        $this->addSql('INSERT INTO recipe (id, name, ingredients, instructions, vegetarian) SELECT id, name, ingredients, instructions, vegetarian FROM __temp__recipe');
        $this->addSql('DROP TABLE __temp__recipe');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__recipe AS SELECT id, name, ingredients, instructions, vegetarian FROM recipe');
        $this->addSql('DROP TABLE recipe');
        $this->addSql('CREATE TABLE recipe (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, ingredients CLOB NOT NULL --(DC2Type:array)
        , instructions CLOB NOT NULL, vegetarian BOOLEAN NOT NULL)');
        $this->addSql('INSERT INTO recipe (id, name, ingredients, instructions, vegetarian) SELECT id, name, ingredients, instructions, vegetarian FROM __temp__recipe');
        $this->addSql('DROP TABLE __temp__recipe');
    }
}
