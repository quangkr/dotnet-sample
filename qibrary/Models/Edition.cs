namespace qibrary.Models;
public class Edition
{

    public int ID { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ISBN10 { get; set; }
    public string? ISBN13 { get; set; }
    public ICollection<string>? Covers { get; set; }
    public int Quantity { get; set; }
    public ICollection<Link>? Links { get; set; }
    public DateTime? Created { get; set; }
    public DateTime? LastModified { get; set; }

    public Work? Work { get; set; }
    public ICollection<Author>? Authors { get; set; }

}