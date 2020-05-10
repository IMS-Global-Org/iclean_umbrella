defmodule IClean.Warning do
  use Ecto.Schema
  import Ecto.Changeset

  schema "warnings" do
    field :description, :string
    field :instructions, :string
    field :level, :integer
    field :name, :string

    many_to_many :employments,
      IClean.Employment,
      join_through: "employments_warnings"

    timestamps()
  end

  @doc false
  def changeset(warning, attrs) do
    warning
    |> cast(attrs, [:name, :description, :level, :instructions])
    |> validate_required([:name, :description, :level, :instructions])
  end
end
