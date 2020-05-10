defmodule IClean.Repo.Migrations.CreateAddresses do
  use Ecto.Migration

  def change do
    create table(:addresses) do
      add :street1, :string
      add :street2, :string

      timestamps()
    end

  end
end
