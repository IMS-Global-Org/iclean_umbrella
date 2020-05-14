defmodule Employment.Search do
  import Ecto.Query
  alias IClean.{Repo, Employment}
  alias __MODULE__

  @type t :: %__MODULE__{
    valid: boolean(),
    params: map(), 
    errors: map(), 
    employments: list(Employment.t)
  }
  defstruct valid: false, params: nil, errors: %{}, employments: []

  @spec build_query(Search.t) :: Query.t
  def build_query(search)
  def build_query(%{valid: valid}) when valid == false, do: nil
  def build_query(_search) do
    # TODO
  end

end
