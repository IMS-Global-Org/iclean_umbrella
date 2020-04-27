defmodule IClean.Repo do
  use Ecto.Repo,
    otp_app: :iclean,
    adapter: Ecto.Adapters.Postgres
end
