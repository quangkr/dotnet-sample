using DotnetSampleSignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

var app = builder.Build();

// app.MapGet("/", () => "Hello World!");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapHub<ChatHub>("/chatHub");

app.Run();
