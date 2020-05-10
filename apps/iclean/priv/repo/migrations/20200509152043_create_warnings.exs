defmodule IClean.Repo.Migrations.CreateWarnings do
  use Ecto.Migration

  def change do
    create table(:warnings) do
      add :name, :string
      add :description, :string
      add :level, :integer
      add :instructions, :string

      timestamps()
    end

  end
end
