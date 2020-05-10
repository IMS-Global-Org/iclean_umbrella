defmodule IClean.Repo.Migrations.CreateEmployeesAddresses do
  use Ecto.Migration

  def change do
    create table(:employees_addresses) do
      add :employee_id, references(:employees)
      add :address_id, references(:addresses)
    end

    create unique_index(:employees_addresses, [:employee_id, :address_id])
  end
end
