defmodule IClean.Repo.Migrations.CreateEquipment do
  use Ecto.Migration

  def change do
    create table(:equipment) do
      add :name, :string
      add :description, :string
      add :quantity, :integer
      add :operator_license, :boolean, default: false, null: false
      add :cost, :float

      timestamps()
    end

  end
end
