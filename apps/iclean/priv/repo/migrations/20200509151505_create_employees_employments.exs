defmodule IClean.Repo.Migrations.CreateEmployeesEmployments do
  use Ecto.Migration

  def change do
    create table(:employees_employments) do
      add :employee_id, references(:employees)
      add :employment_id, references(:employments)
    end

    create unique_index(:employees_employments, [:employee_id, :employment_id])
  end
end
