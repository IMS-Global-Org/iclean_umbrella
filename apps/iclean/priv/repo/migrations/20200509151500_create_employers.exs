defmodule IClean.Repo.Migrations.CreateEmployers do
  use Ecto.Migration

  def change do
    create table(:employers) do
      add :organization, :string
      add :description, :string
      add :type, :string

      timestamps()
    end

  end
end
