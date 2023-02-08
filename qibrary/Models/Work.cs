namespace qibrary.Models;

public class Work
{

    public int ID { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public ICollection<Link>? Links { get; set; }
    public DateTime? Created { get; set; }
    public DateTime? LastModified { get; set; }

    public ICollection<Author>? Authors { get; set; }

}