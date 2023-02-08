namespace qibrary.Models;

public class Author
{

    public int ID { get; set; }
    public string? Name { get; set; }
    public List<string>? AlternateNames { get; set; }
    public DateOnly? BirthDate { get; set; }
    public string? Bio { get; set; }
    public ICollection<Link>? Links { get; set; }
    public DateTime? Created { get; set; }
    public DateTime? LastModified { get; set; }

    public ICollection<Work>? Works { get; set; }

}