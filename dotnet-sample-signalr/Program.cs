using DotnetSampleSignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);
var LocalOrigin = "_allowSpecificOrigins";

builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: LocalOrigin,
                      policy =>
                      {
                          policy
                                .WithOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                      });
});

var app = builder.Build();

// app.MapGet("/", () => "Hello World!");

// temporary disable HTTPS redirection due to front-end only use HTTP
// app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors(LocalOrigin);

app.MapHub<ChatHub>("/chathub");

app.Run();
