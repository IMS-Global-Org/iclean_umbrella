defmodule IClean.Repo.Migrations.CreateEmployersAddresses do
  use Ecto.Migration

  def change do
    create table(:employers_addresses) do
      add :employer_id, references(:employers)
      add :address_id, references(:addresses)
    end

    create unique_index(:employers_addresses, [:employer_id, :address_id])
  end
end
