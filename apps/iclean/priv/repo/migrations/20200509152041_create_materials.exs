defmodule IClean.Repo.Migrations.CreateMaterials do
  use Ecto.Migration

  def change do
    create table(:materials) do
      add :name, :string
      add :description, :string
      add :quantity, :integer
      add :cost, :float
      add :volume, :float
      add :volume_unit, :string
      add :applicator_license, :boolean, default: false, null: false

      timestamps()
    end

  end
end
