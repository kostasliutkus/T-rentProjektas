namespace T_rent_api.Auth.Model;

public static class TrentRoles
{
    public const string Admin = nameof(Admin);
    public const string TrentUser = nameof(TrentUser);

    public static readonly IReadOnlyCollection<string> All = new[] {Admin, TrentUser};
}