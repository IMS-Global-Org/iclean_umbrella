defmodule IClean.Employee do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [
    :id,
    :first_name, 
    :middle_name,
    :last_name1,
    :last_name2,
    :date_of_birth,
  ]}
  schema "employees" do
    field :date_of_birth, :date
    field :first_name, :string
    field :last_name1, :string
    field :last_name2, :string
    field :middle_name, :string

    belongs_to :user, IClean.Users.User

    timestamps()
  end

  @doc false
  def changeset(employee, attrs) do
    employee
    |> cast(attrs, [
      :first_name, :middle_name, :last_name1, 
      :last_name2, :date_of_birth])
    |> validate_required([:first_name, :last_name1, :date_of_birth])
  end
end
