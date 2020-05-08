defmodule IClean.Repo.Migrations.CreateEmployees do
  use Ecto.Migration

  def change do
    create table(:employees) do
      add :first_name, :string, size: 20
      add :middle_name, :string, size: 20
      add :last_name1, :string, size: 20
      add :last_name2, :string, size: 20
      add :date_of_birth, :date

      add :user_id, references(:users)

      timestamps()
    end

  end
end
