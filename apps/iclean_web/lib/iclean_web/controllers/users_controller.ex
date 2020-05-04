defmodule ICleanWeb.UsersController do
  use ICleanWeb, :controller

  import Ecto.Query
  alias IClean.{Repo, User}

  def show(conn, _params) do
    IO.inspect conn
    json(conn, %{})
  end
end
