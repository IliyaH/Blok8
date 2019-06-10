namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TicketMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IssueDate = c.DateTime(nullable: false),
                        IdPricelistItem = c.Int(nullable: false),
                        IdApplicationUser = c.String(maxLength: 128),
                        Valid = c.Boolean(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.IdApplicationUser)
                .ForeignKey("dbo.PricelistItems", t => t.IdPricelistItem, cascadeDelete: true)
                .Index(t => t.IdPricelistItem)
                .Index(t => t.IdApplicationUser);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "IdPricelistItem", "dbo.PricelistItems");
            DropForeignKey("dbo.Tickets", "IdApplicationUser", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "IdApplicationUser" });
            DropIndex("dbo.Tickets", new[] { "IdPricelistItem" });
            DropTable("dbo.Tickets");
        }
    }
}
