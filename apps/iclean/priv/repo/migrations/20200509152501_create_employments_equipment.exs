defmodule IClean.Repo.Migrations.CreateEmploymentsEquipment do
  use Ecto.Migration

  def change do
    create table(:employments_equipment) do
      add :employment_id, references(:employments)
      add :equipment_id, references(:equipment)
    end

    create unique_index(:employments_equipment, [:employment_id, :equipment_id])
  end
end
