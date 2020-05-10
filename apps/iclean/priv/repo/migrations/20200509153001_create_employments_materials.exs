defmodule IClean.Repo.Migrations.CreateEmploymentsMaterials do
  use Ecto.Migration

  def change do
    create table(:employments_materials) do
      add :employment_id, references(:employments)
      add :material_id, references(:materials)
    end

    create unique_index(:employments_materials, [:employment_id, :material_id])
  end
end
