defmodule ICleanWeb.RegistrationController do
  use ICleanWeb, :controller

  alias Ecto.Changeset
  alias Plug.Conn
  alias ICleanWeb.ErrorHelpers

  @spec create(Conn.t(), map()) :: Conn.t()
  def create(conn, %{"user" => user_params}) do
    conn
    |> Pow.Plug.create_user(user_params)
    |> case do
      {:ok, user, conn} ->
        json(conn, %{
          access_token: conn.private[:api_access_token], 
          renewal_token: conn.private[:api_renewal_token],
          role: user.role,
        })

      {:error, changeset, conn} ->
        errors = Changeset.traverse_errors(changeset, &ErrorHelpers.translate_error/1)

        conn
        |> put_status(500)
        |> json(%{
          status: 500, 
          message: "Couldn't create user", 
          errors: errors
        })
    end
  end
end
