defmodule ICleanWeb.UsersController do
  use ICleanWeb, :controller

  import Ecto.Query
  alias IClean.{Repo, User}
  alias Pow.Plug

  def show(conn, _params) do
    current_user = Plug.current_user(conn)
    require IEx; IEx.pry;
    json(conn, %{})
  end
end
